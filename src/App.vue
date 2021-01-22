<template>
  <div id="app">
    <navbar
      :budgets="budgets"
      :activeBudget="activeBudget"
      @create-budget="createBudget"
      @activate-budget="activateBudget"
      @reset-confirmed="resetActiveBudget"
      @save-requested="saveProgress"
      class="px-5 w-25 h-100"
    />
    <div class="w-75 m-4 d-flex align-items-center justify-content-center" style="overflow:hidden">
      <div v-if="budgets.length === 0">
        <div class="h3 font-weight-light text-muted">No budgets to display.</div>
      </div>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInRightBig"
        leave-active-class="animate__animated animate__fadeOutRightBig"
      >
        <budget-container
          v-if="budgets.length > 0"
          :budget="activeBudget"
          :key="activeBudget.title"
          @budget-updated="saveProgress(activeBudget.title), 'data'"
        />
      </transition>
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';
import BudgetContainer from './components/BudgetContainer.vue';
import { Budget } from './modules/BudgetClasses.js';

export default {
  name: 'App',
  components: {
    Navbar,
    BudgetContainer   
  },
  data() {
    return {
     budgets: []
    }
  },
  computed: {
    activeBudget() {
      if (this.budgets.length) {
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
      
      this.activateBudget(newBudget.title);
    },
    activateBudget(budgetTitle) {
      let toActivate = this.budgets.find(b => b.title === budgetTitle);

      let currentlyActive = this.budgets.find(b => b.active);
      if (currentlyActive) {
        currentlyActive.active = false;
        this.saveProgress(currentlyActive.title);
      }      

      toActivate.active = true;
      this.saveProgress(toActivate.title);
    },
    resetActiveBudget(activeBudget) {
      let title = activeBudget.title;
      let freshBudget = new Budget(title);

      let index = this.budgets.indexOf(activeBudget);
      this.budgets.splice(index, 1, freshBudget);

      freshBudget.active = true;

      this.saveProgress(activeBudget.title, 'data')
    },
    saveProgress(budgetTitle, target) {
      let req = indexedDB.open('userData');

      req.onerror = function() {
        alert('Error saving changes.')
      }

      req.onsuccess = (event) => {
        let db = event.target.result;
        let trans = db.transaction('budgets', 'readwrite');

        let os = trans.objectStore('budgets');

        if (target === 'data') {
          let reqBudget = os.get(budgetTitle);

          reqBudget.onsuccess = (event) => {
            let budget = event.target.result;
            budget = this.activeBudget;

            let updateBudget = os.put(budget);

            updateBudget.onsuccess = () => {
              console.log(budgetTitle + ' updated')
            };

            updateBudget.onerror = () => {
              console.log("Couldn't update " + budgetTitle)
            }
          };
        } else {
          this.budgets.forEach(budget => {
            os.put(budget);
          })
        }

        trans.onerror = () => {
          console.log('Error saving progress')
        };

      }
    }
  },
  beforeCreate() {
    let req = indexedDB.open('userData');

    req.onupgradeneeded = (event) => {
      let db = event.target.result;
      db.createObjectStore('budgets', {keyPath: 'title'});
    }

    req.onsuccess = () => {
      return;
    }

    req.onerror = () => {
      console.log('Error accessing database');
    }
  },
  beforeMount() {
    let req = indexedDB.open('userData');

    req.onsuccess = (event) => {
      let db = event.target.result;
      let os = db.transaction('budgets').objectStore('budgets');

      os.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
          this.budgets.push(cursor.value);
          cursor.continue();
        } else {
          return;
        }
      }
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