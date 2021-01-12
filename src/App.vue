<template>
  <div id="app">
    <navbar class="mb-3 fixed-top" />
    <div
      v-for="budget in budgets" :key="budget.title"
      class="d-flex flex-row justify-content-center align-items-center"
    >
      <budget-container
        v-if="budget.active" :budget="budget"
        style="margin-top:90px;"
      >
      </budget-container>
      <div v-else>
        No Budgets to Show
      </div>
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

  get allExpenditures() {
    let lineItemsArr = [];
    let allExpenditures = [];

    this.categories.filter(c => c.lineItems.length > 0)
      .forEach(c => lineItemsArr.push(...c.lineItems));
    
    lineItemsArr.forEach(l => {
      for (let e = 0; e < l.expenditures.length; e++) {
        allExpenditures.push(l.expenditures[e])
      }
    })

    return allExpenditures
  }
}

class BudgetCategory {
  constructor(name) {
    this.label = name,
    this.lineItems = []
  }
}

export class LineItem {
  constructor(label) {
    this.label = label,
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

export class Expenditure {
  constructor(merchant, amount, notes, category) {
    this.merchant = merchant,
    this.amount = amount,
    this.notes = notes,
    this.dateLogged = new Date()
      .toLocaleDateString(),
    this.category = category,
    this.timeLogged = new Date()
      .getTime()
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
testExpenditure.category = "Food"
testBudget.categories[2].lineItems.push(new LineItem);
let newTestLineItem = testBudget.categories[2].lineItems[0];
newTestLineItem.label = "Test";
newTestLineItem.budgeted = 400;
testBudget.active = true;

import Navbar from './components/Navbar.vue'
import BudgetContainer from './components/BudgetContainer.vue';


export default {
  name: 'App',
  components: {
    BudgetContainer,
    Navbar
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
  .budgetContainer {
    max-height:calc(100vh - 84px);
  }
</style>