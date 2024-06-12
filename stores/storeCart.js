import { defineStore } from "pinia";

export const useStoreChoosedCart = defineStore("choosedCart", () => {
const choosedCart = ref([]);
  
return { choosedCart }
});