<template>
  <b-modal
    id="expenditureModal"
    hide-backdrop ok-title="Save"
    @shown="focusMerchant"
    @ok="logExpenditure"
  >
    <template v-slot:modal-title>
      <div class="h5">{{ title }}</div>
    </template>
    <div class="modal-body">
      <div class="form-group">
        <label for="merchant">Merchant</label>
        <input
          type="text"
          id="merchant"
          v-model.trim="merchant"
          class="form-control"
          ref="merchantInput"
          :placeholder="expenditure.merchant"
          />
        <label for="amount">Amount</label>
        <money-input id="amount" v-model="amount" class="form-control"></money-input>
        
        <label for="notes">Notes</label>
        <textarea id="notes" v-model.trim="notes" class="form-control" rows="3" :placeholder="expenditure.notes"></textarea>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    expenditure: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      merchant: "",
      amount: 0,
      notes: ""
    }
  },
  methods: {
    focusMerchant() {
      this.$refs.merchantInput.focus()
    },
    logExpenditure() {
      this.$emit('log-expenditure', this.merchant, this.amount, this.notes, this.target);

      this.merchant = "";
      this.amount = 0;
      this.notes = ""
    }
  }
}
</script>

<style>

</style>