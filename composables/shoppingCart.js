export const useShoppingCart = async () => {
  let tempCartArray = [];
  let transformArray = [];

//   取得整理過後的購物車
  const getTransformCartArray = async () => {
    const getCartById = await use$Fetch(
      "/shopping_cart/663f12237a6dabc6203875f4",
      {
        method: "GET"
        // body: { code }
      }
    );
    tempCartArray.length = 0;
    transformArray.length = 0;

    // 整理開始
    tempCartArray.push(...getCartById?.data?.shoppingCart);
    // transformArray.push(...tempCartArray);

    transformArray = tempCartArray.map(eachProduct => {

        const product = eachProduct.productSpec.productId;

        console.log('eachProduct', eachProduct);
        delete eachProduct.productSpec.productId;
        const obj = {
            product,
            ...eachProduct
        }
        return obj
    })



    return transformArray;
  };

  const count = ref(0);
  const add = () => {
    count.value++;
  };

  return {
    getTransformCartArray,
    count,
    add
  };
};
