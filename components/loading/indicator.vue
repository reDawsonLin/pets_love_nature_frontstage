<script setup>
import { Vue3Lottie } from "vue3-lottie";
import loading_pet from "@/assets/lottie/loading-pet.json";
import { globalMiddleware } from "#build/middleware";

const lottie_container = ref(null);
const isLoading = ref(false);

// ===
// const nuxtApp = useNuxtApp();
// const throttle = 100;
// const delay_hide = 200;

// let timeout_throttle;
// let timeout_hide;
// let timeout_reset;

// // const start = () => {
// //   clear();

// //   if (throttle) {
// //     // check api fetch or not ===

// //     timeout_throttle = setTimeout(() => {
// //       lottie_container.value.play();
// //       isLoading.value = true;
// //     }, throttle);
// //   } else {
// //     isLoading.value = true;
// //   }
// // };

// // const _hide = () => {
// //   clear();
// //   // setTimeout(() => {
// //   //   isLoading.value = false;
// //   // }, hold);

// //   timeout_hide = setTimeout(() => {
// //     lottie_container.value.pause();
// //     isLoading.value = false;
// //   }, delay_hide);
// // };

// // const finish = () => {
// //   clear();
// //   _clearTimeouts();
// //   _hide();
// // };

// // function clear() {
// //   clearTimeout(timeout_throttle);
// //   // timeout_throttle.value = null;
// // }

// // function _clearTimeouts() {
// //   clearTimeout(timeout_hide);
// //   clearTimeout(timeout_reset);
// // }

// // let _cleanup = () => {};
// // if (import.meta.client) {
// //   const unsubLoadingStartHook = nuxtApp.hook("page:loading:start", () => {
// //     console.log("start start");
// //     start();
// //     console.log("start end");
// //   });

// //   const unsubLoadingFinishHook = nuxtApp.hook("page:loading:end", () => {
// //     console.log("finished start");
// //     finish();
// //     console.log("finished end");
// //   });

// //   const unsubError = nuxtApp.hook("vue:error", () => finish());

// //   _cleanup = () => {
// //     unsubError();
// //     unsubLoadingStartHook();
// //     unsubLoadingFinishHook();
// //     clear();
// //   };
// // }

// // nuxtApp.hook("page:start", () => {
// nuxtApp.hook("page:loading:start", () => {
//   console.log("start start");
//   isLoading.value = true;
//   lottie_container.value.play();
//   console.log("start end");
// });

// // nuxtApp.hook("page:finish", () => {
// nuxtApp.hook("page:loading:end", () => {
//   console.log("finish start");
//   isLoading.value = false;
//   lottie_container.value.pause();
//   console.log("finish end");
// //   // setTimeout(() => {
// //   //   isLoading.value = false;
// //   //   lottie_container.value.pause();
// //   // }, 300);
// });

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

// globalMiddleware.unshift(show);
// function unsubRouterBeforeMiddleware() {
//   globalMiddleware.splice(globalMiddleware.indexOf(show, 1));
// }

const nuxtApp = useNuxtApp();

nuxtApp.hook("app:created", () => console.log("app:created"));
nuxtApp.hook("app:error	", () => console.log("app:error	"));
nuxtApp.hook("app:error:cleared	", () => console.log("app:error:cleared	"));
nuxtApp.hook("app:data:refresh	", () => console.log("app:data:refresh	"));
nuxtApp.hook("vue:setup	", () => console.log("vue:setup	"));
nuxtApp.hook("vue:error	", () => console.log("vue:error	"));
nuxtApp.hook("app:rendered	", () => console.log("app:rendered	"));
nuxtApp.hook("app:redirected	", () => console.log("app:redirected	"));
nuxtApp.hook("app:beforeMount	", () => console.log("app:beforeMount	"));
nuxtApp.hook("app:mounted	", () => console.log("app:mounted	"));
nuxtApp.hook("app:suspense:resolve	", () => console.log("app:suspense:resolve	"));
nuxtApp.hook("app:manifest:update	", () => console.log("app:manifest:update	"));
nuxtApp.hook("link:prefetch	", () => console.log("link:prefetch	"));
nuxtApp.hook("page:start", () => console.log("page:start"));
nuxtApp.hook("page:loading:start", () => console.log("page:loading:start"));
nuxtApp.hook("page:loading:end", () => console.log("page:loading:end"));
nuxtApp.hook("page:transition:finish", () =>
  console.log("page:transition:finish")
);
nuxtApp.hook("dev:ssr-logs", () => console.log("dev:ssr-logs"));
nuxtApp.hook("page:view-transition:start", () =>
  console.log("page:view-transition:start")
);

const unsubPageStart = nuxtApp.hook("page:start", () => {
  console.log("in page:start");
  show();
});
// const unsubPageStart = nuxtApp.hook("page:loading:start	", show);
const unsubPageFinish = nuxtApp.hook("page:finish", () => {
  console.log("in page:finish");
  hide();
});
const unsubError = nuxtApp.hook("vue:error", hide);

onBeforeUnmount(() => {
  // unsubRouterBeforeMiddleware();
  unsubPageStart();
  unsubPageFinish();
  unsubError();
});

const router = useRouter();
router.onError(() => {
  hide();
});

router.beforeResolve((to, from) => {
  if (
    to === from ||
    to.matched.every(
      (comp, index) =>
        comp.components &&
        comp.components?.default === from.matched[index]?.components?.default
    )
  )
    hide();
});

router.afterEach((_to, _from, failure) => {
  if (failure) {
    hide();
  }
});
</script>

<template>
  <ClientOnly>
    <div class="loading-indicator" :class="{ show: isLoading }">
      <Vue3Lottie
        ref="lottie_container"
        class="lottie"
        :animation-data="loading_pet"
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
