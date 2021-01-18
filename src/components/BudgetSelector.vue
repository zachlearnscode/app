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
    budgets: 'disableOptions',
    selectedMonth: 'disableOptions',
    selectedYear: 'disableOptions'
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
    disableOptions() {
      let existing = this.budgets.map(b => b.title);
      
      for (let m = 0; m < this.months.length; m++) {
        if (existing.includes(this.months[m].text + ' ' + this.selectedYear)) {
          this.months[m].disabled = true;
          this.months[m].html
        } else {
          this.months[m].disabled = false;
        }
      }
    }
  }
}
</script>

<style>

</style>