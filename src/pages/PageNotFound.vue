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

      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">
            <div class="max-w-3xl mx-auto text-center">
              <div class="relative inline-flex justify-center items-center">
                <img class="hidden sm:block opacity-50 md:opacity-80" src="../images/404.jpg" width="768" height="432" alt="404" />
                <div class="hidden sm:block absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
                <div class="sm:absolute w-full">
                  <h1 class="h3 font-red-hat-display mb-8">Hm, the page you were looking for doesn't exist anymore.</h1>
                  <router-link class="btn text-white bg-teal-500 hover:bg-teal-400 inline-flex items-center" to="/">
                    <span>Back to Appy</span>
                    <svg class="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path class="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import PageIllustration from './../partials/PageIllustration.vue'
import Footer from './../partials/Footer.vue'

export default {
  name: 'Features',
  components: {
    Header,
    PageIllustration,
    Footer,
  },
}
</script>
