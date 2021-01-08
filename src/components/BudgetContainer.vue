<template>
  <div class="container p-0 border bg-light rounded">
    <!-- Budget Header -->
    <budget-header
      :title="budget.title"
      :spent="budget.actualExpenses"
      :income="budget.income"
      :budgeted="budget.budgetedExpenses"
      @form-requested="showForm"
    ></budget-header>
    <!-- Budget Body -->
    <category-container
      v-for="category in budget.categories"
     :key="category.label"
     :category="category"
     @form-requested="showForm"
    ></category-container>     
  </div> 
</template>

<script>
import BudgetHeader from './BudgetHeader.vue'
import CategoryContainer from './CategoryContainer.vue'

//Supply LineItem class for creating new line items
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
        amount: 0
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


export default {
  props: {
    budget: {
      type: Object,
      required: true
    }
  },
  components: {
    BudgetHeader,
    CategoryContainer
  },
  data() {
    return {
      viewExpenditures: false
    }
  },
  methods: {
    falsifyForms() {
      //Locate all line items and store them in lineItemsArr
      let lineItemsArr = [];

      this.budget.categories.filter(c => c.lineItems.length > 0)
        .forEach(c => lineItemsArr.push(...c.lineItems));

      //Combine line item edit objects into single array and loop to falsify each one
      lineItemsArr.map(l => l.editing.toggles.inline)
        .forEach((editObj) => {
          editObj.logExpIcon = false;
          editObj.newAmountForm = false;
          editObj.newLabelForm = false;
          editObj.newLineItemForm = false;
        })

      //Falsify income input if active
      if (this.budget.income.editing.form) {
        this.budget.income.editing.form = false;
      }
    },
    showForm(obj, target, refs) { 
      
      this.$refs = refs;
         
      this.falsifyForms();

      if (target === "label") {
        obj.editing.toggles.inline.newLabelForm = true;       //Open form
        this.$nextTick(function() {                           //Give form focus
          this.$refs.input_newLabel.focus();
        })
      } else if (target === "amount") {
        obj.editing.toggles.inline.newAmountForm = true;
        this.$nextTick(function() {
          this.$refs.input_newAmount.$el.focus();
        })        
      } else if (target === "newLineItem") {
        obj.editing.toggles.inline.newLineItemForm = true;
        this.$nextTick(function() {
          this.$refs.lineItem[this.$refs.lineItem.length - 1]
            .$refs.input_newLineItem.focus()  
        })
      } else if (target === "income") {
        obj.editing.form = true;
        this.$nextTick(function() {
          this.$refs.input_newIncome.$el.focus();
        })
      }
    }
  }
}
</script>

<style>

</style>
