<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-6 md:pt-8 ">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 ">
          <p class="text-[1.8rem] text-gray-600 dark:text-gray-400 font-red-hat-display ">Fill the form with your collection's information and be amazed with NFT Launchpad reliabilty. *You will need the IPFS Folder hash. </p>
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
                htmlFor="userMessage"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Name
              </label>
              <input
                v-model="message"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="maxParticipants"
                placeholder="Type your answer here"
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
                v-model="totalPocketAmount"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="envelopeAmount"
                :placeholder="`Amount in ETH`"
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
                v-model="message"
                name="userMessage"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                placeholder="Type your message here"
                id="userMessage"
                cols="30"
                required
                rows="3"
              ></textarea>
            </div>
            
            
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="maxParticipants"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                NFT Cap (Automatic from Hash)
              </label>
              <input
                v-model="maxParticipants"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="maxParticipants"
                placeholder="Type your answer here"
              />
            </div>
            
          </section>

          <aside class="flex flex-col  justify-between gap-6">
            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="envelopeAmount"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Presale End Date
              </label>
              <input
                v-model="totalPocketAmount"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="envelopeAmount"
                :placeholder="`Amount in ETH`"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="maxParticipants"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Mystery Box Cap
              </label>
              <input
                v-model="maxParticipants"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="maxParticipants"
                placeholder="Type your answer here"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="envelopeAmount"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Collection Folder IPFS Hash
              </label>
              <input
                v-model="totalPocketAmount"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="envelopeAmount"
                :placeholder="`Amount in ETH`"
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="username"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Mystery Box USD Price (Powered by Chainlink)
              </label>
              <input
                v-model="name"
                type="text"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                placeholder="Type your name/alias"
                id="username"
                required
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="username"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                NFT USD Price (Powered by Chainlink)
              </label>
              <input
                v-model="name"
                type="text"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                placeholder="Type your name/alias"
                id="username"
                required
              />
            </div>

            <div class="w-full flex flex-col gap-2 text-left">
              <label
                htmlFor="envelopeAmount"
                class="font-red-hat-display uppercase tracking-wider font-light"
              >
                Collection Cover IPFS Hash
              </label>
              <input
                v-model="totalPocketAmount"
                class="rounded-lg text-darkViolet font-semibold text-lg"
                type="number"
                id="envelopeAmount"
                :placeholder="`Amount in ETH`"
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
import {
  ref,
  // onMounted
} from 'vue'
// import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue';
import ConnectButton from './ConnectButton.vue';
import {
  currentAccount,
  // currentNetworkId
} from '../composables/useWallet'
// import { isOpen } from '../composables/useCreateEnvelopeForm'
import { truncateAddress } from '../utils';
// import { createEnvelope, getEnvelopesByAddress } from './../composables/contracts/useEnvelopesContract'
// import { NetworkEnum } from '../composables/network.enum'
// const router = useRouter()
const isLoading = ref(false)
const name = ref('')
const message = ref('')
const totalPocketAmount = ref(undefined)
const maxParticipants = ref(1)
async function create () {
  isLoading.value = true
  // await createEnvelope(
  //   maxParticipants.value,
  //   message.value,
  //   name.value,
  //   String(totalPocketAmount.value)
  // ).catch(() => {
  //   isLoading.value = false
  // })
  // await getEnvelopesByAddress(currentAccount.value)
  //   .then(res =>{
  //     router.push({ path: `envelope/${res[res.length - 1].envelopeId}/${currentNetworkId.value}` })
  //   })
  //   .finally(() => {
  //     isLoading.value = false
  //     isOpen.value = false
  //     cleanForm()
  //   })
}
// async function setSelectedNetwork (event) {
//   await switchNetwork(event.target.value)
//     .catch((err) => {
//       router.push({ path: `/network-not-found/${event.target.value}` })
//       isOpen.value = false
//     })
// }

// function cleanForm() {
//   name.value = ''
//   message.value = ''
//   totalPocketAmount.value = undefined
//   maxParticipants.value = 1
// }
</script>