import { defineStore } from "pinia";

export const useStoreGeneral = defineStore("general", () => {
  const isPending = ref(false);

  return { isPending };
});
