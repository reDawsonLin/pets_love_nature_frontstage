<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loading_pet from "@/assets/lottie/loading-pet.json";

const nuxtApp = useNuxtApp();
const isLoading = ref(false);

const lottie_container = ref(null);
nuxtApp.hook("page:start", () => {
  isLoading.value = true;
  lottie_container.value.play();
});

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    isLoading.value = false;
    lottie_container.value.pause();
  }, 300);
});
</script>

<template>
  <ClientOnly>
    <div class="loading-indicator" :class="{ show: isLoading }">
      <Vue3Lottie
        ref="lottie_container"
        class="lottie"
        :animationData="loading_pet"
      />
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
  backdrop-filter: blur(3px);

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
