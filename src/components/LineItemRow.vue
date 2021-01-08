<template>
  <div>
    <div class="row" style="height:39px">
      <!-- Details (!addLineItem) -->
      <div
        v-if="!lineItem.editing.toggles.inline.newLineItemForm"
        class="col py-1 d-flex flex-row justify-content-between"
        @click.right.prevent="openDLIModal(lineItem)"
        
      >
        <!-- Label + Icon (!editing label) -->
        <div
          class="d-flex flex-row w-50"
          v-if="!lineItem.editing.toggles.inline.newLabelForm"
          @click.capture="$emit('form-requested', lineItem, 'label', $refs)"
          @mouseenter="lineItem.editing.toggles.inline.logExpIcon = true"
          @mouseleave="lineItem.editing.toggles.inline.logExpIcon = false"
        >
          <div> {{lineItem.label}} </div> 
          <button
            type="button"
            class="btn btn-link p-0"
            style="margin-left:5px;height:23px;"
            @click="openLEModal"
            v-show="lineItem.editing.toggles.inline.logExpIcon"
          >
            <font-awesome-icon icon="plus"/>
          </button>
          <log-expense-modal></log-expense-modal>
        </div>
        <!-- Form (editing label) -->
        <edit-details-form
          v-else
          :obj="lineItem"
          :target="'label'"
          @change-submitted="updateLineItem"
          @cancel-form="lineItem.editing.toggles.inline.newLabelForm = false"
        >
          <div>
            <input
              type="text"
              class="form-control form-control-sm w-100"
              ref="input_newLabel"
              placeholder="Edit item name"
              v-model="lineItem.editing.vModels.label"
            />
          </div>
        </edit-details-form>
        <!-- Amount (!editing amount) -->
        <div
          class="d-flex justify-content-end w-50"
          v-if="!lineItem.editing.toggles.inline.newAmountForm"
          @click="$emit('form-requested', lineItem, 'amount', $refs)"
        >
          <span> {{lineItem.budgeted | currency}} </span>
        </div>
        <!-- Form (editing amount) -->
        <edit-details-form
          v-else
          :obj="lineItem"
          :target="'amount'"
          @change-submitted="updateLineItem"
          @cancel-form="lineItem.editing.toggles.inline.newAmountForm = false"
        >
          <money-input
            class="form-control form-control-sm w-75"
            ref="input_newAmount"
            placeholder="$0.00"
            v-model="lineItem.editing.vModels.amount"
          ></money-input>
        </edit-details-form>
      </div>
      <!-- Form for New Line Item (addLineItem) -->
      <div
        class="col d-flex flex-row justify-content-between py-1"
        v-else
      >
        <edit-details-form
          :obj="lineItem"
          :target="'newLineItem'"
          @change-submitted="updateLineItem"
          v-on="$listeners"
        >
          <template v-slot:default>
            <input
              type="text"
              ref="input_newLineItem"
              class="form-control form-control-sm w-50"
              placeholder="Edit item name"
              v-model="lineItem.editing.vModels.label"
            />
          </template>
          <template v-slot:forNewLineItem>
            <money-input
              class="form-control form-control-sm"
              placeholder="$0.00"
              v-model="lineItem.editing.vModels.amount"
            ></money-input>
          </template>
        </edit-details-form>
      </div>
    </div>
    <!-- Progress Bar -->
    <progress-bar
      :lineItem="lineItem">
    </progress-bar>
  </div>
</template>

<script>
import EditDetailsForm from './EditDetailsForm.vue';
import ProgressBar from './ProgressBar.vue';
import LogExpenseModal from './LogExpenseModal.vue';

export default {
  props: ['lineItem'],
  components: {
    ProgressBar,
    EditDetailsForm,
    LogExpenseModal
  },
  data() {
    return {
      //
    }
  },
  methods: {
    updateLineItem(obj, target) {
      if (target === "label") {
        obj.label = obj.editing.vModels.label;
        obj.editing.toggles.inline.newLabelForm = false;
        obj.editing.vModels.label = "";
      } else if (target === "amount") {
        obj.budgeted = obj.editing.vModels.amount;
        obj.editing.toggles.inline.newAmountForm = false;
        obj.editing.vModels.amount = 0;
      } else if (target === "newLineItem") {
        obj.label = obj.editing.vModels.label;
        obj.budgeted = obj.editing.vModels.amount;
        obj.editing.toggles.inline.newLineItemForm = false;
        obj.editing.vModels.label = "";
        obj.editing.vModels.amount = 0;
      } else {
        this.$emit('change-submitted', obj, target);
      }
    },
    openDLIModal(lineItem) {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete the ' + lineItem.label + ' line item?', {
          title: 'Remove Line Item?',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideBackdrop: true 
          }
        )
        .then(value => {
          if (value) {
            this.$emit('delete-requested', lineItem)
          }
        })
        .catch(err => {
          alert("Something went wrong." + err)
        })
    },
    openLEModal() {
      this.$nextTick(function() {
        this.lineItem.editing.toggles.inline.newLabelForm = false;
        this.$bvModal.show('logExpenseModal');
      })   
    }
    /*logExpenditure(merchant, amount, notes) {
      let category = this.budget.categories
        .find(c => c.label === this.tempStorage.category.label);
      
      let lineItem = category.lineItems
        .find(l => l.label === this.tempStorage.lineItem.label);

      lineItem.expenditures.push(new Expenditure(merchant, amount, notes));

      this.tempStorage.category = {};
      this.tempStorage.lineItem = {};
    }*/
  },
  filters: {
    currency: function(num) {
      let number = num;
      return "$" + number.toLocaleString("en-US");
    }
  }
}
</script>

<style>

</style>