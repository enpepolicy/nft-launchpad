<template>
    <article
        class="group flex flex-col"
        data-aos="fade-up"
        data-aos-anchor="[data-aos-id-featposts]"
        data-aos-delay="400"
        >
        <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            :src="imageUrl"
            height="182"
            :alt="collection.name"
        />
        <div
            :class="getRandomBackgroundColor()"
            class="opacity-70 group-hover:opacity-90 transition duration-700 ease-out px-6 py-4 rounded-b-[0.25rem]"
        >
            <div class="text-white grid grid-cols-1 gap-4 place-content-between">
            <header class="grow">
                <h3 class="text-lg font-red-hat-display font-bold tracking-tight mb-2">
                {{ collection.name }}
                </h3>
                <div class="text-sm opacity-80 italic">{{ collection.description.substring(0, 80) }} {{ collection.description.length > 80 ? '...' : '' }}</div>
            </header>

            </div>
        </div>

        <div class="pt-4 text-center">
            <a
            :href="`https://mumbai.polygonscan.com/address/${collection.address}`"
            target="_blank"
            class="text-sm opacity-100 hover:font-semibold"
            >
            📝 Check Contract 📝
            </a>
            <div
              :class="presaleIsActive(collection.presaleEndDate) ? '' : 'line-through'"
              class="text-xs opacity-100 text-white/60"
            >
              Total Mystery Boxes: {{ collection.capMysteryBox }}</div>
            <div class="text-xs opacity-100 text-white/60">NFT's Left: {{ collection.availableNftsQuantity }} / {{ collection.capNFT }}</div>
            <div class="text-xs opacity-100 text-white/60">Box Price: {{ collection.mysteryBoxInUSD / 100 }} USD / {{  maticPriceBox ? maticPriceBox : '-' }} MATIC</div>
            <div class="text-xs opacity-100 text-white/60">NFT Price: {{ collection.mysteryBoxInUSD / 100 }} USD / {{ maticPriceNFT ?  maticPriceNFT : '-' }} MATIC</div>
        </div>

        <BaseButton
          v-if="!isLoading"
          @click="presaleIsActive(collection.presaleEndDate) ? validateConnectedWallet(buyBox) : validateConnectedWallet(buyNFT)"
          :class="presaleIsActive(collection.presaleEndDate) ? 'bg-indigo-800' : 'bg-indigo-500'"
          class="mt-4"
          :inner-text="presaleIsActive(collection.presaleEndDate) ? `Buy Box` : `Buy NFT`"
        />

        <div
          v-else
          class="btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mt-4"
        >
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading
          </div>

        <div
          v-if="presaleIsActive(String(Number(collection.presaleEndDate)))"
          class="pt-4 px-4"
        >
            <div class="text-xs opacity-100 font-semibold text-center">Presale Ends In:</div>
            <BaseCountdown
              :endDate="new Date(Number(collection.presaleEndDate) * 1000)"
            />
        </div>
    </article>
</template>
<script setup lang="ts">
import { PropType, readonly, computed, onMounted, ref } from 'vue';
import { utils } from 'ethers';

import BaseCountdown from './BaseCountdown.vue';
import BaseButton from './BaseButton.vue';

import { Collection } from '../types/index'
import { getTokenAmount, buyMysteryBoxByCollection, mintByCollection } from '../composables/contracts/useNFTStore';
import { currentAccount } from '../composables/useWallet';
import { notifyError, notifySuccess } from '../composables/useNotification';

const props = defineProps({
  collection: {
    type: Object as PropType<Collection>,
    default: () => []
  },
})

const isLoading = ref(false)
const maticPriceNFT = ref('')
const maticPriceBox = ref('')

const backgroundColors = readonly(['bg-pink-800', 'bg-indigo-800', 'bg-purple-800', 'bg-green-800', 'bg-orange-800', 'bg-red-800' ])

const imageUrl = computed(() => {
  return 'https://gateway.pinata.cloud/ipfs/' + props.collection.coverIPFSHash
})

async function buyBox() {
  isLoading.value = true
  
  let priceInNative = await getTokenAmount(props.collection.NFTPriceInUSD)
  priceInNative = priceInNative.toString()

  await buyMysteryBoxByCollection(props.collection.address, priceInNative.toString())
    .then(() => notifySuccess('You bought a Mystery Box.'))
    .catch((err) => {
      // notifyError(err.data?.message || err.message || 'An error has occured.')
      notifyError(err.message || 'An error has occured.')
    })
    .finally(() => isLoading.value = false)
}

async function buyNFT() {
  isLoading.value = true
 
  let priceInNative = await getTokenAmount(props.collection.NFTPriceInUSD)

  priceInNative = priceInNative.toString()

  await mintByCollection(props.collection.address, priceInNative)
    .then(() => notifySuccess('You minted an NFT.'))
    .catch((err) => {
      notifyError(err.message || 'An error has occured.')
    })
    .finally(() => isLoading.value = false)
}

async function convertUSDToNativeToken () {
  maticPriceNFT.value = formatPrice(utils.formatEther(await getTokenAmount(props.collection.NFTPriceInUSD)))
  maticPriceBox.value = formatPrice(utils.formatEther(await getTokenAmount(props.collection.mysteryBoxInUSD)))
}

function validateConnectedWallet(callback) {
  if (currentAccount.value) {
    callback()
  } else {
    notifyError('Connect Wallet')
  }
}

function getRandomBackgroundColor () {
  const backgroundColorsCopy = Object.assign([], backgroundColors)
  const randomColor = backgroundColorsCopy.sort(() => Math.random() - Math.random()).slice(0, 1)
  return randomColor
}

function presaleIsActive (date: string) {
  // console.log(new Date(Number(date) * 1000).getTime() < new Date().getTime())
  if (new Date(Number(date) * 1000).getTime() < new Date().getTime()) {
    return false;
  }
  return true;
}

function formatPrice(x: number | string, float = 2) {
  x = Number(x);
  const price = Number.parseFloat(String(x)).toFixed(float);

  return `${price}`;
}

onMounted(async () => {
  convertUSDToNativeToken()
})
</script>