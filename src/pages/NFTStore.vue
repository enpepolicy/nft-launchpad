<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroNFTStore />

      <HeroCollections
        :collections="collections"
        @update-collections="getCollections()"
        section-title="Available Collections"
      />

    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

import Header from './../partials/Header.vue'
import HeroNFTStore from '../partials/HeroNFTStore.vue'
import HeroCollections from '../partials/HeroCollections.vue'
import Footer from '../partials/Footer.vue'
import { Collection } from '../types'

import { dynamicAddress, getAllCollectionData } from '../composables/contracts/useCollectionFactory'

const collections = ref<Collection[]>()

async function getCollections () {
  await getAllCollectionData()
    .then((res) => {
      const normalizedCollections = res.map(collection => {
        return {
          address: collection.collectionAddress,
          name: collection.tokenName,
          description: collection.tokenDescription,
          coverIPFSHash: collection.coverImageUri,
          mysteryBoxInUSD: collection.mysteryBoxUsdPrice.toNumber(),
          NFTPriceInUSD: collection.nftUsdPrice.toNumber(),
          presaleEndDate: collection.presaleDate.toNumber(),
          capMysteryBox: collection.mysteryBoxCap,
          capNFT: collection.nftCap,
          // availableMysteryBoxesQuantity: collection.availableMysteryBoxes,
          availableNftsQuantity: collection.availableNfts.length
        }
      })
      // console.log(res, normalizedCollections)
      collections.value = normalizedCollections
    })
}

watch(dynamicAddress, () => {
  if(dynamicAddress.value){
    getCollections()
  }
}, { immediate: true })
</script>
