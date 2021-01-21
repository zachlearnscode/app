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