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
          "productSpec": "664c90d099eb1ab9b3c4f645",
          "quantity": 2
      }
  ]
}

// console.log('token', token.value);
// console.log('id_customer', id_customer.value);

export const useShoppingCart = async () => {
  // const store_login = useStoreLogin();
  // const { token, id_customer } = storeToRefs(store_login);

  // console.log('token', token.value);
  // console.log('id_customer', id_customer.value);

  let tempCartArray = [];
  let transformArray = [];

  const checkToken = () => {
    const store_login = useStoreLogin();
    const { token, id_customer } = storeToRefs(store_login);

    return { token, id_customer }
  }

//   取得整理過後的購物車
  const getTransformCartArray = async () => {

    const {token, id_customer} = checkToken();
    let noLoginObj = {};
    let getCartById;
    let getCartNoLogin;
    console.log();
    if((token.value && id_customer.value)) {
      console.log('有登入');
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
    }
    else {
      console.log('未登入');
      noLoginObj = sessionStorage.getItem("shoppingCartNoLogin");
      if(noLoginObj) {
        getCartNoLogin = await use$Fetch(
          `/shopping_cart/nologin/`,
          {
            method: "POST",
            body:  noLoginObj
          }
        );
      }else {
        return []
      }

    }


    tempCartArray.length = 0;
    transformArray.length = 0;
    // 整理開始
    if((token.value && id_customer.value)) {
      tempCartArray = getCartById?.data?.shoppingCart;
      console.log('tempCartArray已登入', tempCartArray);
    }
    else {
      tempCartArray = getCartNoLogin?.data?.shoppingCart;
      console.log('tempCartArray未登入', tempCartArray);
      
    }
    console.log('tempCartArray', tempCartArray);
    transformArray = tempCartArray?.map(eachProduct => {
        const product = eachProduct.productSpec?.productId;
        const productSpec = eachProduct.productSpec;
        delete eachProduct.productSpec?.productId;
        delete eachProduct.productSpec;

        const obj = {
            ...product,
            ...productSpec,
            ...eachProduct
        }
        return obj
    })

    const filteredArr = transformArray.filter(eachData => eachData._id)
    return filteredArr;
  };

  // 新增購物車 通用 addWay = 0 加x至購物車, addWay = 1 購物車數量調整至x
  const addCart = async(cartArr, addWay) => {
    const {token, id_customer} = checkToken();
    console.log('token.value', token.value);
    console.log('id_customer', id_customer.value);
    if(token.value && id_customer.value) {
      await addCartLogin(cartArr, addWay, token, id_customer);
      console.log('addcart有登入');

    }
    else {
      addCartNoLogin(cartArr, addWay);
      console.log('addcart沒登入');
    }
  }

  // 新增購物車 已登入
  const addCartLogin = async(cartArr, addWay, token, id_customer) => {

    if(token.value && id_customer.value) {
      const obj = {
        customerId: id_customer.value,
        addWay: addWay,
        shoppingCart: cartArr
      }
      let addCartLoginReturn = await use$Fetch(
        "/shopping_cart/",
        {
          method: "POST",
          body:  JSON.stringify(obj),
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
    console.log('addCartLoginReturn', addCartLoginReturn);
        if(addCartLoginReturn?.status) {
          if(addWay === 0) {
            if(addCartLoginReturn?.message === '成功') {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "商品已新增至購物車",
                showConfirmButton: false,
                timer: 1500
              });
            }else {
              Swal.fire(addCartLoginReturn?.message);
            }
          }
        }
    }
  }

  // 新增購物車 未登入
  const addCartNoLogin = (cartArr, addWay) => {
    const { productSpec, quantity, inStock } = cartArr[0];
    // productSpec = '66487aba27b3916f705679f0', quantity = 2, inStock = 10

    if (typeof window !== "undefined") {
  
      // 如果session storage未有shoppingCartNoLogin的key時新建資料
      if(!sessionStorage.getItem('shoppingCartNoLogin')) {
        // 要新建
        const noLoginObj = {
          "shoppingCart": [
            {
              "productSpec": productSpec,
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
        const index = prevData.shoppingCart.findIndex(eachCart => eachCart.productSpec === productSpec);
        // prevData.shoppingCart[index].quantity = prevData.shoppingCart[index].quantity + quantity > inStock ?  
        let focusQuantity;
        if (index !== -1) {
        // 如果購物車有該商品 
        
        if(addWay === 0) focusQuantity = prevData.shoppingCart[index].quantity + quantity;
        else if (addWay === 1) focusQuantity = quantity;
        console.log('focusQuantity', focusQuantity);
        // 未登入add cart
        if (focusQuantity > inStock) {
          if(addWay === 0) Swal.fire(`因庫存只有${inStock}個，購物車品已幫您加該商品數量至${inStock}個`);
          prevData.shoppingCart[index].quantity = inStock;
          console.log(`因庫存只有${inStock}個，購物車品已幫您加該商品數量至${inStock}個`);
        }else {

          prevData.shoppingCart[index].quantity = focusQuantity;

          if(addWay === 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "商品已新增至購物車",
              showConfirmButton: false,
              timer: 1500
            });
          }
          console.log('正常增加');
        }
      }else {
                // 如果購物車內沒有該商品
        
                if (quantity > inStock) {
                  let obj = {
                    productSpec,
                    quantity: inStock,
                  }
        
                  prevData.push(obj);
                  Swal.fire(`因庫存只有${inStock}個，購物車品已幫您加該商品數量至${inStock}個`);
                } else {
                  let obj = {
                    productSpec,
                    quantity,
                  }
        
                  prevData.shoppingCart.push(obj);
                  if(addWay === 0) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "商品已新增至購物車",
                      showConfirmButton: false,
                      timer: 1500
                    });
                  }
                }
      }
      sessionStorage.setItem("shoppingCartNoLogin", JSON.stringify(prevData));

        
      }
      // sessionStorage.removeItem("shoppingCartNoLogin");
    console.log('sessionStorageRRR',sessionStorage.getItem('shoppingCartNoLogin'));
  
    }
  }

  // 測試用資料
  const addTestCartNoLogin = () => {
    

    if (typeof window !== "undefined"){
      sessionStorage.setItem("shoppingCartNoLogin", JSON.stringify(noLoginTestObj));

    }
  }

  // 刪除購物車
  const deleteCart = async(productSpec) => {
    const {token, id_customer} = checkToken();
    if(token.value && id_customer.value) {
      await deleteCartLogin(productSpec, token, id_customer);

    }
    else {
      deleteCartNoLogin(productSpec);
    }
  }

  // 刪除購物車 已登入
  const deleteCartLogin = async(productSpec, token, id_customer) => {
    const obj = {
      customerId: id_customer.value,
      productSpec: productSpec
    }
    await use$Fetch(
      "/shopping_cart/",
      {
        method: "DELETE",
        body:  JSON.stringify(obj),
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
  }

  // 刪除購物車 未登入
  const deleteCartNoLogin = (productSpec) => {
    console.log('deleteCartNoLogin');
    console.log('productSpec', productSpec);
    let prevData = JSON.parse(sessionStorage.getItem('shoppingCartNoLogin'));
    console.log('prevData', prevData);

    const focusIndex = prevData.shoppingCart.findIndex(eachData => eachData.productSpec === productSpec);
    if (focusIndex !== -1) {
      prevData.shoppingCart.splice(focusIndex, 1);
      sessionStorage.setItem("shoppingCartNoLogin", JSON.stringify(prevData));
    }
  }

  const loginAddCart = async() => {
    let prevData = JSON.parse(sessionStorage.getItem('shoppingCartNoLogin'));

    if (prevData) {
      // session storage內有購物車資訊
     const add =  await addCart(prevData, 0);
     sessionStorage.removeItem("shoppingCartNoLogin");
     
    }else {
      // session storage內沒有購物車資訊
    }
  }

  return {
    getTransformCartArray, addCart, deleteCart, addTestCartNoLogin, loginAddCart
  };
};


