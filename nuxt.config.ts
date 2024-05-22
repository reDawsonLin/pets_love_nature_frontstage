// import { defineNuxtConfig } from 'nuxt' // swiper

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "@unocss/nuxt",
    "@nuxt/eslint",
  ],
  // 直接放在 app.vue 裡面 -------
  // css: ["~/assets/main.css"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devServer: {
    host: "localhost",
    // host: "127.0.0.1",
    port: 5173,
  },
});
