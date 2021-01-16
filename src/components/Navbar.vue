<template>
  <nav class="
        navbar
        navbar-dark
        bg-success
        d-flex
        flex-column
        justify-content-start
        align-items-center
        "
  >
    <div class="navbar-brand d-flex flex-column align-items-end">
      <div class="d-flex flex-row align-items-center">
        <span class="h1">All Bucks</span>
        <font-awesome-icon icon="money-bill-wave-alt" class="text-white h1 ml-3" />
      </div>
      <span class="h3 font-weight-light">Know your worth.</span>
    </div>

    <budget-selector :budgets="budgets" v-on="$listeners" class="mt-5"></budget-selector>      
  </nav>
</template>

<script>
import BudgetSelector from './BudgetSelector.vue'
export default {
  components: {
    BudgetSelector
  },
  props: ['budgets'],
  data() {
    return {
      
    }
  }

}
</script>

<style scoped>
nav {
  height: 100vh;
}

</style>