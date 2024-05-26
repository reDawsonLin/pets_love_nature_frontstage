<script setup>

const productJson = ref([
  {
    prodcutid:1111,
    prductNumber:"A001",
    title: "鮮嫩雞胸肉凍乾22",
    price: 200,
    weight: "100g",
    star: 4.5,
    imgBase64: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
    favorite: true,
    inStock: 50 // soldout 判斷
    
  },
  {
    prodcutid:1112,
    prductNumber:"A001",
    title: "鮮嫩雞胸肉凍乾",
    price: 100,
    weight: "100g",
    star: 4,
    imgBase64: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
    favorite: true,
    inStock: 50 // soldout 判斷
  },
  {
    prodcutid:1113,
    prductNumber:"A001",
    title: "鮮肉凍乾",
    price: 50,
    weight: "100g",
    star: 2,
    imgBase64: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
    favorite: true,
    inStock: 50 // soldout 判斷
  },
  {
    prodcutid:1114,
    prductNumber:"A001",
    title: "鮮嫩雞胸肉凍乾",
    price: 200,
    weight: "100g",
    star: 1.5,
    imgBase64: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
    favorite: true,
    inStock: 50 // soldout 判斷
  },
  {
    prodcutid:1115,
    prductNumber:"A001",
    title: "鮮嫩雞胸肉凍乾",
    price: 200,
    weight: "100g",
    star: 3,
    imgBase64: "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/12726835984140-c4068191-7291-456e-b6b4-792140c83051.png",
    favorite: true,
    inStock: 50 // soldout 判斷
  }
]);

</script>

<template>
  <div class="products_page">
    <div class="bg-white">
     
      <div class="mx-auto max-w-2xl px-4 py-16 lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24">
        
        <!-- search section -->
        <div class="bg_orange_primary search_section p-4">
          <a href="#" class="mr-1 w-[113px] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50">最熱銷</a>
          <a href="#" class="mr-1 w-[113px] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50">評價最高</a>
          <select id="" class="mr-1 w-[113px] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50" name="">
            <option value="" disabled >價格/時間</option>
            <option value="">時間</option>
            <option value="">價格</option>
          </select>
    
          <div class="relative mt-2 w-[226px] inline-flex rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">O</span>
            </div>
            <input id="price" type="text" name="price" class="w-[226px] inline-flex border-0 rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset" placeholder="搜尋">
          </div>

        </div>  

        <!-- products section -->
        <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-8">
          
          <div v-for="product in productJson" :key="product.prodcutid" class="group product relative border b-rd-2xl pb-4 pl-2 pr-2">
            <div class="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75">
              <!-- <img src="/assets/img/catfood1.png" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"> -->
              <img :src="product.imgBase64" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">

              <div class="absolute right-2 top-2" >
                <img src="/assets/img/icon/icon-favorite.svg" alt="">
              </div>
              <div class="absolute bottom-2 left-2 w-50px text-center" >
                <div class="border-rd-8px bg-[#525252] pl-8px pr-8px text-white"> {{  product.weight  }}</div>
              </div>
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" class="absolute inset-0"/>
                    {{  product.title  }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">NT$ {{  product.price  }}</p>
              </div>
              <div class="flex flex-col grid-justify-end flex-items-end">
                <div class="flex">
                  <img v-for="index in Math.floor(product.star)" :key="index" src="/assets/img/icon/icon-star.svg" alt="Star">
                  <img v-if="product.star %1 === 0.5" src="/assets/img/icon/icon-star_half.svg" alt="">
                </div>
                <div>
                  <img src="/assets/img/icon/icon-cart.svg" alt="">
                </div>
              </div>
            </div>
          </div>
       
          <!-- More products... -->
        </div>

        <!-- page section -->
        <div class="bg_orange_primary search_section p-4">
          <!-- <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> -->
            <div class="flex items-center justify-between px-4 py-3 sm:px-6">
              <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                  <nav class="isolate inline-flex rounded-md" aria-label="Pagination">
                    <a href="#" class="relative mr-2 inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0">
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                    <a href="#" aria-current="page" class="relative z-10 mr-2 inline-flex items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">1</a>
                    <a href="#" class="relative mr-2 inline-flex items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 font-semibold ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0">2</a>
                    <a href="#" class="relative mr-2 hidden items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 font-semibold ring-inset focus:z-20 md:inline-flex hover:bg-gray-50 focus:outline-offset-0">3</a>
                    <span class="relative mr-2 inline-flex items-center px-4 py-2 text-sm text-gray-700 font-semibold ring-gray-300 ring-inset focus:outline-offset-0">...</span>
                    <a href="#" class="relative mr-10 inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0">
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </a>


                    <select id="" class="h-40px w-150px b-rd-1 p-8px text-gray-700" name="">
                      <option value="">第一頁</option>
                      <option value="">第二頁</option>
                      <option value="">第三頁</option>
                    </select>
                  </nav>
                </div>
              </div>
          </div>

        </div>  

      </div>
    </div>
  </div>
</template>

<style scoped>

.bg_orange_primary {
    background-color: #f9f0ea;
}

.product_checkbox {
    background-color: #e5e5e5;
}

.choosed_product {
    background-color: #e5e5e5;
}
</style>
