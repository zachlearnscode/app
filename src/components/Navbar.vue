<template>
  <nav class="navbar navbar-dark bg-success d-flex flex-column justify-content-between"
  >
    <div class="d-flex flex-column justify-content-start align-items-center w-100 h-75">
      <div class="navbar-brand d-flex flex-column align-items-end">
        <div class="d-flex flex-row align-items-center">
          <span class="h1">All Bucks</span>
          <font-awesome-icon icon="money-bill-wave-alt" class="text-white h1 ml-3" />
        </div>
        <span class="h3 font-weight-light">Know your worth.</span>
      </div>
      <budget-creator :budgets="budgets" v-on="$listeners" class="mt-5" />
      <budget-selector :budgets="budgets" v-on="$listeners" class="mt-5" />
    </div>
    <div class="w-100 h-25 d-flex flex-column justify-content-end">
      <button
        class="btn btn-lg btn-danger w-100 mb-3"
        :disabled="!activeBudget"
        @click.prevent="msgBoxConfirm"
      >
        Reset Budget
      </button>
    </div>    
  </nav>
</template>

<script>
import BudgetCreator from './BudgetCreator.vue';
import BudgetSelector from './BudgetSelector.vue'

export default {
  components: {
    BudgetCreator,
    BudgetSelector
  },
  props: ['budgets', 'activeBudget'],
  data() {
    return {
      resetClicked: false
    }
  },
  methods: {
    msgBoxConfirm() {
      this.$bvModal.msgBoxConfirm('Are you sure you want to reset ' + this.activeBudget.title + '?', {
          title: 'Reset Budget',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'Reset',
          cancelTitle: 'Cancel',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if (value) {
              this.$emit('reset-confirmed', this.activeBudget)
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }

}
</script>

<style scoped>


</style>