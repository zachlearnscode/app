<template>
  <div id="app">
    <navbar
      :budgets="budgets"
      :activeBudget="activeBudget"
      @create-budget="createBudget"
      @activate-budget="activateBudget"
      @reset-confirmed="resetActiveBudget"
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
      newBudget.active = true;

      if (this.budgets.length > 0) {
        this.budgets.find(b => b.active).active = false;
      }      

      this.budgets.push(newBudget);
    },
    activateBudget(budgetTitle) {
      let toActivate = this.budgets.find(b => b.title === budgetTitle);

      if (this.budgets.length > 0) {
        this.budgets.find(b => b.active).active = false;
      }

      toActivate.active = true;
    },
    resetActiveBudget(activeBudget) {
      let title = activeBudget.title;
      let freshBudget = new Budget(title);

      let index = this.budgets.indexOf(activeBudget);
      this.budgets.splice(index, 1, freshBudget);

      freshBudget.active = true;
    }
  },
  created() {
    let nb = new Budget();
    nb.active = true;

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

    req.onupgradeneeded = (event) => {
      let db = event.target.result;
      let os = db.createObjectStore('budgets', {keyPath: 'title'});

      os.transaction.oncomplete = () => {
        db.transaction('budgets', 'readwrite')
          .objectStore('budgets').add(nb);       
      };
    }

    req.onerror = (event) => {
      console.log('error', event);
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