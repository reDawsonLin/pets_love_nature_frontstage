<script setup>
const testArr = ref([
    {
        productId: 'A00001',
        quantity: 3,
        title: '控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃',
        weight: 15,
        price: 100,
        inStock: 10,
        image: {
            id: 0,
            imgUrl: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png',
            altText: ''
        },
        choosed: false
    },
    {
        productId: 'A00001',
        quantity: 3,
        title: '好吃貓食',
        weight: 15,
        price: 150,
        inStock: 10,
        image: {
            id: 0,
            imgUrl: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png',
            altText: ''
        },
        choosed: false
    }
]);

const choosedProductArr = computed(() => testArr.value.filter(eachProduct => eachProduct.choosed))

const totalPrice = computed(() => choosedProductArr.value.reduce((acc, cur) => acc + cur.quantity * cur.price, 0));

const checkValue = () => {
    console.log(testArr);
};

const chooseProduct = i => {
    testArr.value[i].choosed = !testArr.value[i].choosed;
};

const deleteProduct = i => {
    testArr.value.splice(i, 1);
};
</script>

<template>
    <div class="shopping_cart">
        <div p="t-3.75rem" class="title flex items-center justify-center mb-7.5">
            <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" />
            <h1 class="text-4xl">購物車</h1>
        </div>
        <div class="white_space w-11/12 bg-white m-auto rounded pt-6 pl-4 pr-4 pb-6 mb-5">
            <div class="out_block w-full">
                <div class="top_bar">
                    <div class="top_check_box"></div>
                    <div class="top_product"></div>
                    <div class="top_single_price"></div>
                    <div class="top_quantity"></div>
                    <div class="top_total_price"></div>
                    <div class="top_operate"></div>
                </div>
                <!-- mobile -->
                <div class="shopping_cart_list">
                    <div
                        v-for="(eachProduct, i) in testArr"
                        :key="eachProduct.productId"
                        :class="{ choosed_product: eachProduct.choosed }"
                        class="each_product pb-2 rounded-md mb-7"
                    >
                        <div class="product_checkbox flex pl-2 pr-2 items-center h-12 w-full rounded-md">
                            <div class="cursor-pointer flex items-center" @click="chooseProduct(i)">
                                <div
                                    class="checkbox_div min-w-5 min-h-5 max-w-5 max-h-5 rounded-sm border-2 box-border flex items-center justify-center mr-2.5"
                                >
                                    <font-awesome-icon
                                        v-show="eachProduct.choosed"
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
                                    background-image: url('https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png');
                                "
                            ></div>
                            <div class="name_price_div w-full px-2.5">
                                <div class="product_name text-center">
                                    {{ eachProduct.title }}
                                </div>
                                <div class="product_single_price ml-5.5">
                                    <span>NT$</span>
                                    <span class="single_price font-black text-2xl">{{ eachProduct.price }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="product_single_price"><span>NT$</span> <span class="single_price">450</span></div> -->

                        <div class="quantity_price_div flex items-center justify-between pl-2 pr-3">
                            <div class="product_quantity">
                                <select
                                    v-model="eachProduct.quantity"
                                    name="quantity"
                                    class="border border-slate-400 rounded-sm w-28 py-1 px-1"
                                >
                                    <option v-for="index in eachProduct.inStock" :key="index" :value="index">
                                        {{ index }}
                                    </option>
                                </select>
                            </div>
                            <div class="product_total_price">
                                總計<span class="total_price ml-1">NT$</span>
                                <span class="total_price text-2xl">{{ eachProduct.quantity * eachProduct.price }}</span>
                            </div>
                        </div>
                        <div class="product_operate"></div>
                    </div>
                </div>

                <!-- pc -->
                <!-- <div class="shopping_cart_list">
                    <div class="each_product">
                        <div class="product_checkbox flex pl-2 pr-2 items-center h-12 w-full">
                            <div
                                class="checkbox_div min-w-5 min-h-5 max-w-5 max-h-5 rounded-sm border-2 box-border flex items-center justify-center mr-2.5"
                            >
                                <font-awesome-icon :icon="['fas', 'check']" class="fa-solid fa-check w-3" />
                            </div>

                            <div class="product_text text-xl">商品</div>
                            <div class="operate_div ml-auto w-10 h-8 flex items-center justify-center">
                                <img src="/assets/img/garbage_can.png" alt="" />
                            </div>
                        </div>
                        <div class="product">
                            <div class="product_img w-14 h-14 bg-yellow w-1/12 inline-block"></div>
                            <div class="product_name w-11/12 inline-block">
                                控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃
                            </div>
                        </div>
                        <div class="product_single_price"><span>NT$</span> <span class="single_price">450</span></div>
                        <div class="product_quantity">
                            <select name="quantity" id="" class="border border-slate-400 rounded-sm w-28 py-1 px-1">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div class="product_total_price">總計<span>NT$</span> <span class="total_price">450</span></div>
                        <div class="product_operate"></div>
                    </div>
                </div> -->
                <div class="bottom_block h-36 rounded text-center pt-6">
                    <div class="total_price_all mb-4">
                        總金額
                        <span class="total_price ml-5">NT$</span>
                        <span class="total_price font-black text-2xl">{{ totalPrice }}</span>
                    </div>
                    <div class="go_shop h-15 w-11/12 rounded mx-auto flex items-center justify-center cursor-pointer">
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
.shopping_cart {
    background-color: #f9f0ea;
}

.product_checkbox {
    background-color: #e5e5e5;
}

.choosed_product {
    background-color: #e5e5e5;
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
</style>
