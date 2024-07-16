<script setup>
import { useRoute } from "vue-router";
import { useStoreCart } from "~/stores/storeCart";

const route = useRoute();

const storeCart = useStoreCart();
const { addCart } = storeCart;

const show_pending = ref(true);

const searchValue = ref({
  onlineStatus: true,
  searchText: "",
  filterCategory: "",
  sortOrder: -1,
  sortBy: "",
  page: 1,
  limit: 12,
  dbclick: false,
});

// const productData = ref([]);
const pageInfo = ref([]);

// if (import.meta.client) {
//   console.log("client");
//   if (route.query.searchType) {
//     searchValue.value.filterCategory = route.query.searchType;
//   }
// }

console.log("route.query.searchType :>> ", route.query.searchType);
if (route.query.searchType) {
  console.log("route.query.searchType :>> ", route.query.searchType);
  searchValue.value.filterCategory = route.query.searchType;
}

const { data: productData, error } = await useApiFetch(
  "/product/getFilterProductList",
  {
    params: searchValue.value,
    watch: [searchValue],
  }
);

// console.log("productData.value", productData.value);
// productData.value = res.data.content;
// pageInfo.value = res.data.page;
show_pending.value = false;

watchEffect(() => {
  // console.log("route :>> ", route);
  console.log("searchValue.value :>> ", searchValue.value);
  console.log("productData.value", productData.value);
});

const fetchData = async () => {
  try {
    const params = {
      ...searchValue.value,
    };
    const queryString = new URLSearchParams(params).toString();

    const result = await use$Fetch(
      `/product/getFilterProductList?${queryString}`,
      {
        method: "GET",
      }
    );

    show_pending.value = false;
    productData.value = result.data.content;
    pageInfo.value = result.data.page;

    console.log("成功得到產品資訊", result.data);
  } catch (e) {
    show_pending.value = false;

    console.log(e.message);
    console.log("err", e);
  }
};

const changeSort = (sortValue) => {
  if (sortValue == searchValue.value.sortBy) {
    searchValue.value.dbclick = true;
    changeOrder();
    return;
  } else {
    searchValue.value.dbclick = false;
  }
  searchValue.value.sortBy = sortValue;
  fetchData();
};

const changeCategory = (category) => {
  searchValue.value.filterCategory = category;
  route.query.searchType = category;

  // fetchData();
};

const updateFetchData = () => {
  fetchData();
};

const addToCart = async (product) => {
  const obj = {
    productSpec: product._id,
    quantity: 1,
    inStock: product.inStock,
  };
  const arr = [obj];
  await addCart(arr, 0);
};

const changeOrder = () => {
  if (searchValue.value.dbclick === true) {
    if (searchValue.value.sortOrder == -1) {
      searchValue.value.sortOrder = 1;
    } else {
      searchValue.value.sortOrder = -1;
    }

    fetchData();
  }
  console.log("changeOrder", searchValue.value.sortOrder);
};

const handlePageChange = async (e) => {
  if (e.target.value) {
    searchValue.value.page = e.target.value;
  } else if (e.target.id === "nextPage") {
    searchValue.value.page = parseInt(searchValue.value.page) + 1;
  } else if (e.target.id === "previousPage") {
    searchValue.value.page = parseInt(searchValue.value.page) - 1;
  }
  fetchData();
};

onMounted(async () => {
  // if (route.query.searchType) {
  //   console.log("Search type", route.query.searchType);
  //   await changeCategory(route.query.searchType);
  // }
  // fetchData();
});
</script>

<template>
  <LoadingPending :show="show_pending" />

  <div class="products_page md:(mx-auto max-w-1296px flex)">
    <aside
      class="menu w-[100%] flex flex-col grid-justify-start grid-items-center md:mt-[32px] md-w-[30%]"
    >
      <ul
        class="sidebar w-[100%] flex flex-row justify-center overflow-y-auto text-center md-w-[80%] md:flex-col"
      >
        <li
          :class="{ active: searchValue.filterCategory === '' }"
          @click="changeCategory('')"
        >
          所有商品
        </li>
        <li
          :class="{ active: searchValue.filterCategory === 'cat' }"
          @click="changeCategory('cat')"
        >
          貓貓專區
        </li>
        <li
          :class="{ active: searchValue.filterCategory === 'dog' }"
          @click="changeCategory('dog')"
        >
          狗狗專區
        </li>
        <li
          :class="{ active: searchValue.filterCategory === 'dry' }"
          @click="changeCategory('dry')"
        >
          凍乾專區
        </li>
        <li
          :class="{ active: searchValue.filterCategory === 'fresh' }"
          @click="changeCategory('fresh')"
        >
          鮮食專區
        </li>
      </ul>
    </aside>

    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-4 lg:max-w-7xl lg:px-8 md:py-8 sm:px-6 sm:py-24"
      >
        <!-- search section -->
        <div class="bg_orange_primary search_section box-border p-4">
          <div class="w-[100%] flex inline-flex sm:w-[auto]">
            <a
              href="#"
              class="mr-[8px] box-border w-[calc(25%-8px)] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-[113px] sm:w-auto hover:bg-gray-50"
              :class="{ active: searchValue.sortBy === 'salesVolume' }"
              @click.prevent="changeSort('salesVolume')"
              >最熱銷</a
            >
            <a
              href="#"
              class="mr-[8px] box-border w-[calc(25%-8px)] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-[113px] sm:w-auto hover:bg-gray-50"
              :class="{ active: searchValue.sortBy === 'star' }"
              @click.prevent="changeSort('star')"
              >評價最高</a
            >
            <a
              href="#"
              class="mr-[8px] box-border w-[calc(25%-8px)] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-[113px] sm:w-auto hover:bg-gray-50"
              :class="{ active: searchValue.sortBy === 'price' }"
              @click.prevent="changeSort('price')"
            >
              <svg
                v-if="
                  (searchValue.sortOrder == -1 &&
                    searchValue.sortBy == 'price') ||
                  searchValue.sortBy != 'price'
                "
                class="down h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 14l-5-5h10l-5 5z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-if="
                  searchValue.sortOrder == 1 && searchValue.sortBy == 'price'
                "
                class="up h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 6l5 5H5l5-5z"
                  clip-rule="evenodd"
                />
              </svg>
              價格</a
            >

            <a
              href="#"
              class="mr-[8px] box-border w-[calc(25%-8px)] inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-gray-300 ring-inset sm:mt-0 sm:w-[113px] sm:w-auto hover:bg-gray-50"
              :class="{ active: searchValue.sortBy === 'updatedAt' }"
              @click.prevent="changeSort('updatedAt')"
            >
              <svg
                v-if="
                  (searchValue.sortOrder == -1 &&
                    searchValue.sortBy == 'updatedAt') ||
                  searchValue.sortBy != 'updatedAt'
                "
                class="down h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 14l-5-5h10l-5 5z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-if="
                  searchValue.sortOrder == 1 &&
                  searchValue.sortBy == 'updatedAt'
                "
                class="up h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 6l5 5H5l5-5z"
                  clip-rule="evenodd"
                />
              </svg>
              時間</a
            >
          </div>
          <div
            class="mt-2w-[226px] relative mt-3 w-[100%] inline-flex rounded-md shadow-sm sm:mt-0 sm:w-auto"
          >
            <div
              class="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3"
            >
              <img class="w-20px" src="/assets/img/icon/search.svg" alt="" />
            </div>
            <input
              id="price"
              v-model="searchValue.searchText"
              type="text"
              name="price"
              class="w-[100%] inline-flex border-0 rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 ring-inset md:w-[226px] sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
              placeholder="搜尋"
              @keydown.enter="updateFetchData()"
            />
          </div>
        </div>

        <!-- products section -->
        <ul
          class="grid grid-cols-1 mb-[36px] mt-6 gap-x-6 gap-y-10 lg:grid-cols-3 sm:grid-cols-2 xl:gap-x-8"
        >
          <template
            v-for="product in productData.data.content"
            :key="product._id"
          >
            <li
              class="group product relative overflow-hidden border rounded-0.5rem pb-4"
            >
              <NuxtLink
                :to="`/product/${product._id}`"
                class="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full cursor-pointer overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75"
              >
                <img
                  :src="product.product.imageGallery[0].imgUrl.trim()"
                  :alt="product.product.imageGallery[0].altText"
                  class="h-[300px] h-full w-full object-cover object-center"
                />

                <div class="absolute bottom-2 left-2 w-50px text-center">
                  <div
                    class="border-rd-8px bg-[#525252] pl-8px pr-8px text-white"
                  >
                    {{ product.weight }}g
                  </div>
                </div>
              </NuxtLink>

              <div class="mt-4 flex justify-between pl-2 pr-2">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <NuxtLink :to="`/product/${product._id}`"
                      >{{ product.product.title }}
                    </NuxtLink>
                  </h3>

                  <p class="mt-1 text-sm text-gray-500">
                    NT$ {{ product.price }}
                  </p>
                </div>

                <div
                  class="flex shrink-0 flex-col grid-justify-end flex-items-end"
                >
                  <div v-if="product.product.star > 0" class="flex">
                    <img
                      v-for="index in Math.floor(product.product.star)"
                      :key="index"
                      src="/assets/img/icon/icon-star.svg"
                      alt="Star"
                    />
                    <img
                      v-if="product.product.star % 1 === 0.5"
                      src="/assets/img/icon/icon-star_half.svg"
                      alt=""
                    />
                  </div>

                  <div
                    class="hover-effect mt-2 cursor-pointer"
                    @click="addToCart(product)"
                  >
                    <img src="/assets/img/icon/icon-cart.svg" alt="" />
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>

        <!-- page section -->
        <div class="bg_orange_primary search_section p-4">
          <!-- <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> -->
          <div class="flex items-center justify-between px-4 py-3 sm:px-6">
            <div
              class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center"
            >
              <div class="">
                <nav
                  class="isolate inline-flex rounded-md"
                  aria-label="Pagination"
                >
                  <button
                    id="previousPage"
                    type="button"
                    class="relative mr-2 inline-flex items-center rounded-l-md bg-gray-50 bg-white px-2 py-2 text-black ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
                    :disabled="pageInfo?.nowPage == 1"
                    :class="{ button_hover_color: pageInfo?.nowPage == 1 }"
                    @click.prevent="handlePageChange"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  <button
                    v-for="page in pageInfo.totalPages"
                    :key="page"
                    type="button"
                    aria-current="page"
                    class="relative z-10 mr-2 inline-flex items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 font-semibold focus:z-20 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline"
                    :disabled="pageInfo.nowPage === page"
                    :class="{ button_hover_color: pageInfo.nowPage === page }"
                    :value="page"
                    @click.prevent="handlePageChange"
                  >
                    {{ page }}
                  </button>

                  <button
                    id="nextPage"
                    type="button"
                    class="relative mr-10 inline-flex items-center rounded-r-md bg-white px-2 py-2 text-black ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0"
                    :disabled="pageInfo.nowPage === pageInfo.totalPages"
                    :class="{
                      button_hover_color:
                        pageInfo.nowPage === pageInfo.totalPages,
                    }"
                    @click.prevent="handlePageChange"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <select
                    id=""
                    v-model="searchValue.limit"
                    class="h-40px w-150px b-rd-1 p-8px text-gray-700"
                    name=""
                    @change="updateFetchData"
                  >
                    <option value="12">12筆/頁</option>
                    <option value="24">24筆/頁</option>
                    <option value="36">36筆/頁</option>
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
button {
  background-color: white;
}
.button_hover_color {
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
svg {
  pointer-events: none;
}

.hover-effect img {
  transition: transform 0.3s ease;
}

.hover-effect img:hover {
  transform: scale(1.1);
  filter: brightness(0.8);
}
/* .active a {
  background-color: #f9d4bc;
}
.active {
  background-color: #d1d5db;
} */

::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

body {
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

/* ------- */
.sidebar {
  > li {
    @apply block p-0.5rem text-nowrap bg-second-200 cursor-pointer;
    @apply hover:(bg-second-400);

    &.active {
      @apply bg-second-400;
    }
  }
}
</style>
