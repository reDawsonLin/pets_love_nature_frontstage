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
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [],
      noscript: [{ children: "JavaScript is required" }],
    },
  },

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
