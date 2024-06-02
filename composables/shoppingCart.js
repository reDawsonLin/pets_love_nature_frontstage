import { storeToRefs } from "pinia";
import { useStoreLogin } from "~/stores/storeLogin";
import Swal from 'sweetalert2'

const noLoginTestObj = {
  "shoppingCart": [
      {
          "productSpec": "66487aba27b3916f705679f0",
          "quantity": 1
      },
      {
          "productSpec": "6649cfcacbe5453a4e99f001",
          "quantity": 2
      }
  ]
}

// console.log('token', token.value);
// console.log('id_customer', id_customer.value);

export const useShoppingCart = async () => {
  const store_login = useStoreLogin();
  const { token, id_customer } = storeToRefs(store_login);

  console.log('token', token.value);
  console.log('id_customer', id_customer.value);

  let tempCartArray = [];
  let transformArray = [];

//   取得整理過後的購物車
  const getTransformCartArray = async () => {

    let getCartById;
    let getCartNoLogin;
    console.log();
    if((token.value && id_customer.value)) {
      console.log('有登入');
      getCartById = await use$Fetch(
        `/shopping_cart/login/${id_customer.value}`,
        {
          method: "GET"
          // body: { code }
        }
      );
    }
    else {
      console.log('未登入');

      getCartNoLogin = await use$Fetch(
        `/shopping_cart/nologin/`,
        {
          method: "POST",
          body:  JSON.stringify(noLoginTestObj)
        }
      );
    }

    console.log('getCartNoLogin', getCartNoLogin);

    tempCartArray.length = 0;
    transformArray.length = 0;
    // 整理開始
    if((token.value && id_customer.value)) tempCartArray = getCartById?.data?.shoppingCart;
    else tempCartArray = getCartNoLogin?.data?.shoppingCart;
    

    transformArray = tempCartArray.map(eachProduct => {
      console.log('eachProduct', eachProduct);
        const product = eachProduct.productSpec?.productId;
        const productSpec = eachProduct.productSpec;

        delete eachProduct.productSpec?.productId;
        delete eachProduct.productSpec;

        const obj = {
            ...productSpec,
            ...product,
            ...eachProduct
        }
        return obj
    })

    console.log('transformArray', transformArray);

    return transformArray;
  };

  const useAddCartNoLogin = (productSpecId = '66487aba27b3916f705679f0', quantity = 2, inStock = 10, addWay = 0) => {
    if (typeof window !== "undefined") {
  
      // 如果session storage未有shoppingCartNoLogin的key時新建資料
      if(!sessionStorage.getItem('shoppingCartNoLogin')) {
        const noLoginObj = {
          "shoppingCart": [
            {
              "productSpec": productSpecId,
              "quantity": quantity
            }
          ]
        }
        console.log('noLoginObj', noLoginObj);
      sessionStorage.setItem("shoppingCartNoLogin", JSON.stringify(noLoginObj));
      if(addWay === 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "商品已新增至購物車",
          showConfirmButton: false,
          timer: 1500
        });
      }

  
      }else {
        // 如果有則更新資料
        let prevData = JSON.parse(sessionStorage.getItem('shoppingCartNoLogin'));
        const index = prevData.shoppingCart.findIndex(eachCart => eachCart.productSpec === productSpecId);
        // prevData.shoppingCart[index].quantity = prevData.shoppingCart[index].quantity + quantity > inStock ?  
        let focusQuantity;
        if(addWay === 0) focusQuantity = prevData.shoppingCart[index].quantity + quantity;
        else if (addWay === 1) focusQuantity = prevData.shoppingCart[index].quantity + quantity;
        // 未登入add cart
        if (focusQuantity > inStock) {
          if(addWay === 0) Swal.fire(`因庫存只有${inStock}個，購物車品已幫您加該商品數量至${inStock}個`);
          prevData.shoppingCart[index].quantity = inStock;
        }else {

          prevData.shoppingCart[index].quantity = focusQuantity;

          if(addWay ===0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "商品已新增至購物車",
              showConfirmButton: false,
              timer: 1500
            });
          }

        }
      sessionStorage.setItem("shoppingCartNoLogin", JSON.stringify(prevData));

        
      }
      // sessionStorage.removeItem("shoppingCartNoLogin");
    console.log('sessionStorageRRR',sessionStorage.getItem('shoppingCartNoLogin'));
  
    }
  }


  return {
    getTransformCartArray, useAddCartNoLogin
  };
};


