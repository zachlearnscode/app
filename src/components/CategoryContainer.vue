<template>
  <div class="container-fluid">
  <!-- Header Row -->
    <div class="row">
      <div
        class="col py-1
          d-flex flex-row justify-content-between"
      >
        <span
          class="font-weight-bold
            text-uppercase"
        > {{ category.label }} </span>
        <span
          class="font-weight-light"
        > Planned </span>
      </div>
    </div>
    <!-- Line Items -->
    <line-item-row
      v-for="(lineItem, index) in category.lineItems"
      v-on="$listeners"
     :key="index"
     :ref="'lineItem'"
     :lineItem="lineItem"
     :category="category.label"
      @cancel-form="removeLineItem(lineItem)"
      @delete-requested="removeLineItem"
    ></line-item-row>
    <!-- Add Line Item Btn -->
    <div class="row">
      <div class="col d-flex flex-row justify-content-between">
        <button
          class="btn btn-link p-0"
          style="font-size:14px;text-align:left"
          @click="addLineItem"
        >Add Line Item</button>
      </div>
    </div>
  </div>
</template>

<script>
import LineItemRow from './LineItemRow.vue';
import { LineItem } from '@/modules/BudgetClasses.js';


export default {
  props: ['category'],
  components: {
    LineItemRow
  },
  data() {
    return {
      counter: 1
    }
  },
  methods: {
    addLineItem() {
      this.category.lineItems.push(new LineItem('Unnamed Line Item ' + this.counter++));
      //Emit event to show form on line item creation
      let lineItem = this.category.lineItems[this.category.lineItems.length - 1];
      this.$nextTick(function() {
        this.$emit('form-requested', lineItem, 'newLineItem', this.$refs)
      })
    },
    removeLineItem(lineItem) {
      let c = this.category.lineItems;
      c.splice(c.indexOf(c.find(l => l.label === lineItem.label)), 1)
    }
  }
}
</script>

<style>

</style>