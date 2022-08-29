<template>
  <div class="flex flex-col min-h-screen overflow-hidden">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page sections -->
      <HeroMyNFT />
      <GridNFT
        section-title="Your NFT"
        section-description="Take a look to your collection:"
        :nft-list="nftList"
      />

    </main>

    <!-- Site footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

import Header from './../partials/Header.vue'
import HeroMyNFT from '../partials/HeroMyNFT.vue'
import GridNFT from '../partials/GridNFT.vue'
import Footer from '../partials/Footer.vue'

import { getUserNfts, getTokenUriByAddressAndId } from '../composables/contracts/useNFTStore'
import { currentAccount } from '../composables/useWallet'

const nftList = ref<Array<any>>([])

async function fetchMetadata (address: string, tokenId: string) {
  return await fetch(`https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}?chain=mumbai&format=decimal`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'kcxhRlOE3tiqR8nQHtXfWd1Rew9PSvTcGj2sP6CL7Hl1sJPsP4CxofWlDDRuu6fK'
      },
    })
      .then(response => {
        const answer = response.json()
        return answer
      })
}

// TO-DO index somehow better this data
async function getNfts () {
  nftList.value = []
  await getUserNfts(currentAccount.value)
    .then((res) => {
      // console.log(res)
      res.forEach(element => {
        element.nftIds.forEach(async (id) => {
          // console.log(await fetchMetadata(element.collectionAddres, String(id.toNumber())))
          nftList.value.push(await fetchMetadata(element.collectionAddres, String(id.toNumber())))
        })
      });
    })
}

watch(currentAccount, async () => {
  if(currentAccount.value){
    getNfts()
    await getTokenUriByAddressAndId('0x76DA7dC945032c50304a15E7C56DBc2775C91386', 8)
  }
}, { immediate: true })
</script>
