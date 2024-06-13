import { defineStore } from "pinia";
import { storeToRefs } from "pinia";
import { useStoreLogin } from "~/stores/storeLogin";
// export const useStoreChoosedCart = defineStore("choosedCart", () => {
//   const choosedCart = ref([]);

//   return { choosedCart };
// });

export const useStoreCart = defineStore("newCart", () => {
  const cartArr = ref([]);

  const checkToken = () => {
    const store_login = useStoreLogin();
    const { token, id_customer } = storeToRefs(store_login);

    return { token, id_customer };
  };

  const getTransformCartArray = async () => {
    let tempCartArray = [];
    let transformArray = [];

    const { token, id_customer } = checkToken();
    let noLoginObj = {};
    let getCartById;
    let getCartNoLogin;
    console.log();

    if (token.value && id_customer.value) {
      console.log("有登入");
      getCartById = await use$Fetch(
        `/shopping_cart/login/${id_customer.value}`,
        {
          method: "GET",
          // body: { code }
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
    } else {
      console.log("未登入");
      noLoginObj = sessionStorage.getItem("shoppingCartNoLogin");
      if (noLoginObj) {
        getCartNoLogin = await use$Fetch(`/shopping_cart/nologin/`, {
          method: "POST",
          body: noLoginObj,
        });
      } else {
        return [];
      }
    }

    tempCartArray.length = 0;
    transformArray.length = 0;
    // 整理開始
    if (token.value && id_customer.value) {
      tempCartArray = getCartById?.data?.shoppingCart;
      console.log("tempCartArray已登入", tempCartArray);
    } else {
      tempCartArray = getCartNoLogin?.data?.shoppingCart;
      console.log("tempCartArray未登入", tempCartArray);
    }
    console.log("tempCartArray", tempCartArray);
    transformArray = tempCartArray?.map((eachProduct) => {
      const product = eachProduct.productSpec?.productId;
      const productSpec = eachProduct.productSpec;
      delete eachProduct.productSpec?.productId;
      delete eachProduct.productSpec;

      const obj = {
        ...product,
        ...productSpec,
        ...eachProduct,
      };
      return obj;
    });

    const filteredArr = transformArray.filter((eachData) => eachData._id);
    console.log("filteredArr", filteredArr);
    // console.log('storeCart.cartArr.value', storeCart.cartArr.value);
    // storeCart.cartArr.value = filteredArr;
    // console.log('storeCart.cartArr.value', storeCart.cartArr.value);
    cartArr.value = filteredArr;

    
    return filteredArr;
  };

  return { cartArr, getTransformCartArray };
});
