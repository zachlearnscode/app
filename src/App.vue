<template>
  <div id="app">
    <navbar class="mb-3" />
    <button
      class="btn btn-primary"
      @click="createBudget"
    >Create New Budget</button>
    <div
      v-for="budget in budgets" :key="budget.title"
      class="d-flex flex-row justify-content-center align-items-center"
    >
      <budget-container
        :budget="budget"
        style="margin-top:90px;"
      >
      </budget-container>
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
    BudgetContainer,
    Navbar
  },
  data() {
    return {
     budgets: []
    }
  },
  methods: {
    createBudget() {
      this.budgets.push(new Budget());
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
</style>