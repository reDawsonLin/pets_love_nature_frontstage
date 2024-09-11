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
  app: {
    head: {
      title: "寵愛天然-原塊寵物食品專賣",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
  },

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
  // nitro: {
  //   experimental: {
  //     websocket: true,
  //   },
  // },
});
