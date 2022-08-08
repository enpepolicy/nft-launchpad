<template>
  <div
    :class="buttonClass"
    class="cursor-pointer"
  >
    {{ props.innerText }}
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  innerText: {
    type: String,
    default: 'Undefined'
  },
  loading: {
    type: Boolean,
    default: false
  },
  buttonClass: {
    type: String,
    default: 'btn-sm text-white bg-teal-500 hover:bg-teal-400'
  },
})
</script>