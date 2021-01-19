<template>
  <div class="container-fluid px-0">
    <transition
      appear
      appear-active-class="animate__animated animate__slideInRight"
    >
      <b-card body-tag="" class="container-fluid px-0 mb-2 sticky-top">
        <template v-slot:header>
          <div class="row px-0">
            <div class="col lead">Date</div>
            <div class="col lead">Merchant</div>
            <div class="col lead">Spent</div>
            <div class="col lead">Notes</div>
          </div>
        </template>
      </b-card>
    </transition>
    <div>
      <transition-group
        :appear="true" @before-appear="beforeAppear" @appear="appear"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <b-card
          v-for="(expenditure, index) in expenditures"
          :key="expenditure.timeLogged" :data-index="index"
          @click="$emit('ee-modal-requested', expenditure)"
          @click.right.prevent="openDeleteExpenseModal(expenditure)"
        >
          <b-card-body class="p-0">
            <div class="row">
              <div class="col">{{expenditure.dateLogged}}</div>
              <div class="col">{{expenditure.merchant}}</div>
              <div class="col">{{expenditure.amount | currency}}</div>
              <div class="col">{{expenditure.notes}}</div>
            </div>
          </b-card-body>
        </b-card>
      </transition-group>
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
    },
    beforeAppear(el) {
      el.className = "d-none";
    },
    appear(el) {
      let delay = el.dataset.index * 15;
      setTimeout(function() {
        el.className = "container-fluid bg-white p-0 mb-2 shadow-sm animate__animated animate__fadeIn"
      }, delay);
    }
  },
  filters: {
    currency: function(num) {
      return num.toLocaleString("en-US", {style: 'currency', currency: 'USD'});
    }
  }

}
</script>

<style scoped>
  .moveClass {
    transition: position .5s ease;
  }

</style>