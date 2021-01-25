<template>
  <div>
    <h3 class="text-white">Create a Budget</h3>
    <b-form>
      <b-form-select size="lg" class="my-2" v-model="selectedMonth" :options="months"></b-form-select>
      <b-form-select size="lg" class="my-2" v-model="selectedYear" :options="years"></b-form-select>
      <button
        class="btn btn-lg btn-primary shadow-lg mt-2 w-100"
        @click.prevent="verifyNewBudget"
        :disabled="demoMode"
      >
        {{demoMode ? "Disabled in Demo" : "Create"}}
      </button>     
    </b-form>
  </div>
</template>

<script>
export default {
  props: ['budgets', 'demoMode'],
  data() {
    return {
      selectedMonth: null,
      selectedYear: new Date().getFullYear(),
      months: [
        {value: null, text: "Select a month", disabled: true},
        {value: "January", text: "January", disabled: false},
        {value: "February", text: "February", disabled: false},
        {value: "March", text: "March", disabled: false},
        {value: "April", text: "April", disabled: false},
        {value: "May", text: "May", disabled: false},
        {value: "June", text: "June", disabled: false},
        {value: "July", text: "July", disabled: false},
        {value: "August", text: "August", disabled: false},
        {value: "September", text: "September", disabled: false},
        {value: "October", text: "October", disabled: false},
        {value: "November", text: "November", disabled: false},
        {value: "December", text: "December", disabled: false}
      ],
      years: [
        {value: new Date().getFullYear(), text: new Date().getFullYear()},
        {value: new Date().getFullYear() + 1, text: new Date().getFullYear() + 1},
        {value: new Date().getFullYear() + 2, text: new Date().getFullYear() + 2}
      ]
    }
  },
  watch: {
    selectedYear: 'toggleDisabled'
  },
  methods: {
    verifyNewBudget() {
      if (this.selectedMonth !== null) {
        let budgetTitle = this.selectedMonth + ' ' + this.selectedYear;
        if (!this.budgets.find(b => b.title === budgetTitle)) {
          this.$emit('create-budget', budgetTitle);
        } else {
          console.log('err')
        }
      } else {
        console.log('Month Required');
      }
    },
    toggleDisabled() {
      if (this.selectedYear === this.years[0].value) {
        let currentMonth = new Date().getMonth();
        for (let m = currentMonth; m >= 0; m--) {
          this.months[m].disabled = true;
        }
      } else {
        this.months.forEach(m => {
          m.disabled = false;
        });
      }
    }
  },
  beforeMount() {
    //Disables past months in current year
    this.toggleDisabled();
  }
}
</script>

<style>

</style>