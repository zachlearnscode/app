<template>
   <div
      class="row mx-0 bg-light d-flex flex-row
        justify-content-center align-items-center"
    >
      <!-- Budget Name, Header Left -->
      <div class="col justify-content-start h2"> {{ title }} </div>
      <!-- Spending Progress, Header Center -->
      <div
        class="col d-flex justify-content-center"
        @click="$emit('expenditures-requested')"
      >
        <radial-progress-bar
          :diameter="100"
          :completed-steps="Number(calcProgress(spent, budgeted))"
          :total-steps="100"
          :stroke-width="15"
          :inner-stroke-width="10"
          :animate-speed="300"
          :start-color="calcProgress(spent, budgeted) <= 100 ? '#5cb85c' : '#d9534f'"
          :stop-color="calcProgress(spent, budgeted) <= 100 ? '#5cb85c' : '#d9534f'"
          v-b-tooltip.hover.left title="Click to toggle views"
        ></radial-progress-bar>
      </div>
      <!-- Summary Details, Header Right -->    
      <div class="col d-flex flex-column justify-content-end">
        <div
          v-if="!income.editing.form"
          @click="$emit('form-requested', income, 'income', $refs)"
          class="my-1 d-flex flex-row
              justify-content-end align-items-center"
          style="font-size:1.1rem;"
        >
          <span class="text-muted">
            Planned Income:
          </span>
          <span class="h3 font-weight-bold ml-3 my-0"
          > {{ income.plannedIncome | currency }} </span>
        </div>
        <edit-details-form
          v-else
          :obj="income"
          :target="'income'"
          class="justify-content-end"
          @cancel-form="income.editing.form = false"
          @change-submitted="updateIncome"
        >
          <money-input
            class="form-control w-50"
            placeholder="$0.00"
            ref="input_newIncome"
            v-model="income.editing.vModel"
          ></money-input>
        </edit-details-form>
        
        <div
          class="my-1 d-flex flex-row
            justify-content-end align-items-center"
          style="font-size:1.1rem;"
        >
          <span class="text-muted">Budgeted Expenses:</span>
          <span
            class="h3 font-weight-bold ml-3 my-0"
           :class="calcProgress(budgeted, income.plannedIncome) > 100 ? 'text-danger' : ''"          
          > {{ budgeted | currency }} </span>
        </div>
      </div>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress';
import EditDetailsForm from './EditDetailsForm.vue';

export default {
  props: ['title', 'spent', 'income', 'budgeted'],
  components: {
    RadialProgressBar,
    EditDetailsForm
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
    },
    updateIncome(obj, target) {
      if (target === 'income') {
        obj.plannedIncome = obj.editing.vModel;
        obj.editing.form = false;
        obj.editing.vModel = 0;
      }
    },
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