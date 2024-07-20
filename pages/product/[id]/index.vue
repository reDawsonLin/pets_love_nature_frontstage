<script setup>
import { useStoreCart } from "~/stores/storeCart";

const route = useRoute();
const { id } = route.params;
const imgsIndex = ref(0);
const imgsGalleryStart = ref(0);
const imgsGalleryEnd = ref(3);
const buyAmount = ref(1);

const storeCart = useStoreCart();
const { addCart } = storeCart;

const relatedData = ref([]);
const relatedCategory = ref("");
const show_pending = ref(true);

const productSpecListIndex = ref(0);
const productIDData = ref({
  _id: "",
  title: "",
  subtitle: "",
  description: "",
  category: [],
  otherInfo: [
    {
      infoName: "",
      infoValue: "",
    },
  ],
  star: "",
  imageGallery: [
    {
      _id: "",
      imgUrl: "",
      altText: "",
    },
  ],
  weight: "",
  price: "",
  inStock: "",
  onlineStatus: "",
  createdAt: "",
  updatedAt: "",
  productSpecList: [
    {
      _id: "",
      productId: "",
      weight: "",
      price: "",
      inStock: "",
      onlineStatus: false,
      createdAt: "2024-06-03T16:11:56.046Z",
      updatedAt: "2024-06-03T16:11:56.046Z",
    },
    {
      _id: "",
      productId: "",
      weight: "",
      price: "",
      inStock: "",
      onlineStatus: false,
      createdAt: "2024-06-03T16:11:56.046Z",
      updatedAt: "2024-06-03T16:11:56.046Z",
    },
  ],
});

// for相關商品
const productsData = ref([]);
const { data: data_product } = await useApiFetch(`product/${id}`);

productIDData.value = data_product.value.data;
relatedCategory.value = data_product.value.data.category[0];

show_pending.value = false;

const { data: data_related } = await useApiFetch(
  `product/getFilterProductList?filterCategory=${relatedCategory.value}`
);

relatedData.value = data_related.value.data;
productsData.value = data_related.value.data.content.slice(0, 3);

const dayjs = useDayjs();
const commentData = ref([]);

const { data: data_comment } = await useApiFetch(
  `comment/${productIDData.value.productId}`
);

data_comment.value.data.map((item) => {
  if (!item.comment) return;

  commentData.value.push({
    customer: hideString(item.customerId.customerName),
    comment: item.comment,
    create: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
  });
});

// -------
const addToCart = async (product) => {
  const obj = {
    productSpec: product.productSpecList[productSpecListIndex.value]._id,
    quantity: buyAmount.value,
    inStock: product.productSpecList[productSpecListIndex.value].inStock,
  };
  const arr = [obj];
  await addCart(arr, 0);
  buyAmount.value = 1;
};

const changeImg = (index) => {
  imgsIndex.value = index;
};

const changeImgsGallery = (val) => {
  if (productIDData.value.imageGallery.length < 4) {
    return;
  }
  if (val == 1) {
    if (productIDData.value.imageGallery.length - 1 == imgsGalleryEnd.value) {
      return;
    }
    imgsGalleryStart.value += 1;
    imgsGalleryEnd.value += 1;
  } else {
    if (imgsGalleryStart.value == 0) {
      return;
    }
    imgsGalleryStart.value -= 1;
    imgsGalleryEnd.value -= 1;
  }
};

const buyAmountChange = (num) => {
  if (num == 1) {
    buyAmount.value += 1;
  } else if (num == -1) {
    if (buyAmount.value == 1) {
      return;
    }
    buyAmount.value -= 1;
  }
};

const changeProductSpecListIndex = (index) => {
  productSpecListIndex.value = index;
};

// -------
// const dummy_comment = [
//   {
//     customer: "M**g",
//     comment: "超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️",
//     create: "2024-03-12 11:21:33",
//   },
//   {
//     customer: "J**k",
//     comment: "良心商家，值得多買",
//     create: "2024-03-28 19:27:11",
//   },
// ];
</script>

<template>
  <LoadingPending :show="show_pending" />

  <div class="bg-white">
    <div
      class="product mx-auto max-w-4xl px-4 py-16 lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24"
    >
      <div class="header h-auto md:h-[773px]">
        <div class="product-imgs grid grid-cols-1 md:grid-cols-2">
          <div class="imgs w-[90%]">
            <div class="mb-[16px] h-[637px]">
              <!-- imgsIndex -->
              <img
                class="ma h-[100%] object-contain"
                :src="productIDData.imageGallery[imgsIndex].imgUrl"
                alt=""
              >
              <!-- :src="imgs[imgsIndex].imgUrl" -->
            </div>
            <div class="h-[120px] w-[100%] flex justify-between">
              <div
                class="w-[24px] flex items-center bg-[#E5E5E5]"
                @click="changeImgsGallery(-1)"
              >
                <img src="/assets/img/icon/icon-chevron_left.svg" alt="" >
              </div>

              <div class="w-[90%] overflow-hidden">
                <div
                  v-for="(item, index) in productIDData.imageGallery"
                  :key="index"
                  class="inline"
                >
                  <div
                    v-if="index <= imgsGalleryEnd && index >= imgsGalleryStart"
                    class="inline-block h-[100%] w-[25%]"
                  >
                    <img
                      :src="item.imgUrl"
                      class="h-[100%] object-contain object-center"
                      alt=""
                      @click="changeImg(index)"
                    >
                  </div>
                </div>
              </div>

              <div
                class="w-[24px flex items-center bg-[#E5E5E5]"
                @click="changeImgsGallery(1)"
              >
                <img src="/assets/img/icon/icon-chevron_right.svg" alt="" >
              </div>
            </div>
          </div>
          <div class="product-imgs grid grid-cols-6 flex flex-col">
            <h2 class="mb-[16px]">{{ productIDData.title }}</h2>
            <p class="mb-[16px] text-[#525252] font-light">
              {{ productIDData.subtitle }}
            </p>
            <p class="mb-[64px]">
              NT$
              <span class="font-size-[48px] font-300"
                >{{ productIDData.productSpecList[productSpecListIndex].price }}
              </span>
            </p>
            <div class="weight mb-[24px] flex">
              <div
                v-for="(item, index) in productIDData.productSpecList"
                :key="index"
                class="mr-4 h-[45px] w-[100px] flex items-center justify-center b-rd-8px bg-[#E5E5E5] pb-[8px] pt-[8px] text-center font-size-[24px] font-200"
                :class="{
                  'bg-[#F43F5E] text-white': productSpecListIndex == index,
                  'hover:transform hover:scale-110 hover:bg-opacity-80 transition duration-300': true,
                }"
                @click="changeProductSpecListIndex(index)"
              >
                {{ productIDData.productSpecList[index].weight }}g
              </div>
            </div>
            <div>
              <div
                class="mb-[16px] w-[140px] flex justify-between b b-[#E5E5E5] b-rd-8px b-solid p-[8px]"
              >
                <img
                  class=""
                  src="/assets/img/icon/icon-remove.svg"
                  alt=""
                  style="fill: red"
                  @click="buyAmountChange(-1)"
                >
                <div class="font-size-[20px]">
                  <input
                    v-model="buyAmount"
                    type="text"
                    class="block w-full rounded-lg p-2.5 text-sm text-gray-900"
                  >
                </div>
                <img
                  class=""
                  src="/assets/img/icon/icon-add.svg"
                  alt=""
                  style="fill: red"
                  @click="buyAmountChange(1)"
                >
              </div>
            </div>

            <div class="md:flew-row mb-[64px] flex flex-col md:flex-row">
              <div
                class="mx-auto mb-[12px] h-[60px] w-[100%] flex cursor-pointer items-center justify-center rounded bg-[#E5E5E5] text-black lg:mx-0 lg:mr-4 md:mb-[0] lg:h-[60px] lg:w-64 md:w-[258px]"
              >
                <img
                  class="mr-3"
                  src="/assets/img/icon/icon-cart-bgE5.svg"
                  alt=""
                  style="fill: red"
                >
                <span
                  class="font-size-[20px] text-[#525252]"
                  @click="addToCart(productIDData)"
                  >加入購物車</span
                >
              </div>

              <div
                class="mx-auto h-[60px] w-[100%] flex cursor-pointer items-center justify-center b b-[#E5E5E5] rounded b-solid text-black lg:mx-0 lg:mr-4 lg:h-[60px] lg:w-64 md:w-[258px]"
              >
                <img
                  class="mr-3"
                  src="/assets/img/icon/icon-credit_card.svg"
                  alt=""
                  style="fill: red"
                >
                <span class="font-size-[20px]">直接購買</span>
              </div>
            </div>

            <div class="text-[#525252]">
              <h3
                class="h-[50px] flex items-center bg-[#F9F0EA] p-[16px] font-size-[24px] text-[#525252] font-200"
              >
                商品規格
              </h3>
              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">分類</p>
                <div class="flex">
                  <p
                    v-for="(category, index) in productIDData.category"
                    :key="index"
                    class="mr-2 bg-[#F9F0EA] pl-[8px] pr-[8px]"
                  >
                    <span v-if="category == 'fresh'">鮮食</span>
                    <span v-if="category == 'cat'">貓食</span>
                    <span v-if="category == 'dog'">狗食</span>
                    <span v-if="category == 'dry'">凍乾</span>
                  </p>
                </div>
              </div>
              <hr >

              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">{{ productIDData.otherInfo[0].infoName }}</p>
                <div class="flex">
                  <p class="mr-2 pl-[8px] pr-[8px]">
                    {{ productIDData.otherInfo[0].infoValue }}
                  </p>
                </div>
              </div>
              <hr >

              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">庫存</p>
                <div class="flex">
                  <p class="mr-2 pl-[8px] pr-[8px]">
                    {{ productIDData.productSpecList[productSpecListIndex].inStock }}
                  </p>
                </div>
              </div>
              <hr >
            </div>
          </div>
        </div>
      </div>

      <div class="content mb-[120px] mt-[16px]">
        <div>
          <p v-html="productIDData.description" />
        </div>
      </div>

      <div class="footer">
        <div v-if="!!commentData.length" class="my-2 mb-[120px]">
          <div
            class="mb-[48px] h-[50px] bg-[#E5E5E5] px-[16px] py-[8px] font-size-[24px] text-[#525252] font-200"
          >
            評價
          </div>
          <br >
          <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 md:grid-cols-1">
            <div v-if="!!commentData.length">
              <Swiper
                ref="mySwiper"
                :height="300"
                :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
                pagination
                :loop="true"
                :loop-fill-group-with-blank="true"
                effect="fade"
                :breakpoints="{
                  640: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }"
                :autoplay="{
                  delay: 1000,
                  disableOnInteraction: true,
                }"
                :creative-effect="{
                  prev: {
                    shadow: false,
                    translate: ['100%', 0, 0],
                  },
                  next: {
                    shadow: false,
                    translate: ['100%', 0, 0],
                  },
                }"
              >
                <SwiperSlide v-for="(comment, index) in commentData" :key="index">
                  <div>
                    <div class="comment flex items-center">
                      <div class="min-w-[100px] w-[30%]">
                        <img
                          class="h-[100px] w-[100px]"
                          src="/assets/img/personPhoto.jpg"
                          alt=""
                        >
                        <p class="w-[100px] text-center">{{ comment?.customer }}</p>
                      </div>
                      <div class="w-[calc(100%-100px)] flex items-center">
                        <div class="triangle" />
                        <div class="radius-square w-[80%] p-[48px]">
                          <span>{{ comment.comment }} </span>
                          <br >
                          <span class="text-[#A3A3A3]">{{ comment.create }} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div>
          <div
            class="mb-[48px] h-[50px] bg-[#E5E5E5] px-[16px] py-[8px] font-size-[24px] text-[#525252] font-200"
          >
            相關商品
          </div>

          <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-3">
            <div
              v-for="product in productsData"
              :key="product._id"
              class="group product relative border b-rd-2xl pb-4"
            >
              <div
                v-if="product.product.imageGallery.length > 0"
                class="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75"
              >
                <img
                  :src="product.product.imageGallery[0].imgUrl.trim()"
                  :alt="product.product.imageGallery[0].altText"
                  class="h-[300px] h-full w-full object-cover object-center"
                >

                <div class="absolute bottom-2 left-2 w-50px text-center">
                  <div class="border-rd-8px bg-[#525252] pl-8px pr-8px text-white">
                    {{ product.weight }}g
                  </div>
                </div>
              </div>
              <div class="mt-4 flex justify-between pl-2 pr-2">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="">
                      {{ product.product.title }}
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">NT$ {{ product.price }}</p>
                </div>
                <div class="flex flex-col grid-justify-end flex-items-end">
                  <div v-if="product.product.star > 0" class="flex">
                    <img
                      v-for="index in Math.floor(product.product.star)"
                      :key="index"
                      src="/assets/img/icon/icon-star.svg"
                      alt="Star"
                    >
                    <img
                      v-if="product.product.star % 1 === 0.5"
                      src="/assets/img/icon/icon-star_half.svg"
                      alt=""
                    >
                  </div>
                  <div class="hover-effect" @click="addToCart(product)">
                    <img src="/assets/img/icon/icon-cart.svg" alt="" >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
.swiper-cards {
  width: 240px;
  height: 240px;
}
.swiper-cards .swiper-slide {
  border-radius: 6px;
  border: 1px solid black;
}

#__nuxt {
  height: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
  /* width: 500px;
  height: 500px; */
  /* border: 1px solid red; */
}

.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-top: 20px solid #f9f0ea;
}

.radius-square {
  /* width: 460px; */
  height: 231px;
  background: #f9f0ea;
  border-radius: 36px;
}
input {
  border: 0;
  outline: none;
  text-align: center;
}
.hover-effect img {
  transition: transform 0.3s ease;
}
.hover-effect img:hover {
  transform: scale(1.1);
  filter: brightness(0.8);
}
</style>
