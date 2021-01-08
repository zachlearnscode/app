<template>
  <b-modal
    id="logExpenseModal"
    hide-backdrop no-stacking ok-title="Save"
    @ok="logExpenditure"
  >
    <template v-slot:modal-title>
      <div class="h5">Log an Expense</div>
    </template>
    <div class="modal-body">
      <div class="form-group">
        <label for="merchant">Merchant</label>
        <input type="text" id="merchant" v-model="merchant" class="form-control" ref="merchantInput"/>

        <label for="amount">Amount</label>
        <money-input id="amount" v-model="amount" class="form-control" placeholder="$0.00"></money-input>
        
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="notes" class="form-control" rows="3"></textarea>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      merchant: "",
      amount: 0,
      notes: ""
    }
  },
  methods: {
    logExpenditure() {
      this.$emit('log-expenditure', this.merchant, this.amount, this.notes);

      this.merchant = "";
      this.amount = 0;
      this.notes = "";
    }
  }
}
</script>

<style>

</style>