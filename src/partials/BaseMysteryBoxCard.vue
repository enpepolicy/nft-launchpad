<template>
    <div>
        <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            data-aos="fade-up"
            data-aos-anchor="[data-aos-id-featposts]"
            data-aos-delay="400"
            src="../images/mystery-box-3.png"
            height="182"
        />
        <div class="flex flex-col justify-center px-4 py-2">
          <a
            :href="`https://mumbai.polygonscan.com/address/${box.address}`"
            target="_blank"
            class="text-xl first-letter:opacity-100 font-semibold text-blue-600  hover:text-white duration-300 transition-all text-center"
            >
              <span class="uppercase">{{ box ? truncateAddress(box.address, 10) : 'Fetching...' }} </span>
          </a>
          <div class="text-base text-center"> Left: {{ box.amount }} </div>
        </div>
        <!-- :class="presaleIsActive(collection.presaleEndDate) ? 'bg-indigo-800' : 'bg-indigo-500'"
        :inner-text="presaleIsActive(collection.presaleEndDate) ? `Buy Presale Box ($${collection.mysteryBoxInUSD / 100})` : `Buy NFT ($${collection.NFTPriceInUSD / 100} USD)`" -->
        <div
            class="px-4 pb-4"
        >
            <BaseButton
              v-if="!isLoading"
              @click="buyNFT"
              class="mt-4 bg-indigo-500 w-full"
              inner-text="Open Mystery Box"
            />
            <div
              v-else
              class="btn-sm text-white bg-indigo-500 hover:bg-indigo-400 mt-4 w-full"
            >
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import BaseButton from './BaseButton.vue';

import { truncateAddress } from '../utils';
import { notifyError, notifySuccess } from '../composables/useNotification';
import { mintByCollection } from '../composables/contracts/useNFTStore';

const props = defineProps({
  box: {
    type: Object as PropType<any>,
    default: () => {}
  },
})
const emit = defineEmits(['update-boxes'])

const isLoading = ref(false)

async function buyNFT() {
  isLoading.value = true
 
  let priceInNative = '0'

  await mintByCollection(props.box.address, priceInNative)
    .then(() => notifySuccess('You minted an NFT.'))
    .catch((err) => {
      console.log(err.error.data.message)
      notifyError(err.error?.data?.message || err.message || 'An error has occured.')
    })
    .finally(() => {
      emit('update-boxes')
      isLoading.value = false
    })
}
</script>