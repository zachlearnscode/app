<template>
  <div class="w-100">
    <h3 class="text-white">View a Budget</h3>
    <b-form>
      <b-form-select size="lg" class="my-2" v-model="selectedBudget" :options="existingBudgets"></b-form-select>
      <button
        class="btn btn-lg btn-primary mt-2 w-100"
        @click.prevent="$emit('activate-budget', selectedBudget)"
        :disabled="budgets.length < 2"
      >
        View
      </button>     
    </b-form>
  </div>
</template>

<script>


export default {
  props: ['budgets'],
  data() {
    return {
      selectedBudget: null,
      existingBudgets: [
        {value: null, text: "Select a budget", disabled: true}
      ]
    }
  },
  methods: {
    append() {
      this.existingBudgets = [
        {value: null, text: "Select a budget", disabled: true}
      ];

      for (let b = 0; b < this.budgets.length; b++) {
        this.existingBudgets.push({
          value: this.budgets[b].title,
          text: this.budgets[b].title,
          disabled: false
        })
      }
    }
  },
  watch: {
    budgets: 'append'
  }
}
</script>

<style>
  
</style>