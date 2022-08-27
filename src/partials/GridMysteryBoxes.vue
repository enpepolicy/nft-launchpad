<template>
  <section class="relative">
    
    <div class="max-w-3xl mx-auto text-center justify-center flex">
      <div class="mx-auto bottom-0 mb-10 w-0.5 h-16 bg-gray-800 dark:bg-gray-700" data-aos="fade-down" aria-hidden="true"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-12">

        <!-- Featured article -->
        <div class="max-w-3xl" data-aos="fade-down">
          <article>
            <header>
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <router-link to="/blog-post">
                  <h1 class="h1 font-red-hat-display mb-4">{{ props.sectionTitle}}</h1>
                </router-link>
                <p class="text-xl text-gray-600 dark:text-gray-400">{{ props.boxes[0] ? props.sectionDescription : 'No boxes to diplay' }}</p>
              </div>
            </header>
          </article>
        </div>

      </div>
    </div>

  </section>


  <section
    v-if="props.boxes[0]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-20 md:pb-16">
        <div class="grid gap-4 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 relative" data-aos-id-featposts>
          <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            src="../images/mystery-box-3.png"
            height="182"
          />
          <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            src="../images/mystery-box-3.png"
            height="182"
          />
          <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            src="../images/mystery-box-3.png"
            height="182"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { Collection } from '../types/index'
import BaseCollectionCard from './BaseCollectionCard.vue';

const props = defineProps({
  sectionTitle: {
    type: String,
    default: 'Your boxes',
  },
  sectionDescription: {
    type: String,
    default: 'Here are some boxes deployed using NFT Launchpad protocol:',
  },
  address: {
    type: String,
    default: '',
  },
  boxes: {
    type: Array as PropType<Array<Collection>>,
    default: () => [
      {
        address: '0x9b17C9E2AA27F93b1d0e71b872069e096cB41233',
        name: 'Collection 1',
        description: "Supp",
        coverIPFSHash: 'https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1908/sabelskaya190800807.jpg',
        mysteryBoxInUSD: 5,
        NFTPriceInUSD: 10,
        presaleEndDate: '2022.8.10'
      },
      {
        address: '0x9b17C9E2AA27F93b1d0e71b872069e096cB41233',
        name: 'Collection 2',
        description: "Support people's health harm reduction by minting a unique NFT that helps alert adulterated MDMA (Ecstasy) in festivals and events",
        coverIPFSHash: 'https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1908/sabelskaya190800807.jpg',
        mysteryBoxInUSD: 5,
        NFTPriceInUSD: 10,
        presaleEndDate: '2022.10.10'
      },
      {
        address: '0x9b17C9E2AA27F93b1d0e71b872069e096cB41233',
        name: 'Collection 3',
        description: "Support peops",
        coverIPFSHash: 'https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1908/sabelskaya190800807.jpg',
        mysteryBoxInUSD: 8,
        NFTPriceInUSD: 100,
        presaleEndDate: '2022.9.10'
      },
    ]
  },
})
</script>