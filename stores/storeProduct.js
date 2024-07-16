import { defineStore } from "pinia";

export const useStoreProduct = defineStore("product", () => {
  const int_param_post = {
    Email: "",
    Amt: 0,
    ItemDesc: "",
    deliveryUserName: "",
    deliveryPhone: "",
    userId: "",
    orderProductList: [
      {
        productId: "",
        productTitle: "",
        price: 0,
        quantity: 0,
        coverImg: "",
        weight: 0,
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
