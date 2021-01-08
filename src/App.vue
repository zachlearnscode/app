<template>
  <div id="app">
   <!-- <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid d-flex flex-row align-items-center">
        <div class="navbar-brand d-flex flex-row align-items-center">
          <div
            style="width:50px;height:50px"
            class="rounded-circle bg-white d-flex justify-content-center align-items-center mr-3">
            <font-awesome-icon icon="money-bill-wave-alt" class="text-success" style="font-size:1.5rem"/>
          </div>          
          <div class="navbar-brand" style="font-size:2rem">CRUDdy Budget</div>
        </div>
        <div class="navbar-nav d-flex flex-row" style="font-size:1.5rem">
          <span class="nav-item nav-link m-2">Create</span>
        </div>
      </div>
    </nav> -->
    <div
      v-for="budget in budgets" :key="budget.title"
      class="d-flex flex-row justify-content-center align-items-center"
    >
      <budget-container
        v-if="budget.active" :budget="budget"
      >
      </budget-container>
    </div>
  </div>
</template>

<script>

//Classes for Structuring Budget (Budget, BudgetCategory, LineItem, Expenditure)
class Budget {
  constructor(title = 'Test Budget') {
    this.title = title,
    this.income = {
      plannedIncome: 0,
      editing: {
        form: false,
        vModel: 0
      }
    },
    this.categories = [
      new BudgetCategory("Savings"),
      new BudgetCategory("Giving"),
      new BudgetCategory("Housing"),
      new BudgetCategory("Transportation"),
      new BudgetCategory("Food"),
      new BudgetCategory("Personal"),
      new BudgetCategory("Lifestyle"),
      new BudgetCategory("Health"),
      new BudgetCategory("Insurance"),
      new BudgetCategory("Debt"),
    ],
    this.active = false
  }

  get budgetedExpenses() {
    let total = 0;

    for (let c = 0; c < this.categories.length; c++) {
      for (let l = 0; l < this.categories[c].lineItems.length; l++) {
        total += this.categories[c].lineItems[l].budgeted;
      }
    }
    return total
  }

  get actualExpenses() {
    let total = 0;

    for (let c = 0; c < this.categories.length; c++) {
      for (let l = 0; l < this.categories[c].lineItems.length; l++) {
        total += this.categories[c].lineItems[l].spent;
      }
    }
    return total

  }
}

class BudgetCategory {
  constructor(name) {
    this.label = name,
    this.lineItems = []
  }
}

class LineItem {
  constructor() {
    this.label = "",
    this.budgeted = 0,
    this.expenditures = [],
    this.editing = {
      toggles: {
        inline: {
          newLineItemForm: false,
          newLabelForm: false,
          newAmountForm: false,
          logExpIcon: false
        },
        modals: {
          deleteLineItem: false,
          logExpenditure: false
        }        
      },
      vModels: {
        label: "",
        amount: 0,
        merchant: "",
        notes: ""
      }
    }
  }
  get spent() {
    let spent = 0;
    if (this.expenditures.length) {
      for (let e = 0; e < this.expenditures.length; e++) {
        spent += this.expenditures[e].amount;
      }
    } 
    return spent
  }
}

class Expenditure {
  constructor(merchant, amount, notes) {
    this.dateLogged = new Date()
      .toLocaleDateString(),
    this.merchant = merchant,
    this.amount = amount,
    this.notes = notes
  }
}

//Create Tester Budget
let testBudget = new Budget()
testBudget.categories[4].lineItems.push(new LineItem);
let testLineItem = testBudget.categories[4].lineItems[0];
testLineItem.label = "Restaurants";
testLineItem.budgeted = 300;
testBudget.income.plannedIncome = 2000
testLineItem.expenditures.push(new Expenditure);
let testExpenditure = testLineItem.expenditures[0];
testExpenditure.merchant ="Test Merchant";
testExpenditure.amount = 200;
testBudget.categories[2].lineItems.push(new LineItem);
let newTestLineItem = testBudget.categories[2].lineItems[0];
newTestLineItem.label = "Test";
newTestLineItem.budgeted = 400;
testBudget.active = true;

import BudgetContainer from './components/BudgetContainer.vue';

export default {
  name: 'App',
  components: {
    BudgetContainer
  },
  data() {
    return {
     budgets: [testBudget]
    }
  },
  methods: {
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
</style>