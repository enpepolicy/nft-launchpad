<template>
  <router-view />
  <NotificationGroup />
</template>

<script setup lang="ts">
import AOS from 'aos'

import NotificationGroup from './partials/NotificationGroups.vue';

import { onMounted, onBeforeUnmount } from 'vue';
import {
  initializeWallet,
  removeWindowEthereumListeners
} from './composables/useWallet'

onMounted(() => {
  initializeWallet()
  AOS.init({
    once: true,
    disable: 'phone',
    duration: 600,
    easing: 'ease-out-sine',
  })
})

onBeforeUnmount(() => {
  removeWindowEthereumListeners()
})
</script>
