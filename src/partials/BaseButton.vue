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
    default: 'btn-sm text-white bg-indigo-500 hover:bg-indigo-400'
  },
})
</script>