<template>
  <section class="relative">

    <!-- Background image -->
    <div class="absolute inset-0 h-128 pt-16 box-content -z-1">
      <img class="absolute inset-0 w-full h-full object-cover opacity-25" src="../images/hero-bg.jpg" width="1440" height="577" alt="About" />
      <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-16">

        <!-- Featured article -->
        <div class="max-w-3xl" data-aos="fade-down">
          <article>
            <header>
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <router-link to="/blog-post">
                  <h1 class="h1 font-red-hat-display mb-4">Appy launches new thematic solutions</h1>
                </router-link>
                <p class="text-xl text-gray-600 dark:text-gray-400">Curious about how your favorite product was created? Hear from the team about how it was built, and how continued improvements are made.</p>
              </div>
              <!-- Article meta -->
              <div class="md:flex md:items-center md:justify-between mt-5">
                <!-- Author meta -->
                <div class="flex items-center justify-center">
                  <a href="#0">
                    <img class="rounded-full shrink-0 mr-3" src="../images/news-author-01.jpg" width="32" height="32" alt="Author 04" />
                  </a>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">By </span>
                    <a class="font-medium text-gray-800 dark:text-gray-300 hover:underline" href="#0">Micheal Osman</a>
                    <span class="text-gray-600 dark:text-gray-400"> · Nov 2, 2020</span>
                  </div>
                </div>
              </div>
            </header>
          </article>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'HeroBlog',
}
</script>