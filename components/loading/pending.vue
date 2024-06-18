<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loading_pet from "@/assets/lottie/loading-pet.json";
import { globalMiddleware } from "#build/middleware";

defineProps({
  isPending: {
    type: Boolean,
    default: true,
  },
});

const lottie_container = ref(null);
const isLoading = ref(false);

// -----------
const throttle = 200;
const hold = 1000;
let _throttleTimer = null;
function clear() {
  clearTimeout(_throttleTimer);
  _throttleTimer = null;
}

function show() {
  clear();

  if (import.meta.client) {
    if (throttle > 0) {
      _throttleTimer = setTimeout(() => {
        isLoading.value = true;
        lottie_container.value.play();
      }, throttle);
    } else {
      isLoading.value = true;
      lottie_container.value.play();
    }
  }
}

function hide() {
  clear();

  if (import.meta.client) {
    setTimeout(() => {
      isLoading.value = false;
      lottie_container.value.pause();
    }, hold);
  }
}

show();
onMounted(() => {});
onUnmounted(() => {
  hide();
});

// globalMiddleware.unshift(show);
// function unsubRouterBeforeMiddleware() {
//   globalMiddleware.splice(globalMiddleware.indexOf(show, 1));
// }

// const nuxtApp = useNuxtApp();

// nuxtApp.hook("app:created", () => console.log("app:created"));
// nuxtApp.hook("app:error	", () => console.log("app:error	"));
// nuxtApp.hook("app:error:cleared	", () => console.log("app:error:cleared	"));
// nuxtApp.hook("app:data:refresh	", () => console.log("app:data:refresh	"));
// nuxtApp.hook("vue:setup	", () => console.log("vue:setup	"));
// nuxtApp.hook("vue:error	", () => console.log("vue:error	"));
// nuxtApp.hook("app:rendered	", () => console.log("app:rendered	"));
// nuxtApp.hook("app:redirected	", () => console.log("app:redirected	"));
// nuxtApp.hook("app:beforeMount	", () => console.log("app:beforeMount	"));
// nuxtApp.hook("app:mounted	", () => console.log("app:mounted	"));
// nuxtApp.hook("app:suspense:resolve	", () => console.log("app:suspense:resolve	"));
// nuxtApp.hook("app:manifest:update	", () => console.log("app:manifest:update	"));
// nuxtApp.hook("link:prefetch	", () => console.log("link:prefetch	"));
// nuxtApp.hook("page:start", () => console.log("page:start"));
// nuxtApp.hook("page:loading:start", () => console.log("page:loading:start"));
// nuxtApp.hook("page:loading:end", () => console.log("page:loading:end"));
// nuxtApp.hook("page:transition:finish", () =>
//   console.log("page:transition:finish")
// );
// nuxtApp.hook("dev:ssr-logs", () => console.log("dev:ssr-logs"));
// nuxtApp.hook("page:view-transition:start", () =>
//   console.log("page:view-transition:start")
// );

// const unsubPageStart = nuxtApp.hook("page:start", () => {
//   console.log("in page:start");
//   show();
// });
// // const unsubPageStart = nuxtApp.hook("page:loading:start	", show);
// const unsubPageFinish = nuxtApp.hook("page:finish", () => {
//   console.log("in page:finish");
//   hide();
// });
// const unsubError = nuxtApp.hook("vue:error", hide);

// onBeforeUnmount(() => {
//   // unsubRouterBeforeMiddleware();
//   unsubPageStart();
//   unsubPageFinish();
//   unsubError();
// });

// const router = useRouter();
// router.onError(() => {
//   hide();
// });

// router.beforeResolve((to, from) => {
//   if (
//     to === from ||
//     to.matched.every(
//       (comp, index) =>
//         comp.components &&
//         comp.components?.default === from.matched[index]?.components?.default
//     )
//   )
//     hide();
// });

// router.afterEach((_to, _from, failure) => {
//   if (failure) {
//     hide();
//   }
// });
</script>

<template>
  <!-- <ClientOnly> -->
  <div class="loading-indicator" :class="{ show: isPending }">
    <!-- <Vue3Lottie
        ref="lottie_container"
        class="lottie"
        :animation-data="loading_pet"
      /> -->
    <img class="lottie" src="@/assets/gif/loading-pet.gif" alt="loading gif" />
  </div>
  <!-- </ClientOnly> -->
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
