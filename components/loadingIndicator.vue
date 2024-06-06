<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loading_pet from "@/assets/lottie/loading-pet.json";
const nuxtApp = useNuxtApp();
const isLoading = ref(false);

nuxtApp.hook("page:start", () => {
  isLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>

<template>
  <ClientOnly>
    <div class="loading-indicator" :class="{ show: isLoading }">
      <Vue3Lottie class="lottie" :animationData="loading_pet" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: #f9f0ea;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;

  &.show {
    opacity: 1;
    transition: opacity 0s;
  }

  .lottie {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    width: 70vw;

    @media (min-width: 768px) {
      width: 37vw;
    }
  }
}
</style>
