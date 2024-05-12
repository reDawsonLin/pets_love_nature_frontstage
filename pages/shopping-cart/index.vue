<script setup>
const testArr = ref([
  {
    productId: "A00001",
    quantity: 3,
    title:
      "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
    weight: 15,
    price: 100,
    inStock: 10,
    image: {
      id: 0,
      imgUrl:
        "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
      altText: ""
    },
    isSelected: false
  },
  {
    productId: "A00001",
    quantity: 3,
    title: "好吃貓食",
    weight: 15,
    price: 150,
    inStock: 10,
    image: {
      id: 0,
      imgUrl:
        "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
      altText: ""
    },
    isSelected: false
  }
]);

const isSelectedProductArr = computed(() =>
  testArr.value.filter((eachProduct) => eachProduct.isSelected)
);

const totalPrice = computed(() =>
  isSelectedProductArr.value.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  )
);

const allSelected = computed(
  () =>
    testArr.value.filter((eachProduct) => eachProduct.isSelected).length ===
    testArr.value.length
);

const checkValue = () => {
  console.log(testArr);
};

const selectProduct = (i) => {
  testArr.value[i].isSelected = !testArr.value[i].isSelected;
};

const deleteProduct = (i) => {
  testArr.value.splice(i, 1);
};

const allSelectedClick = () => {
  if (allSelected.value)
    testArr.value.forEach((eachProduct) => (eachProduct.isSelected = false));
  else testArr.value.forEach((eachProduct) => (eachProduct.isSelected = true));
};

const productQuantityChange = (i, num) => {
  const calcQuantity = testArr.value[i].quantity + num;
  if (calcQuantity >= 0 && calcQuantity <= testArr.value[i].inStock)
    testArr.value[i].quantity = calcQuantity;
  console.log("change!");
};

const productQuantityInput = (product, e) => {
  const targetNum = Number(e.data);
  if (targetNum >= 0 && targetNum <= product.quantity && !isNaN(targetNum)) {
    product.quantity = targetNum;
  }
};
</script>

<template>
  <div class="shopping_cart" v-if="testArr.length > 0">
    <div p="t-3.75rem" class="title flex items-center justify-center mb-7.5">
      <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" />
      <h1 class="text-4xl">購物車</h1>
    </div>
    <div
      class="white_space w-11/12 bg-white m-auto rounded pt-6 pl-4 pr-4 pb-6 mb-5 lg:px-9"
    >
      <div class="out_block w-full">
        <div
          class="top_bar w-full h-14 rounded lg:flex items-center hidden py-1"
        >
          <div class="top_check_box flex basis-0 grow justify-center">
            <div
              class="check_box_out_div p-3 cursor-pointer"
              @click="allSelectedClick"
            >
              <div
                class="checkbox_div min-w-5 min-h-5 max-w-5 max-h-5 rounded-sm border-2 box-border flex items-center justify-center"
              >
                <font-awesome-icon
                  v-show="allSelected"
                  :icon="['fas', 'check']"
                  class="fa-solid fa-check w-3"
                />
              </div>
            </div>
          </div>
          <div class="top_product flex basis-0 grow-2 justify-center">商品</div>
          <div class="top_single_price flex basis-0 grow justify-center">
            單價
          </div>
          <div class="top_quantity flex basis-0 grow justify-center">數量</div>
          <div class="top_total_price flex basis-0 grow justify-center">
            總計
          </div>
          <div class="top_operate flex basis-0 grow justify-center">操作</div>
        </div>
        <!-- mobile -->
        <div class="shopping_cart_list lg:hidden">
          <div
            v-for="(eachProduct, i) in testArr"
            :key="eachProduct.productId"
            :class="{ is_selected_product: eachProduct.isSelected }"
            class="each_product pb-2 rounded-md mb-7"
          >
            <div
              class="product_checkbox flex pl-2 pr-2 items-center h-12 w-full rounded-md"
            >
              <div
                class="cursor-pointer flex items-center"
                @click="selectProduct(i)"
              >
                <div
                  class="checkbox_div min-w-5 min-h-5 max-w-5 max-h-5 rounded-sm border-2 box-border flex items-center justify-center mr-2.5"
                >
                  <font-awesome-icon
                    v-show="eachProduct.isSelected"
                    :icon="['fas', 'check']"
                    class="fa-solid fa-check w-3"
                  />
                </div>

                <div class="product_text text-xl">商品</div>
              </div>
              <div
                class="operate_div ml-auto w-10 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                @click="deleteProduct(i)"
              >
                <img src="/assets/img/garbage_can.png" alt="" />
              </div>
            </div>
            <div class="product flex items-center pl-2 pt-3 mb-6">
              <div
                class="product_img w-14 h-14 bg-contain bg-center bg-no-repeat"
                style="
                  background-image: url(&quot;https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png&quot;);
                "
              ></div>
              <div class="name_price_div w-full px-2.5">
                <div class="product_name text-center">
                  {{ eachProduct.title }}
                </div>
                <div class="product_single_price ml-5.5">
                  <span>NT$</span>
                  <span class="single_price font-black text-2xl">{{
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
                  class="quantity_out_div w-36 h-10 rounded flex items-center justify-around px-2 bg-white"
                >
                  <div
                    class="icon_div min-w-6 min-h-6 flex justify-center items-center cursor-pointer"
                    @click="productQuantityChange(i, -1)"
                  >
                    <img class="minus" src="/assets/img/minus.png" alt="" />
                  </div>

                  <input
                    class="quantity_input w-full text-center"
                    type="number"
                    @input="productQuantityInput(eachProduct, $event)"
                    :value="eachProduct.quantity"
                  />
                  <div
                    class="icon_div min-w-6 min-h-6 flex justify-center items-center cursor-pointer"
                    @click="productQuantityChange(i, 1)"
                  >
                    <img class="plus" src="/assets/img/plus.png" alt="" />
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
            <div class="product_operate"></div>
          </div>
        </div>

        <!-- pc -->
        <div class="shopping_cart_list hidden lg:block">
          <div
            class="each_product flex h-44"
            v-for="(eachProduct, i) in testArr"
            :class="{ is_selected_product: eachProduct.isSelected }"
            :key="eachProduct.productId"
          >
            <div
              class="product_checkbox_pc flex basis-0 grow items-center justify-center"
            >
              <div
                class="check_box_out_div p-3 cursor-pointer"
                @click="selectProduct(i)"
              >
                <div
                  class="checkbox_div min-w-5 min-h-5 max-w-5 max-h-5 rounded-sm border-2 box-border flex items-center justify-center"
                >
                  <font-awesome-icon
                    v-show="eachProduct.isSelected"
                    :icon="['fas', 'check']"
                    class="fa-solid fa-check w-3"
                  />
                </div>
              </div>
            </div>
            <div
              class="product flex basis-0 grow-2 justify-center items-center"
            >
              <div
                class="product_img min-w-14 min-h-14 bg-contain bg-center bg-no-repeat mr-2.5"
                style="
                  background-image: url(&quot;https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png&quot;);
                "
              ></div>
              <div class="product_name w-11/12 inline-block">
                {{ eachProduct.title }}
              </div>
            </div>
            <div
              class="product_single_price basis-0 flex grow justify-center items-center"
            >
              <span>NT$</span>
              <span class="single_price">{{ eachProduct.price }}</span>
            </div>
            <div
              class="product_quantity flex basis-0 grow items-center justify-center"
            >
              <div
                class="quantity_out_div w-36 h-10 rounded flex items-center justify-around px-2 bg-white"
              >
                <div
                  class="icon_div min-w-6 min-h-6 flex justify-center items-center cursor-pointer"
                  @click="productQuantityChange(i, -1)"
                >
                  <img class="minus" src="/assets/img/minus.png" alt="" />
                </div>

                <input
                  class="quantity_input w-full text-center"
                  type="number"
                  @input="productQuantityInput(eachProduct, $event)"
                  :value="eachProduct.quantity"
                />
                <div
                  class="icon_div min-w-6 min-h-6 flex justify-center items-center cursor-pointer"
                  @click="productQuantityChange(i, 1)"
                >
                  <img class="plus" src="/assets/img/plus.png" alt="" />
                </div>
              </div>
            </div>
            <div
              class="product_total_price flex basis-0 grow justify-center items-center"
            >
              <span class="total_price">NT$</span>
              <span class="total_price">{{
                eachProduct.quantity * eachProduct.price
              }}</span>
            </div>
            <div
              class="product_operate flex basis-0 grow items-center justify-center"
            >
              <div
                class="operate_div_pc w-10 h-8 flex items-center justify-center cursor-pointer"
                @click="deleteProduct(i)"
              >
                <img src="/assets/img/garbage_can.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="bottom_block h-36 rounded text-center pt-6 lg:pt-0 lg:h-24 lg:flex lg:items-center lg:justify-end lg:bg-gray-300"
        >
          <div
            class="total_price_all mb-4 lg:bg-slate-100 rounded lg:h-16 lg:w-56 lg:flex lg:items-center lg:justify-center lg:mb-0 lg:mr-4"
          >
            總金額
            <span class="total_price ml-5">NT$</span>
            <span class="total_price font-black text-2xl">{{
              totalPrice
            }}</span>
          </div>
          <div
            class="go_shop h-15 w-11/12 rounded mx-auto flex items-center justify-center cursor-pointer lg:h-16 lg:w-64 lg:mx-0 lg:mr-4"
          >
            <img class="mr-3" src="/assets/img/card.png" alt="" />
            <span class="text-xl color-white">去買單</span>
          </div>
        </div>
        <div class="check_btn" @click="checkValue">檢查</div>
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

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
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
