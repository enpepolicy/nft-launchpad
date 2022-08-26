<template>
    <article
        class="group flex flex-col"
        data-aos="fade-up"
        data-aos-anchor="[data-aos-id-featposts]"
        data-aos-delay="400"
        >
        <img
            class="transition duration-700 ease-out rounded-t-[0.25rem]"
            :src="collection.coverIPFSHash"
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
            :href="`https://mumbai.polygonscan.com/address/${collection.addresss}`"
            target="_blank"
            class="text-sm opacity-100 hover:font-semibold"
            >
            📝 Check Contract 📝
            </a>
            <div class="text-xs opacity-100 text-white/60">Presale Box {{ collection.mysteryBoxInUSD }} USD / NFT {{ collection.NFTPriceInUSD }} USD</div>
        </div>

        <BaseButton
            :class="presaleIsActive(collection.presaleEndDate) ? 'bg-indigo-800' : 'bg-indigo-500'"
            class="mt-4"
            :inner-text="presaleIsActive(collection.presaleEndDate) ? `Buy Presale Box ($${collection.mysteryBoxInUSD})` : `Buy NFT ($${collection.NFTPriceInUSD} USD)`"
        />
        
        <div
            v-if="presaleIsActive(collection.presaleEndDate)"
            class="pt-4 px-4"
        >
            <div class="text-xs opacity-100 font-semibold text-center">Presale Ends In:</div>
            <BaseCountdown
            :endDate="new Date(collection.presaleEndDate)"
            />
        </div>
    </article>
</template>
<script setup lang="ts">
import { PropType, readonly } from 'vue';
import BaseCountdown from './BaseCountdown.vue';
import BaseButton from './BaseButton.vue';


defineProps({
  collection: {
    type: Object as PropType<{addresss: string; name: string; description: string; coverIPFSHash: string; mysteryBoxInUSD: number; NFTPriceInUSD: number; presaleEndDate: string}>,
    default: () => [
    //   {
    //     address: '0x9b17C9E2AA27F93b1d0e71b872069e096cB41233',
    //     name: 'Collection 1',
    //     description: "Supp",
    //     coverIPFSHash: 'https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1908/sabelskaya190800807.jpg',
    //     mysteryBoxInUSD: 5,
    //     NFTPriceInUSD: 10,
    //     presaleEndDate: '2022.8.10'
    //   },
    ]
  },
})

const backgroundColors = readonly(['bg-pink-800', 'bg-indigo-800', 'bg-purple-800', 'bg-green-800', 'bg-orange-800', 'bg-red-800' ])

function getRandomBackgroundColor () {
  const backgroundColorsCopy = Object.assign([], backgroundColors)
  const randomColor = backgroundColorsCopy.sort(() => Math.random() - Math.random()).slice(0, 1)
  return randomColor
}

function presaleIsActive (date: string) {
  if (new Date(date).getTime() < new Date().getTime()) {
    return false;
  }
  return true;
}
</script>