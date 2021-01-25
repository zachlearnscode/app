<template>
  <div id="app">
    <navbar
      :budgets="budgets"
      :activeBudget="activeBudget"
      :demoMode="demoMode"
      @create-budget="createBudget"
      @activate-budget="activateBudget"
      @reset-confirmed="resetActiveBudget"
      @exit-demo="exitDemo"
      class="px-5 w-25 h-100"
    />
    <div class="w-75 m-4 d-flex align-items-center justify-content-center" style="overflow:hidden">
      <div v-if="budgets.length === 0" class="d-flex flex-column align-items-center">
        <div class="h3 font-weight-light text-muted">No budgets to display.</div>
        <div class="h5 d-flex align-items-center">
          First time here?
          <button class="btn btn-lg btn-link" @click.prevent="createDemo">
            Experiment with a demo budget.
          </button>
        </div>
      </div>
      <transition
        v-else-if="activeBudget"
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInRightBig"
        leave-active-class="animate__animated animate__fadeOutRightBig"
      >
        <budget-container
          :budget="activeBudget"
          :key="activeBudget.title"
          @budget-updated="saveChanges(activeBudget)" 
        />
      </transition>
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';
import BudgetContainer from './components/BudgetContainer.vue';
import { Budget } from './modules/BudgetClasses.js';
import { demoBudget } from './modules/BudgetClasses.js';

export default {
  name: 'App',
  components: {
    Navbar,
    BudgetContainer   
  },
  data() {
    return {
     budgets: [],
     demoMode: false
    }
  },
  computed: {
    activeBudget() {
      if (this.budgets.length > 0) {
        return this.budgets.find(b => b.active);
      } else {
        return null;
      }
    }
  },
  methods: {
    createBudget(budgetTitle) {
      let newBudget = new Budget(budgetTitle);
      this.budgets.push(newBudget);

      this.addBudget(newBudget);

      this.activateBudget(newBudget.title);
    },
    activateBudget(budgetTitle) {
      let toActivate = this.budgets.find(b => b.title === budgetTitle);

      let currentlyActive = this.budgets.find(b => b.active);
      if (currentlyActive) {
        currentlyActive.active = false;
      }      

      toActivate.active = true;

      this.saveChanges(toActivate, currentlyActive)
    },
    resetActiveBudget(activeBudget) {
      let title = activeBudget.title;
      let freshBudget = new Budget(title);

      let index = this.budgets.indexOf(activeBudget);
      this.budgets.splice(index, 1, freshBudget);

      freshBudget.active = true;

    },
    createDemo() {
      this.demoMode = true;      
      return this.budgets.push(demoBudget);
    },
    exitDemo() {
      this.demoMode = false;
      return this.budgets.splice(demoBudget, 1);
    },
    addBudget(budget) {
      let req = indexedDB.open('userData');

      req.onsuccess = (event) => {
        let db = event.target.result;
        let os = db.transaction('budgets', 'readwrite').objectStore('budgets');

        return os.add(budget);
      }
    },
    saveChanges(budget1, budget2) {
      let req = indexedDB.open('userData');

      req.onsuccess = (event) => {
        if (budget1 && budget2) {
          let db = event.target.result;
          let os = db.transaction('budgets', 'readwrite').objectStore('budgets');
          os.get(budget1.title).onsuccess = (event) => {
            console.log(event.target.result)
            let budget = event.target.result;
            budget.active = true;

            return os.put(budget)
          };

          os.get(budget2.title).onsuccess = (event) => {
            console.log(event.target.result)
            let budget = event.target.result;
            budget.active = false;

            return os.put(budget)
          }

        } else {
            let db = event.target.result;
            let os = db.transaction('budgets', 'readwrite').objectStore('budgets');
            os.get(budget1.title).onsuccess = (event) => {
              let budget = event.target.result;
              budget = this.activeBudget;

              return os.put(budget)
            };
        }
      }

    }
  },
  beforeCreate() {
    let req = indexedDB.open('userData');
    req.onupgradeneeded = (event) => {
      let db = event.target.result;
      db.createObjectStore('budgets', {keyPath: 'title'});
      console.log("upgraded")
    }
    req.onsuccess = (event) => {
      let db = event.target.result;
      let os = db.transaction('budgets').objectStore('budgets');
      os.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        console.log("Opening Cursor")
        if (cursor) {
          console.log("Cursoring")
          this.budgets.push(cursor.value);
          cursor.continue();
        }
      }
    }
    req.onerror = () => {
      console.log('Error accessing database');
    }
  }
}
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
  .animate__animated.animate__fadeInRightBig {
    --animate-duration: 1s;
  }
  .animate__animated.animate__fadeOutRightBig {
    --animate-duration: .75s;
  }
</style>