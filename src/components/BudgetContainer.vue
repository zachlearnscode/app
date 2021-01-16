<template>
  <div class="container p-0 border bg-light rounded h-100">
    <!-- Budget Header -->
    <budget-header
      :title="!expendituresView ? budget.title : 'Expenditures'"
      :spent="budget.actualExpenses"
      :income="budget.income"
      :budgeted="budget.budgetedExpenses"
      @form-requested="showForm"
      @expenditures-requested="switchView"
    ></budget-header>
    <!-- Budget Body -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInUp"
    >
      <div
        id="bodyContainer"
        v-if="!expendituresView" key="budgetView"
      >
        <category-container
          v-for="category in budget.categories"
          :key="category.label"
          :category="category"
          @form-requested="showForm"
          @log-modal-requested="showExpenditureModal"
          class="my-2"
        ></category-container>
      </div>
      <div
        v-else key="expenditureView"
        style="min-height:100vh-100px"
        class="d-flex"
      >
        <expenses-container
          class="ml-auto"
          :expenditures="budget.allExpenditures"
          @delete-requested="deleteExpenditure"
          @ee-modal-requested="showExpenditureModal"
        ></expenses-container>
      </div>
    </transition>   
    <expenditure-modal
      :title="expenditureModal.modalTitle"
      :expenditure="tempStorage.expenditure"
      @log-expenditure="logExpenditure"
    />
  </div> 
</template>

<script>
import BudgetHeader from './BudgetHeader.vue';
import CategoryContainer from './CategoryContainer.vue';
import ExpenditureModal from './ExpenditureModal.vue';
import ExpensesContainer from './ExpensesContainer.vue';

export default {
  props: {
    budget: {
      type: Object,
      required: true
    }
  },
  components: {
    BudgetHeader,
    CategoryContainer,
    ExpensesContainer,
    ExpenditureModal
  },
  data() {
    return {
      expendituresView: false,

      expenditureModal: {
        modalTitle: "Log an Expense",
        modalTarget: "log"
      },

      tempStorage: {
        expenditure: {},
        expCategory: "",
      }
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
         
      this.falsifyForms();

      this.$refs = refs;

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
    },
    switchView() {
      this.expendituresView = !this.expendituresView;
      if (this.expendituresView) {
        this.expenditureModal.modalTitle = "Edit Expense"
        this.expenditureModal.modalTarget = "edit"
      } else {
        this.expenditureModal.modalTitle = "Log an Expense"
        this.expenditureModal.modalTarget = "log"
      }

      console.log(this.expenditureModal)
    },
    locateExpenditure(expenditure) {
      let location;

      let category = this.budget.categories.find(c => c.label === expenditure.category);

      for (let l = 0; l < category.lineItems.length; l++) {
        for (let e = 0; e < category.lineItems[l].expenditures.length; e++) {
          location = category.lineItems[l].expenditures;
          let currentExpenditure = category.lineItems[l].expenditures[e];

          if (currentExpenditure.timeLogged === expenditure.timeLogged) {
            return location;
          }
        }
      }
    },
    showExpenditureModal(expenditure) {
      this.tempStorage.expenditure = expenditure;

      this.$nextTick(function() {
        this.$bvModal.show('expenditureModal');
      })
      
    },
    logExpenditure(merchant, amount, notes) {
      let expenditure = this.locateExpenditure(this.tempStorage.expenditure)
        .find(e => e.timeLogged === this.tempStorage.expenditure.timeLogged);
      
      expenditure.merchant = merchant;
      expenditure.amount = amount;
      expenditure.notes = notes;
    },
    deleteExpenditure(expenditure) {
      let expendituresArray = this.locateExpenditure(expenditure);
      expendituresArray.splice(expendituresArray.indexOf(expenditure), 1);
      
    }
  },
  mounted() { //Delete expenditures that are created but cancelled
    this.$root.$on('bv::modal::hide', (bvEvent) => {
      if (this.expenditureModal.modalTarget === "log") {
        if (bvEvent.trigger === "cancel" ||
            bvEvent.trigger === "backdrop" ||
            bvEvent.trigger === "headerclose") {
          this.deleteExpenditure(this.tempStorage.expenditure);
        }
      }
    })
  }
}
</script>

<style scoped>
  #bodyContainer {
    max-height: 87%;
    overflow-y: scroll;
  } 

</style>
