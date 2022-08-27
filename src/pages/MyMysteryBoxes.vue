<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroMyMysteryBoxes />
      <GridMysteryBoxes
        section-title="Your Mystery Boxes"
        section-description="Take a look to your unrevealed Mystery Boxes:"
      />

    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Header from './../partials/Header.vue'
import HeroMyMysteryBoxes from '../partials/HeroMyMysteryBoxes.vue'
import GridMysteryBoxes from '../partials/GridMysteryBoxes.vue'
import Footer from '../partials/Footer.vue'

import { getAllCollectionData } from '../composables/contracts/useCollectionFactory'

onMounted(async () => {
  await getAllCollectionData().then(res => console.log('TO-DO fetch Mystery Boxes', res))
})
</script>
