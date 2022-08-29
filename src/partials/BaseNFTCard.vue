<template>
    <div
      v-if="metadata"
      class="flex flex-col"
    >
        <div class="flex justify-center">
          <img
            :src="imageUrl"
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            data-aos="fade-up"
            data-aos-anchor="[data-aos-id-featposts]"
            data-aos-delay="400"
            height="182"
          />
        </div>
        <div class="flex justify-start pt-4">
          <a
            :href="`https://testnets.opensea.io/assets/mumbai/${nft.token_address}/${nft.token_id}`"
            target="_blank"
            class="text-xl first-letter:opacity-100 font-semibold text-blue-600  hover:text-white duration-300 transition-all"
            >
              🔗 <span class="uppercase">{{ nft.name }}</span> - #{{ nft.token_id }}
          </a>
        </div>
        <div class="text-base text-left"> {{ metadata ? metadata.name : 'Fetching...' }}</div>
        <div v-if="metadata" class="text-sm opacity-80 italic">{{ metadata.description?.substring(0, 80) }} {{ metadata.description?.length > 80 ? '...' : '' }}</div>
        <!-- <div class="text-xs opacity-100 text-white/60">NFT's Left: {{ nft }}</div> -->
        <!-- :class="presaleIsActive(collection.presaleEndDate) ? 'bg-indigo-800' : 'bg-indigo-500'"
        :inner-text="presaleIsActive(collection.presaleEndDate) ? `Buy Presale Box ($${collection.mysteryBoxInUSD / 100})` : `Buy NFT ($${collection.NFTPriceInUSD / 100} USD)`" -->
    </div>
    <div 
      v-else
      class="flex flex-col border-2 rounded-lg"
    >
      <div class="flex justify-center">
        <div class="text-base text-center p-4">Fetching Metadata,<br>Try later</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  nft: {
    type: Object as PropType<any>,
    default: () => {}
  },
})

const metadata = computed(() => {
  if (props?.nft?.metadata) {
    return JSON.parse(props.nft.metadata)
  }
  return false
})

const imageUrl = computed(() => {
  // https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/0.png
  // ipfs://QmQg7opMWfVEtv2EM2JFhr9uwbcG5UmaDhp14fbVYJkV2g

  let image = metadata.value.image
  let ipfsPrefix = image.slice(0, 7)
  
  console.log(ipfsPrefix)

  if (ipfsPrefix == "ipfs://") {
    return 'https://gateway.pinata.cloud/ipfs/' + image.slice(7)
  }
  return metadata.value?.image
})
</script>