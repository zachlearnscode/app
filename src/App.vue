<template>
  <div id="app">
    <navbar
      :budgets="budgets"
      @create-budget="createBudget"
      class="px-5 w-25"
    />
    <div class="w-75 px-5 py-3" style="overflow:hidden">
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
  .budgetContainer {
    max-height:calc(100vh - 84px);
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
    --animate-duration: 1s;
  }
</style>