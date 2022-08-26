<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroNFTStore />
      <HeroCollections
        section-title="Available Collections"
      />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroNFTStore from '../partials/HeroNFTStore.vue'
import HeroCollections from '../partials/HeroCollections.vue'
import Footer from '../partials/Footer.vue'
</script>
