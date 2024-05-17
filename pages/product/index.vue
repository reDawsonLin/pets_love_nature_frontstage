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
     
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        
        <!-- search section -->
        <div class="bg_orange_primary search_section  p-4 ">
          <a href="#" class="inline-flex mr-1  w-[113px] justify-center rounded-md bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm  ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">最熱銷</a>
          <a href="#" class="inline-flex  mr-1 w-[113px] justify-center rounded-md bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm  ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">評價最高</a>
          <select class="inline-flex   mr-1  w-[113px] justify-center rounded-md bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm  ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" name="" id="">
            <option value="" disabled >價格/時間</option>
            <option value="">時間</option>
            <option value="">價格</option>
          </select>
    
          <div class=" inline-flex relative w-[226px]   mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">O</span>
            </div>
            <input type="text" name="price" id="price" class="inline-flex w-[226px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="搜尋">
          </div>

        </div>  

        <!-- products section -->
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          
          <div v-for="product in productJson" key="product.prodcutid" class="group relative product border b-rd-2xl pb-4 pr-2 pl-2">
            <div class="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <!-- <img src="/assets/img/catfood1.png" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full"> -->
              <img :src="product.imgBase64" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">

              <div class="absolute top-2 right-2  " >
                <img src="/assets/img/icon/icon-favorite.svg" alt="">
              </div>
              <div class="absolute bottom-2 left-2 w-50px text-center " >
                <div class="bg-[#525252] text-white pl-8px pr-8px border-rd-8px"> {{  product.weight  }}</div>
              </div>
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {{  product.title  }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">NT$ {{  product.price  }}</p>
              </div>
              <div class="flex flex-col  flex-items-end grid-justify-end">
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
        <div class="bg_orange_primary search_section  p-4 ">
          <!-- <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> -->
            <div class="flex items-center justify-between px-4 py-3 sm:px-6 ">
              <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                  <nav class="isolate inline-flex rounded-md " aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center rounded-l-md  mr-2 px-2 py-2 bg-white  text-gray-400  ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                    <a href="#" aria-current="page" class="relative z-10 inline-flex  mr-2 items-center bg-white  b-rd-1   px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                    <a href="#" class="relative inline-flex items-center bg-white px-4 mr-2 py-2 text-sm font-semibold b-rd-1  text-gray-900  ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                    <a href="#" class="relative hidden items-center px-4 py-2 bg-white  mr-2 text-sm font-semibold b-rd-1 text-gray-900 ring-inset  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                    <span class="relative inline-flex items-center px-4 py-2  mr-2 text-sm font-semibold text-gray-700  ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    <a href="#" class="relative inline-flex items-center rounded-r-md bg-white  mr-10 px-2 py-2 text-gray-400  ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </a>


                    <select class="w-150px h-40px b-rd-1 p-8px text-gray-700" name="" id="">
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
