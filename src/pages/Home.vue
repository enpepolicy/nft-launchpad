<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page illustration -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
        <PageIllustration />
      </div>

      <!-- Page sections -->
      <HeroHome />
      <Stats />
      <Carousel />
      <Tabs />
      <Process />
      <PricingTables />
      <TestimonialsBlocks />
      <FeaturesBlocks />
      <Cta />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import HeroHome from './../partials/HeroHome.vue'
import Stats from './../partials/Stats.vue'
import Carousel from './../partials/Carousel.vue'
import Tabs from './../partials/Tabs.vue'
import Process from './../partials/Process.vue'
import PricingTables from './../partials/PricingTables.vue'
import TestimonialsBlocks from './../partials/TestimonialsBlocks.vue'
import FeaturesBlocks from './../partials/FeaturesBlocks.vue'
import Cta from './../partials/Cta.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    PageIllustration,
    HeroHome,
    Stats,
    Carousel,
    Tabs,
    Process,
    PricingTables,
    TestimonialsBlocks,
    FeaturesBlocks,
    Cta,
    Footer,
  },
}
</script>