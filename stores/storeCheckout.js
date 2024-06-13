import { defineStore } from "pinia";

export const useStoreCheckout = defineStore("checkout", () => {
  const param_post = ref({
    name: "",
    phoneNumber: "",
    email: "",
    county: "",
    district: "",
    address: "",
    receipt: "",
    payment_method: "",
  });

  return { param_post };
});
