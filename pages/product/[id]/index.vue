<script setup>

const productData = ref([
  {
    _id: 11,
    price: 200,
    weight: "100",
    star: 4.5,
    inStock: 50,
    productId: {
      prductNumber: "A001",
      title: "鮮嫩雞胸肉鮮食罐頭",
      imageGallery: [
        {
          imgUrl: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          altText: "狗鮮食"
        }
      ]
    },
  },
  {
    _id: 11,
    price: 200,
    weight: "100",
    star: 4.5,
    inStock: 50,
    productId: {
      prductNumber: "A001",
      title: "鮮嫩雞胸肉鮮食罐頭",
      imageGallery: [
        {
          imgUrl: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          altText: "狗鮮食"
        }
      ]
    },
  },
  {
    _id: 11,
    price: 200,
    weight: "10",
    star: 4.5,
    inStock: 50,
    productId: {
      prductNumber: "A001",
      title: "鮮嫩雞胸肉鮮食罐頭",
      imageGallery: [
        {
          imgUrl: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          altText: "狗鮮食"
        }
      ]
    },
  },
]
);

const addToCart = () => {
  console.log('add');
}

</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-4xl px-4 py-16 lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24">
      <div class="header h-auto md:h-[700px]">
        <div class="product-imgs grid grid-cols-1 md:grid-cols-2">
          <div class="imgs w-[100%]">
            <div>
              <img
class="ma"
                src="https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png"
                alt="">
            </div>
            <div class="h-[120px] w-[100%] flex justify-between">
              <div class="w-[24px] flex items-center bg-[#E5E5E5]">

                <img src="/assets/img/icon/icon-chevron_left.svg" alt="">
              </div>
              <img
                src="https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png"
                alt="">

              <img
                src="https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png"
                alt="">

              <img
                src="https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png"
                alt="">
              <div class="w-[24px flex items-center bg-[#E5E5E5]">

                <img src="/assets/img/icon/icon-chevron_right.svg" alt="">
              </div>
            </div>

          </div>
          <div class="product-imgs grid grid-cols-6 flex flex-col">
            <h2 class="mb-[16px]">鮮嫩雞胸肉凍乾</h2>
            <p class="mb-[16px] text-[#525252] font-light">新鮮雞胸肉，符合人食等級，富含高品質蛋白質，提供毛孩維持健康體愛所需的重要營養素。</p>
            <p class="mb-[32px]">NT$ <span class="font-size-[48px] font-300">300 </span></p>
            <div class="weight mb-[16px] flex">
              <div
                class="mr-4 h-[45px] w-[100px] flex items-center justify-center b-rd-8px bg-[#F43F5E] pb-[8px] pt-[8px] text-center font-size-[24px] text-white font-200">
                100g</div>
              <div
                class="h-[45px] w-[100px] flex items-center justify-center b-rd-8px bg-[#E5E5E5] font-size-[24px] text-black font-200">
                30g</div>
            </div>
            <div>
              <div class="mb-[16px] w-[140px] flex justify-between b b-[#E5E5E5] b-rd-8px b-solid p-[8px]">
                <img class="" src="/assets/img/icon/icon-remove.svg" alt="" style="fill: red;">
                <div class="font-size-[20px]">2</div>
                <img class="" src="/assets/img/icon/icon-add.svg" alt="" style="fill: red;">

              </div>

            </div>

            <div class="md:flew-row mb-[48px] flex flex-col md:flex-row">
              <div
                class="mx-auto mb-[12px] h-[60px] w-[100%] flex cursor-pointer items-center justify-center rounded bg-[#E5E5E5] text-black lg:mx-0 lg:mr-4 md:mb-[0] lg:h-[60px] lg:w-64 md:w-[258px]">
                <img class="mr-3" src="/assets/img/icon/icon-cart-bgE5.svg" alt="" style="fill: red;">
                <span class="font-size-[20px] text-[#525252]">加入購物車</span>
              </div>

              <div
                class="mx-auto h-[60px] w-[100%] flex cursor-pointer items-center justify-center b b-[#E5E5E5] rounded b-solid text-black lg:mx-0 lg:mr-4 lg:h-[60px] lg:w-64 md:w-[258px]">
                <img class="mr-3" src="/assets/img/icon/icon-credit_card.svg" alt="" style="fill: red;">
                <span class="font-size-[20px]">直接購買</span>
              </div>
            </div>

            <div class="text-[#525252]">
              <h3 class="h-[50px] flex items-center bg-[#F9F0EA] p-[16px] font-size-[24px] text-[#525252] font-200">商品規格
              </h3>
              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">分類</p>
                <div class="flex">
                  <p class="mr-2 bg-[#F9F0EA] pl-[8px] pr-[8px]">凍乾</p>
                  <p class="bg-[#F9F0EA] pl-[8px] pr-[8px]">貓貓專區</p>
                </div>
              </div>
              <hr>

              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">產地</p>
                <div class="flex">
                  <p class="mr-2 pl-[8px] pr-[8px]">臺灣</p>
                </div>
              </div>
              <hr>

              <div class="h-[56px] flex items-center">
                <p class="w-[100px]">庫存</p>
                <div class="flex">
                  <p class="mr-2 pl-[8px] pr-[8px]">100</p>
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div>

      </div>

      <div class="content">
        <img
          src="https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png"
          alt="" >

        <p>
          24h 快速出貨🔥<br>
          😺寵物鮮食凍乾🐶<br>
          嚴選人食等級肉品，100%純天然健康、絕無添加！<br>!!照護毛孩健康是我們的本份💖我們的包裝簡約卻充滿溫暖，用心經營每一個細節，只為了將成本降至最低，讓品質卻提升至最高，將這份愛與呵護，完美呈現在毛孩的每一餐中😍
          TW台灣加工廠直售，我們與您攜手守護毛孩的健康，原料、加工到包裝一條龍作業全都在台灣在地生產製作🔥
          如有相關問題歡迎聊聊~小編竭盡所能&盡快的回覆🫶️※ 小編回覆時間為9:00~小編愛睏為止😌
          ⚠近期繁多包裹詐騙⚠突如其來的貨到付款...等手法!!請家長們再三確認訂單系統通知🔥為了預防詐騙🔥建議使用信用卡付款、轉帳付款。
        </p>

      </div>

      <div class="footer">
        <div class="my-2 mb-[120px]">
          <div class="mb-[48px] h-[50px] bg-[#E5E5E5] px-[16px] py-[8px] font-size-[24px] text-[#525252] font-200">
            評價
          </div>
          <!-- <div class="flex "> -->
          <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 md:grid-cols-2">

            <div class="comment flex items-center">
              <div class="w-[30%]">
                <img class="h-[100px]" src="/assets/img/personPhoto.jpg" alt="">
              </div>
              <div class="w-[70%] flex items-center md:mr-[24px]">
                <div class="triangle"/>
                <div class="radius-square p-[48px]">
                  <span>超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️ </span>
                  <br >
                  <span class="text-[#A3A3A3]">2024-01-22 21:10</span>
                </div>
              </div>
            </div>
            <div class="comment flex items-center">
              <div class="w-[30%]">
                <img class="h-[100px]" src="/assets/img/personPhoto.jpg" alt="">
              </div>
              <div class="w-[70%] flex items-center">
                <div class="triangle"/>
                <div class="radius-square p-[48px]">
                  <span>超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️ </span>
                  <br >
                  <span class="text-[#A3A3A3]">2024-01-22 21:10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="h-[50px] bg-[#E5E5E5] px-[16px] py-[8px] font-size-[24px] text-[#525252] font-200">
            相關商品
          </div>
          <!-- test -->
          <!-- <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-8"> -->
          <div class="grid grid-cols-3 mt-6 gap-x-6 gap-y-10">

            <div
v-for="(product, index) in productData" :key="product._id"
              class="group product relative border b-rd-2xl pb-4 pl-2 pr-2">
              <div
v-if="product.productId.imageGallery.length > 0"
                class="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75">
                <img
:src="product.productId.imageGallery[0].imgUrl.trim()"
                  :alt="product.productId.imageGallery[0].altText"
                  class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                <div class="absolute right-2 top-2">
                  <img src="/assets/img/icon/icon-favorite.svg" alt="">
                </div>
                <div class="absolute bottom-2 left-2 w-50px text-center">
                  <div class="border-rd-8px bg-[#525252] pl-8px pr-8px text-white"> {{ product.weight }}g</div>
                </div>
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="">
                      <!-- <span aria-hidden="true" class="absolute inset-0">
                        {{ product.productId.title }}
                      </span> -->

                    </a>
                    <!-- {{ product.productId.imageGallery[0].imgUrl}} -->

                  </h3>
                  <p class="mt-1 text-sm text-gray-500">NT$ {{ product.price }}</p>
                </div>
                <div class="flex flex-col grid-justify-end flex-items-end">
                  <div v-if="product.star > 0" class="flex">
                    <img
v-for="index in Math.floor(product.star)" :key="index" src="/assets/img/icon/icon-star.svg"
                      alt="Star">
                    <img v-if="product.star % 1 === 0.5" src="/assets/img/icon/icon-star_half.svg" alt="">
                  </div>
                  <div @click="addToCart(product)">
                    <img src="/assets/img/icon/icon-cart.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- test end -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-top: 20px solid #F9F0EA;
}

.radius-square {
  width: 460px;
  height: 231px;
  background: #F9F0EA;
  border-radius: 36px;
}
</style>
