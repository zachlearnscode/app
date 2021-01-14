export class Budget {
  constructor(title = 'New Budget') {
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

export class BudgetCategory {
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