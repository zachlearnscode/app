<template>
  <div class="progress my-1 p-0" style="height:5px">
    <div
      class="progress-bar"
      :class="calcProgress(spent, lineItem.budgeted) <= 100 ? 'bg-success' : 'bg-danger'"
      :style="'width:' + calcProgress(spent, lineItem.budgeted) + '%'"></div>
  </div>
</template>

<script>
export default {
  props: ['lineItem'],
  computed: {
    spent() {
      let spent = 0;
      if (this.lineItem.expenditures.length) {
        for (let e = 0; e < this.lineItem.expenditures.length; e++) {
          spent += this.lineItem.expenditures[e].amount;
        }
      } 
      return spent
    }
  },
  methods: {
    calcProgress(actual, budgeted) {
      let quo
      if (budgeted !== 0) {
        quo = (actual / budgeted) * 100;
        if (quo <= 100) {
          return quo.toFixed(2);
        } else {
          return quo = 101;
        }
      } else {
        return quo = 0;
      }
    }
  }

}
</script>

<style>

</style>