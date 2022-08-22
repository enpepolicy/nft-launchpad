<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroTestimonials />
      <Clients />
      <VideoTestimonial />
      <TestimonialsCarousel />
      <TestimonialsCircles />
      <Cta />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import HeroTestimonials from './../partials/HeroTestimonials.vue'
import Clients from './../partials/Clients.vue'
import VideoTestimonial from './../partials/VideoTestimonial.vue'
import TestimonialsCarousel from './../partials/TestimonialsCarousel.vue'
import TestimonialsCircles from './../partials/TestimonialsCircles.vue'
import Cta from './../partials/Cta.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Testimonials',
  components: {
    Header,
    HeroTestimonials,
    Clients,
    VideoTestimonial,
    TestimonialsCarousel,
    TestimonialsCircles,
    Cta,
    Footer,
  },
};
</script>
