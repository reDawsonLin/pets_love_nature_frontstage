<script setup></script>

<template>
  <div class="loading-indicator show">
    <img class="gif_loading" src="/assets/gif/loading-pet3.gif" alt="loading gif" />
  </div>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: #fcfcff;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  backdrop-filter: blur(3px);

  &.show {
    opacity: 1;
    transition: opacity 0s;
  }

  .gif_loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    width: 77vw;
    max-width: 500px;

    @media (min-width: 768px) {
      width: 50vw;
    }
  }
}
</style>
