<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-12 md:pb-20">

        <!-- Carousel area -->
        <div class="max-w-5xl mx-auto">

          <!-- Carousel -->
          <div class="relative" data-aos="fade-down">

            <!-- Testimonials -->
            <transition-group
              tag="div"
              class="relative flex items-start z-10 transition-all duration-300 ease-in-out"
              enter-active-class="transition ease-in-out duration-700 transform order-first"
              enter-from-class="opacity-0 -translate-y-8"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in-out duration-300 transform absolute"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-8"
            >
              <template v-for="(item, index) in items" :key="index">
                <div
                  v-show="active === index"
                  class="w-full text-center px-12 py-8 mx-4 md:mx-0"
                >
                  <div class="inline-flex mb-3">
                    <!-- Twitter icon -->
                    <svg class="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 6.1c-1.2.5-2.4.9-3.8 1 1.4-.8 2.4-2.1 2.9-3.6-1.3.8-2.7 1.3-4.2 1.6C25.7 3.8 24 3 22.2 3c-3.6 0-6.6 2.9-6.6 6.6 0 .5.1 1 .2 1.5-5.5-.3-10.3-2.9-13.6-6.9-.6 1-.9 2.1-.9 3.3 0 2.3 1.2 4.3 2.9 5.5-1.1 0-2.1-.3-3-.8v.1c0 3.2 2.3 5.8 5.3 6.4-.6.1-1.1.2-1.7.2-.4 0-.8 0-1.2-.1.8 2.6 3.3 4.5 6.1 4.6-2.2 1.8-5.1 2.8-8.2 2.8-.5 0-1.1 0-1.6-.1 3 1.8 6.5 2.9 10.2 2.9 12.1 0 18.7-10 18.7-18.7v-.8c1.2-1 2.3-2.1 3.2-3.4z" fill="#1DA1F2" fill-rule="nonzero" />
                    </svg>
                  </div>
                  <blockquote class="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-400 mb-4">{{item.quote}}</blockquote>
                  <div class="font-medium text-lg">
                    <cite class="not-italic text-gray-800 dark:text-gray-100">{{item.name}}</cite>
                    <span class="text-gray-200 dark:text-gray-700"> - </span>
                    <span class="text-gray-500 dark:text-gray-400">{{item.role}}</span> <a class="text-indigo-500 hover:underline" :href="item.link">{{item.team}}</a>
                  </div>
                </div>
              </template>

            </transition-group>

            <!-- Skewed borders -->
            <div class="absolute inset-0 transform -skew-x-3 border-2 border-gray-200 dark:border-gray-800 pointer-events-none" aria-hidden="true"></div>

            <!-- Arrows -->
            <div class="absolute inset-0 flex items-center justify-between">
              <button class="relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group transform -translate-x-2 md:-translate-x-1/2 bg-indigo-500 hover:bg-indigo-400 dark:bg-gray-800 dark:hover:bg-indigo-500 dark:hover:bg-opacity-25 transition duration-150 ease-in-out" @click="active = active === 0 ? items.length - 1 : active - 1; stopAutorotate();">
                <span class="sr-only">Previous</span>
                <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-indigo-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
                </svg>
              </button>
              <button class="relative z-20 w-12 h-12 p-1 box-content flex items-center justify-center group transform translate-x-2 md:translate-x-1/2 bg-indigo-500 hover:bg-indigo-400 dark:bg-gray-800 dark:hover:bg-indigo-500 dark:hover:bg-opacity-25 transition duration-150 ease-in-out" @click="active = active === items.length - 1 ? 0 : active + 1; stopAutorotate();">
                <span class="sr-only">Next</span>
                <svg class="w-4 h-4 fill-current text-white dark:text-gray-400 group-hover:text-white dark:group-hover:text-indigo-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsCarousel',
  data: function () {
    return {
      active: 0,
      autorotate: true,
      autorotateTiming: 7000,
      items: [
        {
          quote:
            '“ When we first met Appy, we were skeptical. We tried lots of things before and none of them worked. But, when we tested the Shape Builder it just perfect for our needs. “',
          name: 'Alexandre Park',
          role: 'Design Manager at',
          team: 'Twitter',
          link: '#0',
        },
        {
          quote:
            '“ Not only in my career but in education as well, I feel grateful that Simple pushed me to expand my horizons and strive to accomplish more.“',
          name: 'Greg Sebastian',
          role: 'Head of Design at',
          team: 'Shopify',
          link: '#0',
        },
        {
          quote:
            '“ I feel grateful that Simple pushed me to expand my horizons and strive to accomplish more. When we first met Appy, we were skeptical for no reason.“',
          name: 'Dominik Prasad',
          role: 'Backend Lead at',
          team: 'Google',
          link: '#0',
        },
      ],
    }
  },
  methods: {
    stopAutorotate() {
      clearInterval(this.autorotateInterval)
    },
  },
  mounted() {
    if (this.autorotate) {
      this.autorotateInterval = setInterval(() => {
        this.active =
          this.active + 1 === this.items.length ? 0 : this.active + 1
      }, this.autorotateTiming)
    }
  },
  beforeUnmount() {
    this.stopAutorotate()
  },
}
</script>