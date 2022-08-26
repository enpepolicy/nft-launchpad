<template>
    <div
        :class="`
            pt-2
            flex
            flex-row
            align-top
            items-center
            ${containerJustify}
            gap-3
        `"
    >
        <div v-if="showDays" class="">
        <span :class="boxClass" class="number-box">{{ days }}</span
        ><span class="time-period-text">days</span>
        </div>
        <div class="">
        <span :class="boxClass" class="number-box">{{
            showDays ? hours : days * 24 + hours
        }}</span
        ><span class="time-period-text">hours</span>
        </div>
        <div>
        <span class="number-box" :class="boxClass">{{ minutes }}</span
        ><span class="time-period-text">mins.</span>
        </div>
        <div>
        <span class="number-box" :class="boxClass">{{ seconds }}</span
        ><span class="time-period-text">secs.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  endDate: {
    type: Date,
    default: new Date(),
  },
  containerJustify: {
    type: String,
    default: "justify-between",
  },
  showDays: {
    type: Boolean,
    default: true,
  },
  showBackground: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:countdownExpired"]);

const expired = ref(false);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const boxClass = computed(() => {
  return `
    ${props.showBackground ? "bg-black/75" : ""}
  `;
});

onMounted(() => {
  updateTime();
});

const updateTime = () => {
  const now: number = new Date().getTime();

  if (props.endDate.getTime() < new Date().getTime()) {
    emit("update:countdownExpired", true);
    expired.value = true;
    return;
  }

  let distance: number = props.endDate.getTime() - now;

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
  setTimeout(updateTime, 500);
};
</script>
<style lang="postcss" scoped>
.number-box {
  @apply w-8 h-8 md:w-[2.5rem] md:h-[2.5rem] flex flex-col items-center justify-center rounded-lg font-bold text-lg mb-1;
  box-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2),
    inset 5px 5px 8px rgba(0, 0, 0, 0.8);
}

.time-period-text {
  @apply uppercase text-xs text-white/70;
}
</style>