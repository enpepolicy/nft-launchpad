<template>
  <section class="relative">
    
    <div class="max-w-3xl mx-auto text-center justify-center flex">
      <div class="mx-auto bottom-0 mb-10 w-0.5 h-16 bg-gray-800 dark:bg-gray-700" data-aos="fade-down" aria-hidden="true"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-12">

        <!-- Featured article -->
        <div class="max-w-3xl" data-aos="fade-down">
          <article>
            <header>
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="h1 font-red-hat-display mb-4">{{ props.sectionTitle}}</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400">{{ props.collections[0] ? props.sectionDescription : 'No collections to display' }}</p>
              </div>
            </header>
          </article>
        </div>

      </div>
    </div>

  </section>

  <section
    v-if="props.collections[0]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pb-20 md:pb-16">
        <div class="grid gap-x-4 gap-y-24 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 relative" data-aos-id-featposts>
          <BaseCollectionCard
            v-for="(collection, index) in props.collections"
            :key="index"
            @update-collections="emit('update-collections')"
            :collection="collection"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { Collection } from '../types/index'
import BaseCollectionCard from './BaseCollectionCard.vue';

const emit = defineEmits(['update-collections'])

const props = defineProps({
  sectionTitle: {
    type: String,
    default: 'Your Collections',
  },
  sectionDescription: {
    type: String,
    default: 'Here are some collections deployed using NFT Launchpad protocol:',
  },
  address: {
    type: String,
    default: '',
  },
  collections: {
    type: Array as PropType<Array<Collection>>,
    default: () => []
  },
})
</script>