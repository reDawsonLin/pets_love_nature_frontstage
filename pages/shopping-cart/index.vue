<script setup>
const { getTransformCartArray } = await useShoppingCart();

const shoppingDataArr = ref([]);

// const testArr = ref([
//   {
//     productId: "A00001",
//     quantity: 3,
//     title:
//       "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
//     weight: 15,
//     price: 100,
//     inStock: 10,
//     imageGallery: {
//       id: 0,
//       imgUrl:
//         "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
//       altText: ""
//     },
//     isChoosed: false
//   },
//   {
//     productId: "A00001",
//     quantity: 3,
//     title: "好吃貓食",
//     weight: 15,
//     price: 150,
//     inStock: 10,
//     imageGallery: {
//       id: 0,
//       imgUrl:
//         "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
//       altText: ""
//     },
//     isChoosed: false
//   }
// ]);

onMounted(async () => {
  shoppingDataArr.value = await getTransformCartArray();
});

const isChoosedProductArr = computed(() =>
shoppingDataArr.value.filter((eachProduct) => eachProduct.isChoosed)
);

const totalPrice = computed(() =>
  isChoosedProductArr.value.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  )
);

const allSelected = computed(
  () =>
  shoppingDataArr.value.filter((eachProduct) => eachProduct.isChoosed).length ===
  shoppingDataArr.value.length
);

const checkValue = async () => {
  // console.log(testArr);
  // console.log("count", count);
  // console.log("add", add);
  // console.log(await getTransformCartArray());
  // console.log('process.env', process);
  // console.log("useShoppingCart", useShoppingCart);
};

const selectProduct = (i) => {
  shoppingDataArr.value[i].isChoosed = !shoppingDataArr.value[i].isChoosed;
};

const deleteProduct = (i) => {
  shoppingDataArr.value.splice(i, 1);
};

const allSelectedClick = () => {
  if (allSelected.value)
  shoppingDataArr.value.forEach((eachProduct) => (eachProduct.isChoosed = false));
  else shoppingDataArr.value.forEach((eachProduct) => (eachProduct.isChoosed = true));
};

const productQuantityChange = (i, num) => {
  const calcQuantity = shoppingDataArr.value[i].quantity + num;
  if (calcQuantity >= 0 && calcQuantity <= shoppingDataArr.value[i].inStock)
  shoppingDataArr.value[i].quantity = calcQuantity;
};

const productQuantityInput = (product, e) => {
  const targetNum = Number(e.target.value);
  if (targetNum >= 0 && targetNum <= product.inStock && !isNaN(targetNum)) {
    product.quantity = targetNum;
  }
};
</script>

<template>
  <div v-if="shoppingDataArr.length > 0" class="shopping_cart">
    <div p="t-3.75rem" class="title mb-7.5 flex items-center justify-center">
      <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" >
      <h1 class="text-4xl">購物車</h1>
    </div>
    <div
      class="white_space m-auto mb-5 w-11/12 rounded bg-white pb-6 pl-4 pr-4 pt-6 lg:px-9"
    >
      <div class="out_block w-full">
        <div
          class="top_bar hidden h-14 w-full items-center rounded py-1 lg:flex"
        >
          <div class="top_check_box flex grow basis-0 justify-center">
            <div
              class="check_box_out_div cursor-pointer p-3"
              @click="allSelectedClick"
            >
              <div
                class="checkbox_div box-border max-h-5 max-w-5 min-h-5 min-w-5 flex items-center justify-center border-2 rounded-sm"
              >
                <font-awesome-icon
                  v-show="allSelected"
                  :icon="['fas', 'check']"
                  class="fa-solid fa-check w-3"
                />
              </div>
            </div>
          </div>
          <div class="top_product flex grow-2 basis-0 justify-center">商品</div>
          <div class="top_single_price flex grow basis-0 justify-center">
            單價
          </div>
          <div class="top_quantity flex grow basis-0 justify-center">數量</div>
          <div class="top_total_price flex grow basis-0 justify-center">
            總計
          </div>
          <div class="top_operate flex grow basis-0 justify-center">操作</div>
        </div>
        <!-- mobile -->
        <div class="shopping_cart_list lg:hidden">
          <div
            v-for="(eachProduct, i) in shoppingDataArr"
            :key="eachProduct.productId"
            :class="{ is_selected_product: eachProduct.isChoosed }"
            class="each_product mb-7 rounded-md pb-2"
          >
            <div
              class="product_checkbox h-12 w-full flex items-center rounded-md pl-2 pr-2"
            >
              <div
                class="flex cursor-pointer items-center"
                @click="selectProduct(i)"
              >
                <div
                  class="checkbox_div mr-2.5 box-border max-h-5 max-w-5 min-h-5 min-w-5 flex items-center justify-center border-2 rounded-sm"
                >
                  <font-awesome-icon
                    v-show="eachProduct.isChoosed"
                    :icon="['fas', 'check']"
                    class="fa-solid fa-check w-3"
                  />
                </div>

                <div class="product_text text-xl">商品</div>
              </div>
              <div
                class="operate_div ml-auto h-8 w-10 flex cursor-pointer items-center justify-center rounded-sm"
                @click="deleteProduct(i)"
              >
                <img src="/assets/img/garbage_can.png" alt="" >
              </div>
            </div>
            <div class="product mb-6 flex items-center pl-2 pt-3">
              <div
                class="product_img h-14 w-14 bg-contain bg-center bg-no-repeat"
                style="
                  background-image: url('https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png');
                "
                :style="{ backgroundImage: 'url(' + eachProduct.imageGallery[0].imgUrl + ')' }"
              />
              <div class="name_price_div w-full px-2.5">
                <div class="product_name text-center">
                  {{ eachProduct.title }}
                </div>
                <div class="product_single_price ml-5.5">
                  <span>NT$</span>
                  <span class="single_price text-2xl font-black">{{
                    eachProduct.price
                  }}</span>
                </div>
              </div>
            </div>
            <!-- <div class="product_single_price"><span>NT$</span> <span class="single_price">450</span></div> -->

            <div
              class="quantity_price_div flex items-center justify-between pl-2 pr-3"
            >
              <div class="product_quantity">
                <!-- <select
                  v-model="eachProduct.quantity"
                  name="quantity"
                  class="border border-slate-400 rounded-sm w-28 py-1 px-1"
                >
                  <option
                    v-for="index in eachProduct.inStock"
                    :key="index"
                    :value="index"
                  >
                    {{ index }}
                  </option>
                </select> -->

                <div
                  class="quantity_out_div h-10 w-36 flex items-center justify-around rounded bg-white px-2"
                >
                  <div
                    class="icon_div min-h-6 min-w-6 flex cursor-pointer items-center justify-center"
                    @click="productQuantityChange(i, -1)"
                  >
                    <img class="minus" src="/assets/img/minus.png" alt="" >
                  </div>

                  <input
                    class="quantity_input w-full text-center"
                    type="number"
                    :value="eachProduct.quantity"
                    @input="productQuantityInput(eachProduct, $event)"
                  >
                  <div
                    class="icon_div min-h-6 min-w-6 flex cursor-pointer items-center justify-center"
                    @click="productQuantityChange(i, 1)"
                  >
                    <img class="plus" src="/assets/img/plus.png" alt="" >
                  </div>
                </div>
              </div>
              <div class="product_total_price">
                總計<span class="total_price ml-1">NT$</span>
                <span class="total_price text-2xl">{{
                  eachProduct.quantity * eachProduct.price
                }}</span>
              </div>
            </div>
            <div class="product_operate" />
          </div>
        </div>

        <!-- pc -->
        <div class="shopping_cart_list hidden lg:block">
          <div
            v-for="(eachProduct, i) in shoppingDataArr"
            :key="eachProduct.productId"
            class="each_product h-44 flex"
            :class="{ is_selected_product: eachProduct.isChoosed }"
          >
            <div
              class="product_checkbox_pc flex grow basis-0 items-center justify-center"
            >
              <div
                class="check_box_out_div cursor-pointer p-3"
                @click="selectProduct(i)"
              >
                <div
                  class="checkbox_div box-border max-h-5 max-w-5 min-h-5 min-w-5 flex items-center justify-center border-2 rounded-sm"
                >
                  <font-awesome-icon
                    v-show="eachProduct.isChoosed"
                    :icon="['fas', 'check']"
                    class="fa-solid fa-check w-3"
                  />
                </div>
              </div>
            </div>
            <div
              class="product flex grow-2 basis-0 items-center justify-center"
            >
              <div
                class="product_img mr-2.5 min-h-14 min-w-14 bg-contain bg-center bg-no-repeat"
                style="
                  background-image: url('https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png');
                "
                :style="{ backgroundImage: 'url(' + eachProduct.imageGallery[0].imgUrl + ')' }"
              />
              <div class="product_name inline-block w-11/12">
                {{ eachProduct.title }}
              </div>
            </div>
            <div
              class="product_single_price flex grow basis-0 items-center justify-center"
            >
              <span>NT$</span>
              <span class="single_price">{{ eachProduct.price }}</span>
            </div>
            <div
              class="product_quantity flex grow basis-0 items-center justify-center"
            >
              <div
                class="quantity_out_div h-10 w-36 flex items-center justify-around rounded bg-white px-2"
              >
                <div
                  class="icon_div min-h-6 min-w-6 flex cursor-pointer items-center justify-center"
                  @click="productQuantityChange(i, -1)"
                >
                  <img class="minus" src="/assets/img/minus.png" alt="" >
                </div>

                <input
                  class="quantity_input w-full text-center"
                  type="number"
                  :value="eachProduct.quantity"
                  @input="productQuantityInput(eachProduct, $event)"
                >
                <div
                  class="icon_div min-h-6 min-w-6 flex cursor-pointer items-center justify-center"
                  @click="productQuantityChange(i, 1)"
                >
                  <img class="plus" src="/assets/img/plus.png" alt="" >
                </div>
              </div>
            </div>
            <div
              class="product_total_price flex grow basis-0 items-center justify-center"
            >
              <span class="total_price">NT$</span>
              <span class="total_price">{{
                eachProduct.quantity * eachProduct.price
              }}</span>
            </div>
            <div
              class="product_operate flex grow basis-0 items-center justify-center"
            >
              <div
                class="operate_div_pc h-8 w-10 flex cursor-pointer items-center justify-center"
                @click="deleteProduct(i)"
              >
                <img src="/assets/img/garbage_can.png" alt="" >
              </div>
            </div>
          </div>
        </div>
        <div
          class="bottom_block h-36 rounded pt-6 text-center lg:h-24 lg:flex lg:items-center lg:justify-end lg:bg-gray-300 lg:pt-0"
        >
          <div
            class="total_price_all mb-4 rounded lg:mb-0 lg:mr-4 lg:h-16 lg:w-56 lg:flex lg:items-center lg:justify-center lg:bg-slate-100"
          >
            總金額
            <span class="total_price ml-5">NT$</span>
            <span class="total_price text-2xl font-black">{{
              totalPrice
            }}</span>
          </div>
          <div
            class="go_shop mx-auto h-15 w-11/12 flex cursor-pointer items-center justify-center rounded lg:mx-0 lg:mr-4 lg:h-16 lg:w-64"
          >
            <img class="mr-3" src="/assets/img/card.png" alt="" >
            <span class="text-xl color-white">去買單</span>
          </div>
        </div>
        <div v-if="0" class="check_btn" @click="checkValue">檢查</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.top_bar {
  background-color: #f9f0ea;
}

.shopping_cart {
  background-color: #f9f0ea;
}

.product_checkbox {
  background-color: #e5e5e5;
}

.is_selected_product {
  background-color: #f3f3f3;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
}

.checkbox_div {
  border-color: #525252;
}

.operate_div {
  background-color: #f2f2f2;
}

select:focus {
  outline: none;
}

.product_img {
  /* background-image: url("/assets/img/catfood1.png"); */
}

.total_price {
  color: #f43f5e;
}

.bottom_block {
  border: 1px solid #e5e5e5;
}

.go_shop {
  background-color: #525252;
}

.quantity_out_div {
  border: 1px solid #e5e5e5;
}

.icon_div {
}

.quantity_input:focus {
  outline: none;
}

.product_name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom_block {
}
</style>
