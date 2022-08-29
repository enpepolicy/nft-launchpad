<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroMyMysteryBoxes />
      <GridMysteryBoxes
        :boxes="cleanMysteryBoxes"
        section-title="Your Mystery Boxes"
        section-description="Take a look to your unrevealed Mystery Boxes:"
        @update-boxes="getMysteryBoxesByAddress"
      />

    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import Header from './../partials/Header.vue'
import HeroMyMysteryBoxes from '../partials/HeroMyMysteryBoxes.vue'
import GridMysteryBoxes from '../partials/GridMysteryBoxes.vue'
import Footer from '../partials/Footer.vue'

import { currentAccount } from '../composables/useWallet'
import { getUserMysteryBoxes } from '../composables/contracts/useNFTStore'

const cleanMysteryBoxes = ref<Array<{ address: string; amount: number }>>([])

// TO-DO index somehow better this data
async function getMysteryBoxesByAddress () {
  cleanMysteryBoxes.value = []

  await getUserMysteryBoxes(currentAccount.value)
    .then((res) => {
      res.forEach(element => {
        cleanMysteryBoxes.value.push({
          address: element.collectionAddres,
          amount: element.counter.toNumber()
        })
      });
    })
}

watch(currentAccount, async () => {
  if(currentAccount.value){
    await getMysteryBoxesByAddress()
  }
}, { immediate: true })
</script>
