<script setup>
import { storeToRefs } from "pinia";
import { useStoreCart } from "~/stores/storeCart";
import { useStoreLogin } from "~/stores/storeLogin";

const storeCart = useStoreCart();
const { cartArr, threeCart } = storeToRefs(storeCart);
const { getTransformCartArray } = storeCart;

onMounted(() => {
  getTransformCartArray();
});

const store_login = useStoreLogin();
const { token } = storeToRefs(store_login);
const { setToken } = store_login;
const redDotNum = computed(() =>
  cartArr.value?.length <= 9 ? cartArr.value?.length : "9+"
);

const openMobileNav = () => {
  document.querySelector("body").classList.add("stopScroll");
  mobileNavShow.value = true;
};

const closeMobileNav = () => {
  document.querySelector("body").classList.remove("stopScroll");
  mobileNavShow.value = false;
};

const mobileNavShow = ref(false);

const { width: window_width } = useWindowSize();
watchEffect(() => {
  if (window_width.value > 768 && mobileNavShow.value) {
    closeMobileNav();
  }
});

// ---
const route = useRoute();
const id_customer = useCookie("id_customer");
const logout = () => {
  id_customer.value = null;
  setToken(null);
  closeMobileNav();
  threeCart.value = [];
  cartArr.value = [];
  sessionStorage.removeItem("shoppingCartNoLogin");

  if (route.name !== "index") navigateTo({ path: "/" });
};
</script>

<template>
  <div class="nav_wrapper bg-neutral-800">
    <div
      v-if="mobileNavShow"
      class="bg_blur absolute inset-0 z-5 bg-neutral-50 opacity-80 md:(hidden)"
      @click.self="closeMobileNav()"
    />

    <nav
      p="b-1.125rem l-0.75rem r-1rem t-1.75rem md:(x-2.75rem y-2.25rem)"
      class="flex items-center justify-between md:(mx-auto max-w-1296px)"
    >
      <NuxtLink to="/" class="box flex gap-1rem">
        <SvgIcon name="logo_light" class="aspect-32/30 w-2rem" />
        <SvgIcon name="brand_name" class="aspect-120/27 w-7.5rem" />
      </NuxtLink>

      <div
        :class="{ flex: mobileNavShow }"
        class="absolute right-0 top-0 z-6 hidden h-100% max-w-375px flex-col gap-1rem rounded-l-1rem bg-second-200 pb-2.5rem pt-1.75rem text-1.25rem md:(relative max-w-unset min-h-unset w-unset flex flex-grow-1 flex-row bg-transparent pb-unset pt-unset text-neutral-50)"
      >
        <div class="flex justify-end px-1.5rem md:(hidden)">
          <SvgIcon name="close" class="w-2rem cursor-pointer" @click="closeMobileNav()" />
        </div>

        <ul
          class="nav_top flex flex-col gap-1rem px-2.25rem md:(flex-grow-1 flex-row items-center justify-end gap-3rem px-unset)"
        >
          <li class="">
            <NuxtLink :to="{ name: 'product' }" @click="closeMobileNav()"
              >所有商品</NuxtLink
            >
          </li>
          <li class="">
            <NuxtLink :to="{ name: 'about' }" @click="closeMobileNav()"
              >關於我們</NuxtLink
            >
          </li>
          <li class="">
            <NuxtLink :to="{ name: 'frequently-questions' }" @click="closeMobileNav()"
              >常見問題</NuxtLink
            >
          </li>
        </ul>

        <ul
          class="mb-0.5rem flex flex-grow-1 flex-col gap-1rem px-2.25rem md:(mb-unset flex-grow-1 flex-row items-center justify-end gap-1.25rem px-unset)"
        >
          <li class="wrapper_icon md:(relative order-2)">
            <NuxtLink
              :to="{ name: 'shopping-cart' }"
              class="relative flex gap-0.5rem"
              @click="closeMobileNav()"
            >
              <SvgIcon
                class="h-1.5rem w-1.5rem cursor-pointer md:(h-2rem w-2rem)"
                name="cart"
              />

              <p class="md:(hidden)">購物車</p>
              <div
                v-show="!!redDotNum"
                class="red_dot2 absolute left-[70%] h-7 w-7 flex items-center justify-center rounded-full bg-red-500 p-[3px] text-[16px] text-white md:(hidden)"
              >
                {{ redDotNum }}
              </div>
            </NuxtLink>

            <!-- 購物車內容 -->
            <div
              class="list_content hidden md:(absolute left-50% top-100% w-200px flex flex-col translate-x--50% gap-1.5rem rounded-0.5rem bg-neutral-50 px-1.5rem py-1rem text-neutral-600)"
            >
              <p class="whitespace-nowrap">最近加入商品</p>

              <ul class="flex flex-grow-1 flex-col gap-0.5rem">
                <template v-for="eachProduct in threeCart" :key="eachProduct?._id">
                  <li class="w-100% flex items-center gap-0.25rem">
                    <img
                      class="h-1.75rem w-1.75rem"
                      :src="eachProduct?.imageGallery[0]?.imgUrl"
                      alt="product image"
                    >
                    <p class="flex-nowrap text-0.875rem">
                      {{ eachProduct?.title + eachProduct?.weight }}g
                    </p>
                    <p class="ml-auto text-0.75rem text-rose-500 font-bold">
                      ${{ eachProduct?.price }}
                    </p>
                  </li>
                </template>

                <li
                  v-show="cartArr?.length > 3"
                  class="mt-0.5rem text-0.75rem text-neutral-400"
                >
                  {{ cartArr?.length - 3 }}件商品未展示
                </li>
              </ul>

              <NuxtLink
                :to="{ name: 'shopping-cart' }"
                class="w-100% flex items-center justify-center rounded-5rem bg-rose-500 p-0.5rem text-0.75rem text-white"
                >查看購物車</NuxtLink
              >
            </div>

            <!-- 紅色點點 -->
            <p
              v-show="!!redDotNum"
              class="red_dot absolute left-[60%] top-[-40%] h-1.5rem w-1.5rem flex items-center justify-center rounded-full bg-red-500 pb-3px pr-1px text-1rem"
            >
              {{ redDotNum }}
            </p>
          </li>

          <li class="wrapper_icon md:(relative order-3)">
            <div class="mb-0.75rem flex gap-0.5rem md:(mb-unset)">
              <SvgIcon
                class="h-1.5rem w-1.5rem md:(h-2rem w-2rem cursor-pointer)"
                name="account"
              />
              <p class="md:(hidden)">會員中心</p>
            </div>

            <ul
              class="list_content flex flex-col gap-0.75rem px-2rem text-1rem md:(absolute left-50% top-100% translate-x--50% rounded-0.5rem bg-neutral-50 px-1.5rem py-1rem text-neutral-600)"
            >
              <li v-if="!token" class="whitespace-nowrap" @click="closeMobileNav()">
                <NuxtLink to="/Login"> 登入 </NuxtLink>
              </li>

              <template v-else>
                <li class="cursor-pointer whitespace-nowrap" @click="closeMobileNav()">
                  <NuxtLink :to="{ name: 'member' }"> 個人資訊 </NuxtLink>
                </li>
                <li class="cursor-pointer whitespace-nowrap" @click="closeMobileNav()">
                  <NuxtLink :to="{ name: 'order-list' }"> 訂單記錄 </NuxtLink>
                </li>
                <!-- <li class="cursor-pointer whitespace-nowrap" @click="closeMobileNav()">
                  收藏商品
                </li>
                <li class="cursor-pointer whitespace-nowrap" @click="closeMobileNav()">
                  聊聊紀錄
                </li> -->
                <li class="cursor-pointer whitespace-nowrap" @click="logout()">登出</li>
              </template>
            </ul>
          </li>

          <!-- <li class="wrapper_search mt-auto md:(order-1 mt-unset)">
            <label class="box_search md:() relative flex">
              <input
                name="search-bar"
                type="text"
                placeholder="請輸入關鍵字..."
                class="search line-clamp-1 w-100% rounded-5rem bg-neutral-50 py-0.75rem pl-1rem pr-3.5rem text-1rem md:(bg-second-400 text-neutral-600) focus:(outline-2px outline-neutral-400)"
              >

              <SvgIcon
                class="absolute right-1rem top-50% h-1.5rem w-1.5rem translate-y--50% md:(right-0 h-2rem w-2rem)"
                name="search"
              />
            </label>
          </li> -->
        </ul>

        <ul class="flex gap-1.5rem px-2.25rem md:(hidden)">
          <li class="">
            <NuxtLink to="/">
              <SvgIcon name="facebook" class="h-2rem w-2rem" />
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="/">
              <SvgIcon name="instagram" class="h-2rem w-2rem" />
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="/">
              <SvgIcon name="shopee" class="h-2rem w-2rem" />
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div
        class="h-4 w-1.5rem flex cursor-pointer cursor-pointer items-center md:(hidden)"
        @click="openMobileNav()"
      >
        <p class="hamburger" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.hamburger {
  &,
  &::before,
  &::after {
    @apply flex h-2px w-1.5rem rounded-lg  relative bg-neutral-50;
  }

  &::before {
    @apply top-2 content-[''] absolute;
  }

  &::after {
    @apply bottom-2 content-['']  absolute;
  }
}

.wrapper_icon {
  @media (min-width: 768px) {
    &:hover {
      .list_content {
        opacity: 1;
        pointer-events: all;
      }
    }

    .list_content {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
  }
}

.wrapper_search {
  @media (min-width: 768px) {
    &:hover {
      .search {
        width: 100%;
        padding: 0.75rem 3.5rem 0.5rem 1rem;
        opacity: 1;
        pointer-events: all;
      }

      :deep(.icon_box) {
        right: 1rem;
        color: #525252;
      }
    }

    .search {
      width: 0;
      padding: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
  }
}

.nav_top {
  > li {
    @apply transition-opacity hover:(opacity-90);

    .router-link-active {
      @apply text-rose-400 font-700;
    }
  }
}
</style>
