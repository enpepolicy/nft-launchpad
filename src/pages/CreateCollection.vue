<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroCreateCollection />
      <FormCreateCollection />
      <HeroCollections
        section-title="Your Collections"
        section-description="Check your deployed collections using NFT Launchpad protocol:"
        :collections="collections"
      />
    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Header from './../partials/Header.vue'
import HeroCreateCollection from './../partials/HeroCreateCollection.vue'
import FormCreateCollection from './../partials/FormCreateCollection.vue'
import HeroCollections from '../partials/HeroCollections.vue'
import Footer from './../partials/Footer.vue'

import { currentAccount } from '../composables/useWallet'
import { getDetailedCollectionsByAddress } from '../composables/contracts/useCollectionFactory'
import { Collection } from '../types'
import { ethers } from 'ethers'

const collections = ref<Collection[]>()

onMounted(async () => {
  if (currentAccount.value) {
    await getDetailedCollectionsByAddress(currentAccount.value)
      .then((res) => {
        const normalizedCollections = res.map(collection => {
          return {
            address: '0x75668d0C7fb32eca23d0D413469855aB9193c65c',
            name: collection.tokenName,
            description: collection.tokenDescription,
            coverIPFSHash: collection.coverImageUri,
            mysteryBoxInUSD: collection.mysteryBoxUsdPrice.toNumber(),
            NFTPriceInUSD: collection.nftUsdPrice.toNumber(),
            presaleEndDate: ''
          }
        })
        console.log(res, normalizedCollections)
        // collections.value = res
      })
  }
})
</script>
