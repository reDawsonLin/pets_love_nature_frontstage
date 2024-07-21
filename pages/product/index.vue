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

const pageInfo = ref([]);

if (route.query.searchType) {
  searchValue.value.filterCategory = route.query.searchType;
}

const { data: productData, error } = await useApiFetch("/product/getFilterProductList", {
  params: searchValue.value,
  watch: [searchValue],
});

pageInfo.value = productData.value.data.page;
show_pending.value = false;

const fetchData = async () => {
  try {
    const params = {
      ...searchValue.value,
    };
    const queryString = new URLSearchParams(params).toString();

    const result = await use$Fetch(`/product/getFilterProductList?${queryString}`, {
      method: "GET",
    });

    show_pending.value = false;
    productData.value = result.data.content;
    pageInfo.value = result.data.page;
  } catch (e) {
    show_pending.value = false;

    console.log("err", e);
  }
};

const changeSort = (target) => {
  if (target === searchValue.value.sortBy) {
    if (target === "price" || target === "updatedAt") {
      switch (searchValue.value.sortOrder) {
        case -1:
          searchValue.value.sortOrder = 1;
          break;
        case 1:
          searchValue.value.sortOrder = -1;
          break;
        default:
          searchValue.value.sortOrder = -1;
          break;
      }
      return;
    } else {
      searchValue.value.sortBy = "";
      searchValue.value.sortOrder = -1;
    }

    return;
  }

  searchValue.value.sortBy = target;
  searchValue.value.sortOrder = -1;
};

const changeCategory = async (category) => {
  searchValue.value.filterCategory = category;

  await navigateTo({
    path: "/product",
    query: { searchType: category },
  });
};

const param_search = ref("");
const changeSearch = async () => {
  searchValue.value.searchText = param_search.value;
  await fetchData();
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

const handlePageChange = async (e) => {
  if (e.target.value) {
    searchValue.value.page = e.target.value;
  } else if (e.target.id === "nextPage") {
    searchValue.value.page = parseInt(searchValue.value.page) + 1;
  } else if (e.target.id === "previousPage") {
    searchValue.value.page = parseInt(searchValue.value.page) - 1;
  }
};
</script>

<template>
  <!-- <LoadingPending :show="show_pending" /> -->

  <div
    class="flex flex-col gap-1rem px-1.25rem py-1rem md:(mx-auto max-w-1296px w-100% flex-row)"
  >
    <aside
      class="menu w-100% flex flex-col grid-justify-start grid-items-center md:(max-w-200px)"
    >
      <ul
        class="sidebar w-100% flex flex-row justify-center overflow-y-auto text-center md:(flex-col)"
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

    <div class="md:(flex-grow-1)">
      <!-- search section -->
      <div
        class="flex flex-col gap-1rem bg-second-200 px-1.5rem py-1rem lg:(flex-row rounded-0.5rem)"
      >
        <ul class="list_search flex flex-wrap justify-between gap-1rem lg:(flex-nowrap)">
          <li
            class=""
            :class="{ '!bg-second-400': searchValue.sortBy === 'salesVolume' }"
            @click="changeSort('salesVolume')"
          >
            最熱銷
          </li>
          <li
            class=""
            :class="{ '!bg-second-400': searchValue.sortBy === 'star' }"
            @click="changeSort('star')"
          >
            評價最高
          </li>
          <li
            class=""
            :class="{ '!bg-second-400': searchValue.sortBy === 'price' }"
            @click="changeSort('price')"
          >
            <svg
              v-if="
                (searchValue.sortOrder == -1 && searchValue.sortBy == 'price') ||
                searchValue.sortBy != 'price'
              "
              class="down h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M10 14l-5-5h10l-5 5z" clip-rule="evenodd" />
            </svg>
            <svg
              v-if="searchValue.sortOrder == 1 && searchValue.sortBy == 'price'"
              class="up h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M10 6l5 5H5l5-5z" clip-rule="evenodd" />
            </svg>
            價格
          </li>

          <li
            class=""
            :class="{ '!bg-second-400': searchValue.sortBy === 'updatedAt' }"
            @click="changeSort('updatedAt')"
          >
            <svg
              v-if="
                (searchValue.sortOrder == -1 && searchValue.sortBy == 'updatedAt') ||
                searchValue.sortBy != 'updatedAt'
              "
              class="down h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M10 14l-5-5h10l-5 5z" clip-rule="evenodd" />
            </svg>
            <svg
              v-if="searchValue.sortOrder == 1 && searchValue.sortBy == 'updatedAt'"
              class="up h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M10 6l5 5H5l5-5z" clip-rule="evenodd" />
            </svg>
            時間
          </li>
        </ul>

        <div class="relative w-[100%] shadow-sm lg:(ml-auto w-auto)">
          <input
            v-model="param_search"
            type="text"
            name="price"
            class="w-[100%] flex rounded-0.5rem px-1rem py-0.5rem pr-1.25rem placeholder:text-neutral-400"
            placeholder="搜尋"
            @keydown.enter="changeSearch()"
          >

          <SvgIcon
            name="search"
            class="transition-[width] absolute right-0.5rem top-0.675rem w-1.25rem cursor-pointer hover:(w-1.375rem)"
            @click="changeSearch()"
          />
        </div>
      </div>

      <!-- products section -->
      <ul
        class="grid grid-cols-1 gap-x-1.25rem gap-y-1.5rem py-1.5rem lg:grid-cols-3 sm:grid-cols-2"
      >
        <template v-for="product in productData?.data?.content" :key="product._id">
          <li
            class="product relative flex flex-col overflow-hidden border rounded-0.5rem"
          >
            <NuxtLink
              :to="`/product/${product._id}`"
              class="relative w-full cursor-pointer overflow-hidden rounded-md bg-gray-200"
            >
              <div
                class="img_product"
                :style="`background-image:url(${product.product.imageGallery[0].imgUrl.trim()});`"
              />

              <div class="absolute bottom-2 left-2 w-50px text-center">
                <div class="border-rd-8px bg-[#525252] pl-8px pr-8px text-white">
                  {{ product.weight }}g
                </div>
              </div>
            </NuxtLink>

            <div class="flex flex-grow-1 justify-between p-0.75rem">
              <div>
                <h3 class="text-sm text-gray-700">
                  <NuxtLink :to="`/product/${product._id}`"
                    >{{ product.product.title }}
                  </NuxtLink>
                </h3>

                <p class="mt-1 text-sm text-gray-500">NT$ {{ product.price }}</p>
              </div>

              <div class="flex shrink-0 flex-col grid-justify-end flex-items-end">
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

                <div class="hover-effect mt-2 cursor-pointer" @click="addToCart(product)">
                  <img src="/assets/img/icon/icon-cart.svg" alt="" >
                </div>
              </div>
            </div>
          </li>
        </template>
        <li>
          <p v-show="!productData?.data?.content?.length" class="p-1rem text-neutral-500">
            查無符合資料
          </p>
        </li>
      </ul>

      <!-- page section -->
      <div class="bg_orange_primary search_section p-4">
        <div class="flex items-center justify-between px-4 py-3 sm:px-6">
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div class="">
              <nav class="isolate inline-flex rounded-md" aria-label="Pagination">
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
                  v-for="page in pageInfo?.totalPages"
                  :key="page"
                  type="button"
                  aria-current="page"
                  class="relative z-10 mr-2 inline-flex items-center b-rd-1 bg-white px-4 py-2 text-sm text-gray-900 font-semibold focus:z-20 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline"
                  :disabled="pageInfo?.nowPage === page"
                  :class="{ button_hover_color: pageInfo?.nowPage === page }"
                  :value="page"
                  @click.prevent="handlePageChange"
                >
                  {{ page }}
                </button>

                <button
                  id="nextPage"
                  type="button"
                  class="relative mr-10 inline-flex items-center rounded-r-md bg-white px-2 py-2 text-black ring-gray-300 ring-inset focus:z-20 hover:bg-gray-50 focus:outline-offset-0"
                  :disabled="pageInfo?.nowPage === pageInfo?.totalPages"
                  :class="{
                    button_hover_color: pageInfo?.nowPage === pageInfo?.totalPages,
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

/* ::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
} */

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

.list_search {
  > li {
    @apply flex justify-center items-center rounded-0.5rem bg-white px-1rem py-0.5rem text-1rem text-neutral-600 w-[calc(50%-0.5rem)] cursor-pointer transition-shadow;
    @apply active:(shadow-none);
    @apply hover:(shadow-lg);
    @apply md:(w-auto flex-grow-1);
  }
}

.img_product {
  @apply aspect-1/1 bg-center bg-no-repeat bg-[length:100%_100%];
  @apply hover:(bg-[length:110%_110%] opacity-80);
  transition: background 0.2s ease, opacity 0.2s ease;
}
</style>
