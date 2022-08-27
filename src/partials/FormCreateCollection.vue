<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-6 md:pt-8 ">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 ">
          <p class="text-[1.8rem] text-gray-600 dark:text-gray-400 font-red-hat-display ">Fill the form with your collection's information and be amazed with NFT Launchpad reliabilty.<br> *You will need the IPFS Folder hash and Cover Image hash. </p>
        </div>    
        
        <form action="" class="pb-10 w-full gap-x-20 gap-y-5 grid grid-cols-1 md:grid-cols-2 ">
          <!-- {/* left side */} -->
          <section class="flex flex-col gap-6">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">      
              <div class="w-full flex flex-col gap-2 text-left col-span-2">
                <label
                  htmlFor="userWalletAddress"
                  class="font-red-hat-display uppercase tracking-wider font-light"
                >
                  Connected Wallet Address
                </label>
                <div
                  class="text-2xl font-bold text-white/80 h-[45px]"
                  :class="currentAccount ? '' : 'text-white/30'"
                >
                  {{ currentAccount ? truncateAddress(currentAccount, 16) : 'NOT CONNECTED' }}
                </div>
              </div>
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="name"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Name
              </label>
              <input
                v-model="payload._tokenName"
                class="rounded-lg form-input"
                type="string"
                id="name"
                required
                placeholder="Collection's name"
              />
            </div>
            
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="envelopeAmount"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Symbol
              </label>
              <input
                v-model="payload._tokenSymbol"
                class="rounded-lg form-input"
                type="string"
                id="envelopeAmount"
                required
                :placeholder="`Eg. BAY (We suggest to use the initials of the collection).`"
              />
            </div>
            
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="envelopeAmount"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Collection Description
              </label>
              <textarea
                v-model="payload._tokenDescription"
                name="description"
                class="rounded-lg form-input"
                placeholder="Describe your collection."
                id="description"
                cols="30"
                required
                rows="3"
              ></textarea>
            </div>
            
            
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="NFTCap"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                NFT Cap (Automatic from Hash)
              </label>
              <input
                v-model="payload._nftCap"
                class="rounded-lg form-input"
                type="number"
                id="NFTCap"
                required
                placeholder="Maximum NFT's that can be minted."
              />
            </div>
            
          </section>

          <aside class="flex flex-col  justify-between gap-6">
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="mysteryBoxCap"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Mystery Box Cap
              </label>
              <input
                v-model="payload._mysteryBoxCap"
                class="rounded-lg form-input"
                type="number"
                required
                id="mysteryBoxCap"
                placeholder="Maximum Mystery Boxes"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="endDate"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Presale End Date
              </label>

              <Datepicker
                dark
                @update:modelValue="payload._presaleDate = $event"
                v-model="payload._presaleDate"
                modelType="timestamp"
                ref="datepicker"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="folderHash"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Collection Folder IPFS Hash
              </label>
              <input
                v-model="payload._baseUri"
                class="rounded-lg form-input"
                type="string"
                required
                id="folderHash"
                :placeholder="`Eg. QmTf1GaD7j9FYZzo9RUSUkHB9oLkNAZrFQB1aPrsGzWn1d`"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="coverHash"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Collection Cover IPFS Hash
              </label>
              <input
                v-model="payload._coverImageUri"
                class="rounded-lg form-input"
                type="string"
                required
                id="coverHash"
                :placeholder="`Eg. QmTf1GaD......rsGzWn1d/1.png`"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="boxPrice"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Mystery Box USD Price (Powered by Chainlink)
              </label>
              <input
                v-model="payload._mysteryBoxUsdPrice"
                type="number"
                class="rounded-lg form-input"
                placeholder="Mystery Box Usd Price"
                id="boxPrice"
                required
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="nftPrice"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                NFT USD Price (Powered by Chainlink)
              </label>
              <input
                v-model="payload._nftUsdPrice"
                type="number"
                class="rounded-lg form-input"
                placeholder="NFT Usd Price"
                id="nftPrice"
                required
              />
            </div>
          </aside>

          <div class="w-full flex flex-col col-span-full gap-2 justify-center mt-4">
            <ConnectButton
              v-if="!currentAccount"
              class="h-[70px] text-2xl"
            />
            <BaseButton
              v-else-if="!isLoading"
              @click="create"
              class="h-[70px] text-2xl"
              inner-text="Launch Collection"
            />
            <div
              v-else
              class="btn-sm text-white bg-indigo-500 hover:bg-indigo-400 h-[70px] text-2xl"
            >
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading
            </div>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';

import { currentAccount } from '../composables/useWallet'
import { createNFTCollection } from '../composables/contracts/useCollectionFactory'
import { truncateAddress } from '../utils';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['new-collection'])

const isLoading = ref(false)

const payload = ref({
  _tokenName: '',
  _tokenDescription: '',
  _tokenSymbol: '',
  _baseUri: '',
  _coverImageUri: '',
  _presaleDate: 0,
  _mysteryBoxCap: undefined,
  _nftCap: undefined,
  _mysteryBoxUsdPrice: undefined,
  _nftUsdPrice: undefined
})

async function create () {
  isLoading.value = true
  // console.log(payload.value._presaleDate)

  await createNFTCollection(payload.value)
    .then(() => {
      emit('new-collection')
    })
    .catch((err) => {
      console.log(err)
      isLoading.value = false
    })

  isLoading.value = false
}

onMounted(() => {
  payload.value._presaleDate = getNearDate()
})

// Sets n day after today as initial date in
// Unix Timestamp in seconds (not miliseconds)
function getNearDate (n = 1) {
  return Math.round(
    Math.floor(
      new Date(
        new Date()
          .setDate(
            new Date()
              .getDate() + n
          )
      )
      .getTime()
    )
  )
}

function cleanForm() {
  payload.value = {
    _tokenName: '',
    _tokenDescription: '',
    _tokenSymbol: '',
    _baseUri: '',
    _coverImageUri: '',
    _presaleDate: getNearDate(),
    _mysteryBoxCap: undefined,
    _nftCap: undefined,
    _mysteryBoxUsdPrice: undefined,
    _nftUsdPrice: undefined
  }
}
</script>
<style lang="css">
.dp__theme_dark {
  --dp-border-color: rgba(255, 255, 255, 0.3);
  --dp-background-color: #2E2E33
}
</style>