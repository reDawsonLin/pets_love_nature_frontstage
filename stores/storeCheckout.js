import { defineStore } from "pinia";

export const useStoreCheckout = defineStore("checkout", () => {
const int_param_post = {
  Email: "",
  Amt: 0,
  ItemDesc: "",
  deliveryUserName: "",
  deliveryUserPhone: "",
  userId: "",
  orderProductList: [
    {
      productId: "",
      price: 0,
      amount: 0,
    },
  ],
  deliveryAddress: {
    country: "Taiwan",
    county: "",
    district: "",
    address: "",
  },
};
  const { cloned: param_post, sync: intParamPost } = useCloned(int_param_post);
  


  return { param_post, intParamPost };
});
