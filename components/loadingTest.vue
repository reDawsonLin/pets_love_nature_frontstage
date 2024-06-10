<script setup>
// import { globalMiddleware } from '#build/middleware'



const props = defineProps({
  throttle: {
    type: Number,
    default: 200,
  },
  hold: {
    type: Number,
    default: 400,
  },
})

const isLoading = ref(false)

let _throttleTimer = null

function clear() {
  clearTimeout(_throttleTimer)
  _throttleTimer = null
}

function show() {
  clear()
  if (process.client) {
    if (props.throttle > 0) {
      _throttleTimer = setTimeout(() => {
        isLoading.value = true
      }, props.throttle)
    } else {
      isLoading.value = true
    }
  }
}

function hide() {
  clear()
  if (process.client) {
    setTimeout(() => {
      isLoading.value = false
    }, props.hold)
  }
}

globalMiddleware.unshift(show)
function unsubRouterBeforeMiddleware() {
  globalMiddleware.splice(globalMiddleware.indexOf(show, 1))
}

const nuxtApp = useNuxtApp()
const unsubPageFinish = nuxtApp.hook('page:finish', hide)
const unsubError = nuxtApp.hook('vue:error', hide)

onBeforeUnmount(() => {
  unsubRouterBeforeMiddleware()
  unsubPageFinish()
  unsubError()
})

const router = useRouter()

router.onError(() => {
  hide()
})

router.beforeResolve((to, from) => {
  if (to === from || to.matched.every((comp, index) => comp.components && comp.components?.default === from.matched[index]?.components?.default))
    hide()
})

router.afterEach((_to, _from, failure) => {
  if (failure)
    hide()
})
</script>

<template>
  <div class="loader-wrap" :class="isLoading ? 'loader-visible' : 'loader-hidden'">
    <div class="loader">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.loader-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgb(0 0 0 / 0.35);
  backdrop-filter: blur(4px);
  transition-property: background-color, visibility, opacity, scale;
  transition-duration: .2s;
}

.loader-wrap.loader-visible {
  visibility: visible;
  opacity: 1;
  scale: 1.5;
}

.loader-wrap.loader-hidden {
  visibility: hidden;
  opacity: 0;
  scale: 1;
}

.loader {
  --path: #2f3545;
  --dot: #00bd6f;
  --duration: 1.5s;
  width: 48px;
  height: 44px;
  position: relative;
}

.loader:before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg polygon {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes pathTriangle {
  33% {
 