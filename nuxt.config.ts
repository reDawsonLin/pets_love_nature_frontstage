// import { defineNuxtConfig } from 'nuxt' // swiper


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "@unocss/nuxt",
    "@nuxt/eslint"
  ],
  css: ["~/assets/main.css"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});