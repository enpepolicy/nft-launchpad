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
        <!-- :class="presaleIsActive(collection.presaleEndDate) ? 'bg-indigo-800' : 'bg-indigo-500'"
        :inner-text="presaleIsActive(collection.presaleEndDate) ? `Buy Presale Box ($${collection.mysteryBoxInUSD / 100})` : `Buy NFT ($${collection.NFTPriceInUSD / 100} USD)`" -->
        <div
            class="px-4 pb-4"
        >
            <BaseButton
                class="mt-4 bg-indigo-500 w-full"
                inner-text="Open Mystery Box"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
</script>