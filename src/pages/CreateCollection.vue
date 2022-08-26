<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroCreateCollection />
      <FormCreateCollection />
      <HeroCollections
        section-title="Your Collections"
        section-description="Check your deployed collections using NFT Launchpad protocol:"
      />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroCreateCollection from './../partials/HeroCreateCollection.vue'
import FormCreateCollection from './../partials/FormCreateCollection.vue'
import HeroCollections from '../partials/HeroCollections.vue'
import Footer from './../partials/Footer.vue'
</script>
