import { defineStore } from "pinia";

export const useStoreGeneral = defineStore("general", () => {
  const mobileNavShow = ref(true)
  

  return {mobileNavShow};
});
