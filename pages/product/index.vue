<script setup>
const searchValue = ref({
  searchText: "",
  sortOrder: "1",
  sortBy: "",
  page: 1,
  // limit: "2"
})

let productData = ref([
  // {
  //   _id: 11,
  //   price: 200,
  //   weight: "100g",
  //   star: 4.5,
  //   inStock: 50,
  //   productId: {
  //     prductNumber: "A001",
  //     title: "鮮嫩雞胸肉鮮食罐頭",
  //     imageGallery: [
  //       {
  //         imgUrl: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         altText: "狗鮮食"
  //       }
  //     ]
  //   },
  // },
]
);

let pageInfo = ref([]);

const currentPage = ref(1);


const fetchData = async () => {
  console.log('36' ,searchValue.value);
  try {
    const params = {
      ...searchValue.value,

    }
    const queryString = new URLSearchParams(params).toString()

    const response = await fetch(
      // `https://pets-love-nature-backend-n.onrender.com/api/v1/product?${queryString}`,
      `https://pets-love-nature-backend-n.onrender.com/api/v1/product/getFilterProductList?${queryString}`,
      // `https://pets-love-nature-backend-n.onrender.com/api/v1/product/getFilterProductList`,

      {
        method: "GET",
      }

    );
    if (!response.ok) {
      // throw new Error("Network response was not ok");
      const e = new Error("請重新登入");
      e.name = response.status;
      throw e;

    }
    const result = await response.json();

    // data.value = result.data;
    productData.value = result.data.content
    pageInfo.value = result.data.page
    console.log(result.data.page);
    console.log("成功得到產品資訊", result.data.content);
  } catch (e) {
    console.log(e.message)
    console.log("err", e);

  }
};

const changeSort = (sortValue) => {
  searchValue.value.sortBy = sortValue
  fetchData()
}

const updateSearchText = (e)=>{
  fetchData()
}

const addToCart = () => {
  console.log('addToCart');
}

const handlePageChange = async() =>{
  searchValue.value.page = e.target.value;
  fetchData()
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="products_page md:flex">

    <div class="menu  sidebar w-[100%] flex grid-justify-start grid-items-center flex-col md:mt-[100px] md-w-[30%] ">
      <ul
        class="bg_orange_primary w-[100%] text-center flex justify-center  flex-row md:flex-col md-w-[80%] overflow-scroll">
        <li class="">
          <a href="#" class="block hover:bg-[#fdd8bf]  p-2 text-nowrap">所有商品</a>
        </li>
        <li class="">
          <a href="#" class="block hover:bg-[#fdd8bf] p-2 text-nowrap">貓貓專區</a>
        </li>
        <li class="">
          <a href="#" class="block hover:bg-[#fdd8bf] p-2 text-nowrap">狗狗專區</a>
        </li>
        <li class="">
          <a href="#" class="block hover:bg-[#fdd8bf] p-2 text-nowrap">凍乾專區</a>
        </li>
        <li class="">
          <a href="#" class="block hover:bg-[#fdd8bf] p-2 text-nowrap">鮮食專區</a>
        </li>
      </ul>
    </div>

    <div class="bg-white">

      <div class="mx-auto max-w-2xl px-4 py-4 md:py-8 lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24">

        <!-- search section -->
        <div class="bg_orange_primary search_section p-4 box-border">
          <a href="#"
            class="box-border mr-[8px] w-[calc(25%-8px)] sm:w-[113px] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50"
            @click="changeSort('star')">最熱銷</a>
          <a href="#"
            class="box-border mr-[8px] w-[calc(25%-8px)] sm:w-[113px]  inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50"
            @click="changeSort('price')">評價最高</a>
          <a href="#"
            class="box-border mr-[8px] w-[calc(25%-8px)] sm:w-[113px]  inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50"
            @click="changeSort('price')">價格</a>
          <a href="#"
            class="box-border mr-[8px] w-[calc(25%-8px)] sm:w-[113px]  inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50"
            @click="changeSort('priupdatedAtce')">時間</a>
            

          <div class="relative w-[100%] sm:w-auto mt-3 sm:mt-0 mt-2w-[226px] inline-flex rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">O</span>
            </div>
            <input id="price" type="text" name="price"
              class="w-[100%] md:w-[226px] inline-flex border-0 rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
              @keydown.enter="updateSearchText()"
              v-model="searchValue.searchText"
              placeholder="搜尋">
          </div>

        </div>
        <!-- products section -->
        <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-8">

          <div v-for="(product, index) in productData" :key="product._id"
            class="group product relative border b-rd-2xl pb-4 pl-2  md:pr-2">
            <div v-if="product.product.imageGallery.length > 0"
              class="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75">
              <img :src="product.product.imageGallery[0].imgUrl.trim()" :alt="product.product.imageGallery[0].altText"
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
                  <a :href="`/product/${product._id}`">
                    {{ product.product.title }}
                  </a>

                </h3>
                <p class="mt-1 text-sm text-gray-500">NT$ {{ product.price }}</p>
              </div>
              <div class="flex flex-col grid-justify-end flex-items-end">
                <div class="flex" v-if="product.product.star > 0">
                  <img v-for="index in Math.floor(product.product.star)" :key="index"
                    src="/assets/img/icon/icon-star.svg" alt="Star">
                  <img v-if="product.product.star % 1 === 0.5" src="/assets/img/icon/icon-star_half.svg" alt="">
                </div>
                <div @click="addToCart(product)">
                  <img src="/assets/img/icon/icon-cart.svg" alt="">
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- page section -->
        <div class="bg_orange_primary search_section p-4">
          <!-- <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> -->
          <div class="flex items-center justify-between px-4 py-3 sm:px-6">
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
              <div class="">
                <!-- {{ pageInfo }} -->
                <nav class="isolate inline-flex rounded-md" aria-label="Pagination">
                  <button
                    type="button"
                    
                    class="relative mr-2 inline-flex items-center rounded-l-md bg-white px-2 py-2 text-black ring-gray-300 ring-inset focus:z-20 bg-gray-50 focus:outline-offset-0"
                    :disabled="pageInfo.nowPage==1"
                    :class="{'button_hover_color': pageInfo.nowPage==1}  "
                    >
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                  
                  <button 
                    type="button" 
                    aria-current="page"
                    v-for="page in pageInfo.totalPages"
                    :key="page"
                    class="relative z-10 mr-2 inline-flex items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline"
                    :disabled="pageInfo.nowPage === page"
                    :class="{'button_hover_color': pageInfo.nowPage === page}  "
                    @click="handlePageChange" 
                    :value=page
                    >

                    {{ page }}
                  </button>

                  <button type="button"
                    class="relative mr-10 inline-flex items-center rounded-r-md bg-white px-2 py-2 text-black ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0"
                    :disabled="pageInfo.nowPage === pageInfo.totalPages"
                    :class="{'button_hover_color': pageInfo.nowPage === pageInfo.totalPages}"
                    @click="handlePageChange" 
                    :value="pageInfo.nowPage"
                    >
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <select id="" class="h-40px w-150px b-rd-1 p-8px text-gray-700" name="" v-model="pageInfo.nowPage" @change="handlePageChange">
                    <option v-for="page in pageInfo.totalPages" :key="page" :value="page">第{{ page }}頁</option>
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
button{
  background-color: white;
}
.button_hover_color{
  background-color: #e5e5e5;

}
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
