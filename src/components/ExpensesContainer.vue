<template>

  <div class="mainDiv container pt-3 mt-2 mx-0 rounded bg-white">
    <div class="row px-1">
      <div class="col h4">Date</div>
      <div class="col h4">Merchant</div>
      <div class="col h4">Amount</div>
      <div class="col h4">Notes</div>
    </div>
    <div
      v-for="(expenditure, index) in expenditures" :key="index"
      class="expenditureRow px-1"
      @click="$emit('ee-modal-requested', expenditure, 'edit')"
    >
      <hr class="my-1">
        <div
          class="row d-flex align-items-center"
          @click.right.prevent="openDeleteExpenseModal(expenditure)"
        >
          <div class="col"> {{ expenditure.dateLogged }} </div>
          <div class="col d-flex flex-column">
            <div> {{ expenditure.merchant }} </div>
            <div> {{ expenditure.category }} </div>
          </div>
          <div class="col"> {{ expenditure.amount | currency }} </div>
          <div class="col"> {{ expenditure.notes }} </div>
        </div>
      <hr class="my-2">
    </div>
  </div>

  
</template>

<script>
export default {
  props: ['expenditures'],
  methods: {
    openDeleteExpenseModal(expenditure) {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete the ' + expenditure.merchant + ' expenditure?', {
          title: 'Delete Expenditure?',
          okVariant: 'danger',
          okTitle: 'Delete',
          hideBackdrop: true 
          }
        )
        .then(value => {
          if (value) {
            this.$emit('delete-requested', expenditure)
          }
        })
        .catch(err => {
          alert("Something went wrong." + err)
        })
    }
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
  .mainDiv {
    min-height: calc(100vh - 84px);
  }
  .expenditureRow:nth-child(even) {
    background-color: #f8f9fa;
  }

</style>