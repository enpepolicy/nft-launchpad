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
            <div>
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <router-link to="/blog-post">
                  <h1 class="h1 font-red-hat-display mb-4">{{ props.sectionTitle}}</h1>
                </router-link>
                <p class="text-xl text-gray-600 dark:text-gray-400">{{ props.nftList[0] ? props.sectionDescription : 'No NFT to display.' }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>


  <section
    v-if="props.nftList[0]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-20 md:pb-16">
        <div class="grid gap-4 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 relative" data-aos-id-featposts>
          <BaseNFTCard
            v-for="(nft, index) in nftList"
            :nft="nft"
            :key="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import BaseNFTCard from './BaseNFTCard.vue';

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
  nftList: {
    type: Array as PropType<Array<any>>,
    default: () => []
  },
})
</script>