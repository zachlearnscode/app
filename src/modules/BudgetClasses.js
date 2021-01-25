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

export let demoBudget = JSON.parse('{"title":"Demo Budget","income":{"plannedIncome":2000,"editing":{"form":false,"vModel":0}},"categories":[{"label":"Savings","lineItems":[{"label":"Retirement","budgeted":200,"expenditures":[{"merchant":"","amount":50,"notes":"","dateLogged":"1/24/2021","category":"Savings","timeLogged":1611514119722}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}},{"label":"Vacation","budgeted":100,"expenditures":[{"merchant":"","amount":50,"notes":"","dateLogged":"1/24/2021","category":"Savings","timeLogged":1611514126456}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Giving","lineItems":[{"label":"Birthday Gifts","budgeted":50,"expenditures":[],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Housing","lineItems":[{"label":"Rent","budgeted":600,"expenditures":[{"merchant":"","amount":600,"notes":"Paid on 1st","dateLogged":"1/24/2021","category":"Housing","timeLogged":1611514134837}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Transportation","lineItems":[{"label":"Gas","budgeted":55,"expenditures":[{"merchant":"QT","amount":25,"notes":"","dateLogged":"1/24/2021","category":"Transportation","timeLogged":1611514177332},{"merchant":"QT","amount":24.5,"notes":"","dateLogged":"1/24/2021","category":"Transportation","timeLogged":1611514186120},{"merchant":"QT","amount":24,"notes":"","dateLogged":"1/24/2021","category":"Transportation","timeLogged":1611514196134}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}},{"label":"Maintenance","budgeted":20,"expenditures":[{"merchant":"Olympic Car Wash","amount":10,"notes":"","dateLogged":"1/24/2021","category":"Transportation","timeLogged":1611514208498}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Food","lineItems":[{"label":"Restaurants","budgeted":200,"expenditures":[{"merchant":"Chipotle","amount":18,"notes":"","dateLogged":"1/24/2021","category":"Food","timeLogged":1611514222630},{"merchant":"Cupini\'s","amount":32,"notes":"Date night","dateLogged":"1/24/2021","category":"Food","timeLogged":1611514239900}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}},{"label":"Groceries","budgeted":300,"expenditures":[{"merchant":"Price Chopper","amount":65,"notes":"","dateLogged":"1/24/2021","category":"Food","timeLogged":1611514257599}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Personal","lineItems":[{"label":"Haircut","budgeted":15,"expenditures":[],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}},{"label":"Phone Bill","budgeted":70,"expenditures":[],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Lifestyle","lineItems":[{"label":"Pet Supplies","budgeted":75,"expenditures":[{"merchant":"Chewy.com","amount":45,"notes":"Pet food","dateLogged":"1/24/2021","category":"Lifestyle","timeLogged":1611514278300},{"merchant":"","amount":30,"notes":"Groomer","dateLogged":"1/24/2021","category":"Lifestyle","timeLogged":1611514288696}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Health","lineItems":[]},{"label":"Insurance","lineItems":[{"label":"Car Insurance","budgeted":70,"expenditures":[{"merchant":"Farmer\'s","amount":69.5,"notes":"","dateLogged":"1/24/2021","category":"Insurance","timeLogged":1611514304695}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]},{"label":"Debt","lineItems":[{"label":"Credit Cards","budgeted":150,"expenditures":[{"merchant":"Mastercard","amount":150,"notes":"","dateLogged":"1/24/2021","category":"Debt","timeLogged":1611514346110}],"editing":{"toggles":{"inline":{"newLineItemForm":false,"newLabelForm":false,"newAmountForm":false,"logExpIcon":false},"modals":{"deleteLineItem":false,"logExpenditure":false}},"vModels":{"label":"","amount":0,"merchant":"","notes":""}}}]}],"active":true}');