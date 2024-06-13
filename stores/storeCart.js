import { defineStore } from "pinia";

// export const useStoreChoosedCart = defineStore("choosedCart", () => {
//   const choosedCart = ref([]);

//   return { choosedCart };
// });

export const useStoreCart = defineStore("newCart", () => {
  const cartArr = ref([]);

  return { cartArr };
});
