<template>
  <section class="border-t border-transparent dark:border-gray-800">
    <div class="py-12 md:py-20">

      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 class="h2 font-red-hat-display mb-4">From rough design files, to powerful products</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p>
        </div>

      </div>

      <!-- Carousel built with Swiper.js [https://swiperjs.com/] -->
      <!-- * Custom styles in src/css/additional-styles/theme.scss -->
      <div class="carousel swiper-container">
        <div class="swiper-wrapper">
          <!-- Carousel items -->
          <div class="swiper-slide max-w-lg">
            <img class="transition-opacity duration-300" src="../images/carousel-item-01.jpg" width="540" height="460" alt="Carousel item 01" />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="flex grow">
                <a class="inline-flex btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mx-auto self-center" href="#0">Learn more</a>
              </div>
              <div class="absolute bottom-0 right-0 p-6">
                <a class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out" href="#0">Creative Services</a>
              </div>
            </div>
          </div>
          <div class="swiper-slide max-w-lg">
            <img class="transition-opacity duration-300" src="../images/carousel-item-02.jpg" width="540" height="460" alt="Carousel item 02" />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="flex grow">
                <a class="inline-flex btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mx-auto self-center" href="#0">Learn more</a>
              </div>
              <div class="absolute bottom-0 right-0 p-6">
                <a class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out" href="#0">Creative Services</a>
              </div>
            </div>
          </div>
          <div class="swiper-slide max-w-lg">
            <img class="transition-opacity duration-300" src="../images/carousel-item-03.jpg" width="540" height="460" alt="Carousel item 03" />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="flex grow">
                <a class="inline-flex btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mx-auto self-center" href="#0">Learn more</a>
              </div>
              <div class="absolute bottom-0 right-0 p-6">
                <a class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out" href="#0">Creative Services</a>
              </div>
            </div>
          </div>
          <div class="swiper-slide max-w-lg">
            <img class="transition-opacity duration-300" src="../images/carousel-item-04.jpg" width="540" height="460" alt="Carousel item 04" />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="flex grow">
                <a class="inline-flex btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mx-auto self-center" href="#0">Learn more</a>
              </div>
              <div class="absolute bottom-0 right-0 p-6">
                <a class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out" href="#0">Creative Services</a>
              </div>
            </div>
          </div>
          <div class="swiper-slide max-w-lg">
            <img class="transition-opacity duration-300" src="../images/carousel-item-05.jpg" width="540" height="460" alt="Carousel item 05" />
            <div class="absolute inset-0 flex flex-col transition-opacity duration-300 translate-z-0">
              <div class="flex grow">
                <a class="inline-flex btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mx-auto self-center" href="#0">Learn more</a>
              </div>
              <div class="absolute bottom-0 right-0 p-6">
                <a class="text-xs font-medium text-center text-white py-2 px-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-100 transition duration-150 ease-in-out" href="#0">Creative Services</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrows -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between mt-12 md:mt-16">
          <button class="carousel-prev relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group bg-indigo-500 hover:bg-indigo-400 dark:bg-gray-800 dark:hover:bg-indigo-500 dark:hover:bg-opacity-25 shadow-xl transition duration-150 ease-in-out">
            <span class="sr-only">Previous</span>
            <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-indigo-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
            </svg>
          </button>
          <button class="carousel-next relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group bg-indigo-500 hover:bg-indigo-400 dark:bg-gray-800 dark:hover:bg-indigo-500 dark:hover:bg-opacity-25 shadow-xl transition duration-150 ease-in-out">
            <span class="sr-only">Next</span>
            <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-indigo-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
// Import Swiper
import Swiper, { Autoplay, Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'
Swiper.use([Autoplay, Navigation])

export default {
  name: 'Carousel',
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const carousel = new Swiper('.carousel', {
      slidesPerView: 'auto',
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 24,
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    })
  }
}
</script>