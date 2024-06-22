// import { defineNuxtConfig } from 'nuxt' // swiper

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "nuxt-swiper",
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
  veeValidate: {
    autoImports: true,

    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
});
