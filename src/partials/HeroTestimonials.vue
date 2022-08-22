<template>
  <section class="relative">

    <!-- Background image -->
    <div class="absolute inset-0 h-128 pt-16 box-content -z-1">
      <img class="absolute inset-0 w-full h-full object-cover opacity-25" src="../images/hero-bg-02.jpg" width="1440" height="577" alt="Testimonials" />
      <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-20">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="h1 font-red-hat-display mb-4" data-aos="fade-down">Smart teams trust Appy to build killer websites</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="150">Our customers are building some of the world's most original, useful and
            loved products.</p>
          <div class="mt-8" data-aos="fade-down" data-aos-delay="300">
            <router-link class="btn text-white bg-teal-500 hover:bg-teal-400 ml-3" to="/contact">Request code</router-link>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'HeroTestimonials',
}
</script>