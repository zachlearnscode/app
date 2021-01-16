<template>
  <div>
    <h3 class="text-white">Create a Budget</h3>
    <b-form>
      <b-form-select size="lg" class="my-2" v-model="selectedMonth" :options="months"></b-form-select>
      <b-form-select size="lg" class="my-2" v-model="selectedYear" :options="years"></b-form-select>
      <div class="d-flex justify-content-end my-2">
        <b-button-group size="lg">
          <!--<button class="btn btn-primary" disabled>View</button>-->
          <button
            class="btn btn-primary ml-2"
            @click.prevent="verifyNewBudget"
          >Create</button>
        </b-button-group>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ['budgets'],
  data() {
    return {
      selectedMonth: null,
      selectedYear: new Date().getFullYear(),
      months: [
        {value: null, text: "Select a month"},
        {value: "January", text: "January"},
        {value: "February", text: "February"},
        {value: "March", text: "March"},
        {value: "April", text: "April"},
        {value: "May", text: "May"},
        {value: "June", text: "June"},
        {value: "July", text: "July"},
        {value: "August", text: "August"},
        {value: "September", text: "September"},
        {value: "October", text: "October"},
        {value: "November", text: "November"},
        {value: "December", text: "December"}
      ],
      years: [
        {value: new Date().getFullYear(), text: new Date().getFullYear()},
        {value: new Date().getFullYear() + 1, text: new Date().getFullYear() + 1},
        {value: new Date().getFullYear() + 2, text: new Date().getFullYear() + 2}
      ]
    }
  },
  computed: {
    //
  },
  methods: {
    verifyNewBudget() {
      if (this.selectedMonth !== null) {
        let budgetTitle = this.selectedMonth + ' ' + this.selectedYear;
        if (!this.budgets.find(b => b.title === budgetTitle)) {
          this.$emit('create-budget', budgetTitle)
        } else {
          console.log('err')
        }
      } else {
        console.log('Month Required');
      }
    }
  }
}
</script>

<style>

</style>