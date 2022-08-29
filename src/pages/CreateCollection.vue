<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroCreateCollection />
      <FormCreateCollection 
        @new-collection="getCollections()"
      />
      <HeroCollections
        section-title="Your Collections"
        section-description="Check your deployed collections using NFT Launchpad protocol:"
        @update-collections="getCollections()"
        :collections="collections"
      />
    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import Header from './../partials/Header.vue'
import HeroCreateCollection from './../partials/HeroCreateCollection.vue'
import FormCreateCollection from './../partials/FormCreateCollection.vue'
import HeroCollections from '../partials/HeroCollections.vue'
import Footer from './../partials/Footer.vue'

import { currentAccount } from '../composables/useWallet'
import { dynamicAddress, getDetailedCollectionsByAddress } from '../composables/contracts/useCollectionFactory'
import { Collection } from '../types'

const collections = ref<Collection[]>()

async function getCollections () {
  await getDetailedCollectionsByAddress(currentAccount.value)
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

watch([currentAccount, dynamicAddress], () => {
  if(currentAccount.value && dynamicAddress.value){
    getCollections()
  } else {
    collections.value = []
  }
}, { immediate: true })
</script>
