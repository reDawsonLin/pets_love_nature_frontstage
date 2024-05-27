<script setup>
import { storeToRefs } from "pinia";
import { useStoreGeneral } from "~/stores/storeGeneral";
import { useStoreLogin } from "~/stores/storeLogin";

const store_login = useStoreLogin();
const { token } = storeToRefs(store_login);
const { setToken } = store_login;

const store_general = useStoreGeneral();
const { mobileNavShow } = storeToRefs(store_general);
const {} = store_general;

const openMobileNav = () => {
  document.querySelector("body").classList.add("stopScroll");
  mobileNavShow.value = true;
};

const closeMobileNav = () => {
  document.querySelector("body").classList.remove("stopScroll");
  mobileNavShow.value = false;
};

const { width: window_width } = useWindowSize();
const showNavbar = computed(() => {
  if (window_width.value < 768) return mobileNavShow.value;
  else {
    mobileNavShow.value = false;
    return true;
  }
});

watchEffect(() => {});
</script>

<template>
  <div class="nav_wrapper bg-neutral-800">
    <div
      v-if="showNavbar && window_width < 768"
      class="bg_blur absolute inset-0 z-5 bg-neutral-50 opacity-80"
      @click.self="closeMobileNav()"
    />

    <nav
      p="b-1.125rem l-0.75rem r-1rem t-1.75rem md:(x-2.75rem y-2.25rem)"
      class="flex items-center justify-between md:(max-w-1296px mx-auto)"
    >
      <NuxtLink to="/" class="box flex gap-1rem">
        <SvgIcon name="logo_light" class="aspect-32/30 w-2rem" />
        <SvgIcon name="brand_name" class="aspect-120/27 w-7.5rem" />
      </NuxtLink>

      <div
        v-if="showNavbar"
        class="absolute z-6 w-375px min-h-568px right-0 top-0 bg-second-200 rounded-1rem text-1.25rem flex flex-col gap-1rem pt-1.75rem pb-2rem md:( relative flex-row w-unset min-h-unset bg-transparent text-neutral-50 flex-grow-1 pt-unset pb-unset)"
      >
        <div class="px-1.5rem flex justify-end md:(hidden)">
          <SvgIcon name="close" class="w-2rem cursor-pointer" @click="closeMobileNav()" />
        </div>

        <ul
          class="flex flex-col gap-1rem px-2.25rem md:(flex-row gap-3rem px-unset flex-grow-1 justify-end items-center)"
        >
          <li class="">
            <NuxtLink :to="{ name: 'product' }">所有商品</NuxtLink>
          </li>
          <li class="">
            <NuxtLink :to="{ name: 'about' }">關於我們</NuxtLink>
          </li>
          <li class="">
            <NuxtLink :to="{ name: 'frequently-questions' }">常見問題</NuxtLink>
          </li>
        </ul>

        <ul
          class="flex flex-col gap-1rem px-2.25rem mb-0.5rem flex-grow-1 md:(flex-row gap-1.25rem px-unset mb-unset flex-grow-1 justify-end items-center)"
        >
          <li class="wrapper_icon md:(order-2 relative)">
            <NuxtLink
              :to="token ? { name: 'shopping-cart' } : null"
              class="flex gap-0.5rem"
            >
              <SvgIcon
                class="w-1.5rem h-1.5rem cursor-pointer md:(w-2rem h-2rem)"
                name="cart"
              />

              <p class="md:(hidden)">購物車</p>
            </NuxtLink>

            <div
              class="list_content hidden md:(flex flex-col gap-1.5rem px-1.5rem py-1rem absolute top-100% left-50% translate-x--50% bg-neutral-50 text-neutral-600 rounded-0.5rem w-200px)"
            >
              <p class="whitespace-nowrap">最近加入商品</p>

              <ul class="flex flex-col gap-0.5rem flex-grow-1">
                <template v-for="item in 3" :key="item">
                  <li class="flex gap-0.25rem items-center w-100%">
                    <img
                      class="w-1.75rem h-1.75rem"
                      src="@/assets/img/dm_cart_product.png"
                      alt="product image"
                    />
                    <p class="flex-nowrap text-0.875rem">鮮嫩雞肉凍乾</p>
                    <p class="text-0.75rem font-bold text-rose-500 ml-auto">$300</p>
                  </li>
                </template>

                <li class="mt-0.5rem text-neutral-400 text-0.75rem">10件商品未展示</li>
              </ul>

              <NuxtLink
                :to="{ name: 'shopping-cart' }"
                class="flex justify-center items-center text-0.75rem p-0.5rem w-100% bg-rose-500 text-white rounded-5rem"
                >查看購物車</NuxtLink
              >
            </div>
          </li>

          <li class="wrapper_icon md:(order-3 relative)">
            <div class="flex gap-0.5rem mb-0.75rem md:(mb-unset)">
              <SvgIcon
                class="w-1.5rem h-1.5rem md:(w-2rem h-2rem cursor-pointer)"
                name="account"
              />
              <p class="md:(hidden)">會員中心</p>
            </div>

            <ul
              class="list_content flex flex-col gap-0.75rem px-2rem text-1rem md:( absolute top-100% left-50% translate-x--50% bg-neutral-50 text-neutral-600 px-1.5rem py-1rem rounded-0.5rem )"
            >
              <li v-if="!token" class="whitespace-nowrap">
                <NuxtLink to="/Login"> 登入 </NuxtLink>
              </li>

              <template v-else>
                <li class="whitespace-nowrap cursor-pointer">
                  <NuxtLink :to="{ name: 'member' }"> 個人資訊 </NuxtLink>
                </li>
                <li class="whitespace-nowrap cursor-pointer">訂單記錄</li>
                <li class="whitespace-nowrap cursor-pointer">收藏商品</li>
                <li class="whitespace-nowrap cursor-pointer">聊聊紀錄</li>
                <li class="whitespace-nowrap cursor-pointer" @click="setToken(null)">
                  登出
                </li>
              </template>
            </ul>
          </li>

          <li class="wrapper_search mt-auto md:(mt-unset order-1 )">
            <label class="box_search flex relative md:()">
              <input
                name="search-bar"
                type="text"
                placeholder="請輸入關鍵字..."
                class="search w-100% pl-1rem pr-3.5rem py-0.75rem text-1rem bg-neutral-50 rounded-5rem line-clamp-1 focus:(outline-neutral-400 outline-2px) md:(bg-second-400 text-neutral-600)"
              />

              <SvgIcon
                class="absolute right-1rem top-50% translate-y--50% w-1.5rem h-1.5rem md:(w-2rem h-2rem right-0)"
                name="search"
              />
            </label>
          </li>
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
        opacity: 1;
        pointer-events: all;
      }

      :deep(.icon_box) {
        right: 1rem;
        color: #525252;
      }
    }

    .search {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
  }
}
</style>
