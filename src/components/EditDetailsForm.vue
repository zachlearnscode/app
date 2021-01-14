<template>
  <form 
    class="form-group d-flex flex-row align-center m-0"
    :class="toggleFullWidth(obj)"
    @submit.prevent="$emit('change-submitted', obj, target)"
  >
    <slot></slot>

    <div class="d-flex flex-row">
      <slot name="forNewLineItem"></slot>
      <button
        type="button"
        class="btn btn-secondary btn-sm" style="width:32px;margin: 0px 3px;"
        @click="$emit('cancel-form', obj)"
      >
        <font-awesome-icon icon="times" />
      </button>
      <button type="submit" class="btn btn-primary btn-sm">
        <font-awesome-icon icon="check" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: false
    },
    target: {
      type: String,
      required: false
    }
  },
  methods: {
    toggleFullWidth(obj) {
      if (obj.editing.toggles) {
        return obj.editing.toggles.inline.newLineItemForm ? 'w-100 justify-content-between' : ''
      } else {
        return ''
      }
    }
  }
}
</script>

<style>

</style>