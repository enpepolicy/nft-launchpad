<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroAbout />
      <FeaturesGallery />
      <Timeline />
      <Career />
      <FeaturesAnimation />
      <Team />
      <CtaContact />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import HeroAbout from './../partials/HeroAbout.vue'
import FeaturesGallery from './../partials/FeaturesGallery.vue'
import Timeline from './../partials/Timeline.vue'
import Career from './../partials/Career.vue'
import FeaturesAnimation from './../partials/FeaturesAnimation.vue'
import Team from './../partials/Team.vue'
import CtaContact from './../partials/CtaContact.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'About',
  components: {
    Header,
    HeroAbout,
    FeaturesGallery,
    Timeline,
    Career,
    FeaturesAnimation,
    Team,
    CtaContact,
    Footer,
  },
};
</script>
