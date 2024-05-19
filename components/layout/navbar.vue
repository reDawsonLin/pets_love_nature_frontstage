<script setup>
const isLogin = ref(false);

const route = useRoute();

const login = async (code) => {
  try {
    // const res = await useFetch(
    //   "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/googleSignIn",
    //   {
    //     method: "POST",
    //     params: { code },
    //   }
    // );
    // console.log("res :>> ", res);

    // console.log("useApiFetch :>> ", useApiFetch);

    const res2 = await $fetch(
      "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/googleSignIn",
      {
        method: "POST",
        body: { code },
      }
    );

    console.log("res2 :>> ", res2);


    



  } catch (error) {
    console.log("error :>>", error);
  }
};

onMounted(async () => {
  console.log("route :>> ", route);

  if (route?.query?.code) {
    console.log("in");
    const code = route.query.code;
    await login(code);
  }
});

watchEffect(() => {
  // const urlParams = new URLSearchParams(window?.location.search);
  // console.log("urlParams :>> ", urlParams);
  // const code = urlParams.get("code");
  // console.log("code :>> ", code);
});
</script>

<template>
  <div class="nav_wrapper bg-neutral-800">
    <header
      p="b-1.125rem l-0.75rem r-1rem t-1.75rem"
      class="flex items-center justify-between md:(max-w-1296px mx-auto)"
    >
      <NuxtLink to="/" class="box flex gap-1rem">
        <SvgIcon name="logo_light" class="aspect-32/30 w-2rem" />
        <SvgIcon name="brand_name" class="aspect-120/27 w-7.5rem" />
      </NuxtLink>

      <nav class="flex gap-3rem text-neutral-50">
        <NuxtLink to="/">所有商品</NuxtLink>
        <NuxtLink to="/">關於我們</NuxtLink>
        <NuxtLink to="/">常見問題</NuxtLink>
      </nav>

      <div class="hidden md:(flex gap-1.25rem )">
        <SvgIcon class="w-1.5rem h-1.5rem text-neutral-50 cursor-pointer" name="search" />
        <SvgIcon class="w-1.5rem h-1.5rem text-neutral-50 cursor-pointer" name="cart" />
        <div class="box_account relative">
          <SvgIcon
            class="w-1.5rem h-1.5rem text-neutral-50 cursor-pointer"
            name="account"
          />

          <ul
            class="list_account opacity-0 pointer-events-none z-5 absolute right--0.5rem flex flex-col items-center gap-1rem py-1rem px-1rem text-neutral-600 bg-neutral-50 rounded-0.5rem"
          >
            <!-- after:(content-empty absolute flex border-x-10px border-x-transparent border-b-18px border-b-neutral-50 bottom-100% left-50% translate-x--50%) -->
            <li v-if="!isLogin" class="whitespace-nowrap cursor-pointer">
              <NuxtLink
                to="http://pets-love-nature-backend-n.onrender.com/api/v1/customer/google"
              >
                登入
              </NuxtLink>
            </li>
            <template v-else>
              <li class="whitespace-nowrap cursor-pointer">個人資訊</li>
              <li class="whitespace-nowrap cursor-pointer">訂單記錄</li>
              <li class="whitespace-nowrap cursor-pointer">收藏商品</li>
              <li class="whitespace-nowrap cursor-pointer">聊聊紀錄</li>
              <li class="whitespace-nowrap cursor-pointer">登出</li>
            </template>
          </ul>
        </div>
      </div>

      <div
        class="h-4 w-1.5rem flex cursor-pointer cursor-pointer items-center md:(hidden)"
      >
        <p class="hamburger" />
      </div>
    </header>
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

.box_account {
  &:hover {
    .list_account {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
