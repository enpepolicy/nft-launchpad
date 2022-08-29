<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroHome />
      <!-- <Process /> -->

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Header from './../partials/Header.vue'
import HeroHome from './../partials/HeroHome.vue'
// import Process from './../partials/Process.vue'
import Footer from './../partials/Footer.vue'
</script>