<template>
  <div id="app">
    <navbar
      :budgets="budgets"
      @create-budget="createBudget"
      class="px-5 w-25"
    />
    <div
      class="d-flex justify-content-center align-items-start w-75 my-3"
    >
      <budget-container
        :budget="activeBudget"
      />
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
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
      return this.budgets.find(b => b.active)
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
    }
  }
}
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
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
  .budgetContainer {
    max-height:calc(100vh - 84px);
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
</style>