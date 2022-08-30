<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-32 pb-10 md:pt-40 md:pb-16">

        <!-- Hero content -->
        <div class="md:grid md:grid-cols-12 md:gap-12 lg:gap-20 items-center">

          <!-- Content -->
          <div class="md:col-span-7 lg:col-span-7 mb-8 md:mb-0 text-center md:text-left">
            <h1 class="h1 lg:text-6xl mb-4 font-red-hat-display font-extrabold" data-aos="fade-down"><span class="text-indigo-500"> Launch</span> your collections in a blink</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="150">With a smooth Mystery Box system out from the box for early buyers, random nft's where never this easy to deploy.</p>
            <ul class="max-w-sm sm:max-w-md mx-auto md:max-w-none text-gray-600 dark:text-gray-400 mt-8 -mb-2" data-aos="fade-down" data-aos-delay="450">
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-indigo-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>End-to-end contract testing.</span>
              </li>
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-indigo-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Mystery Boxes with real randomness powered by Chainlink.</span>
              </li>
              <li class="flex items-center mb-2">
                <svg class="w-3 h-3 fill-current text-indigo-400 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>Current fiat prices powered by Chainlink.</span>
              </li>
            </ul>
          </div>

          <!-- Mobile mockup -->
          <div class="md:col-span-5 lg:col-span-5 text-center md:text-right" data-aos="fade-up" data-aos-delay="450">
            <div class="inline-flex relative justify-center items-center">
              <!-- Glow illustration -->
              <svg class="absolute mr-12 mt-32 pointer-events-none -z-1 dark:opacity-40" aria-hidden="true" width="678" height="634" viewBox="0 0 678 634" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="240" cy="394" r="240" fill="url(#piphoneill_paint0_radial)" fill-opacity=".4" />
                <circle cx="438" cy="240" r="240" fill="url(#piphoneill_paint1_radial)" fill-opacity=".6" />
                <defs>
                  <radialGradient id="piphoneill_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 -77 317) scale(189.054)">
                    <stop stop-color="#667EEA" />
                    <stop offset="1" stop-color="#667EEA" stop-opacity=".01" />
                  </radialGradient>
                  <radialGradient id="piphoneill_paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 99 339) scale(189.054)">
                    <stop stop-color="#9F7AEA" />
                    <stop offset="1" stop-color="#9F7AEA" stop-opacity=".01" />
                  </radialGradient>
                </defs>
              </svg>

              <!-- Image inside mockup size: 290x624px (or 580x1248px for Retina devices) -->
              <img
                class="absolute transition-all duration-500" src="../images/shuttle.png" width="290" height="624" style="max-width: 75%;" alt="Features illustration"
                :class="launchButtonIsHovered ? '-mt-24' :  '-mt-16 opacity-90'"
              />
              <router-link to="/launch-collection" @mouseover="launchButtonIsHovered  = true"
                @mouseleave="launchButtonIsHovered  = false"
                class="absolute btn text-white bg-indigo-500 hover:bg-indigo-400 shrink-0 bottom-16 cursor-pointer" aria-label="Cruip"
              >
                Launch Collection
              </router-link>

              <!-- iPhone mockup -->
              <img class="relative max-w-full mx-auto md:mr-0 md:max-w-none h-auto pointer-events-none" src="../images/iphone-mockup.png" width="344" height="674" alt="iPhone mockup" aria-hidden="true" />
            </div>
          </div>
        </div>        
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const launchButtonIsHovered = ref(false)
</script>