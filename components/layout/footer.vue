<script setup>
import SvgIcon from "../svgIcon.vue";
</script>

<template>
  <footer
    class="rounded-t-1rem bg-neutral-800 p-1.5rem text-neutral-50 md:(px-3.5rem py-2.5rem)"
  >
    <div class="mx-auto flex flex-col items-center md:(max-w-1296px flex-row)">
      <section
        class="mb-3rem flex flex-col items-center gap-1.5rem md:(mb-0 flex-grow-1 items-start)"
      >
        <div class="flex flex-col items-center gap-1.5rem md:(flex-row gap-2rem)">
          <SvgIcon name="logo_light" class="w-4.5rem" />
          <SvgIcon name="brand_name" class="w-12.5rem" />
        </div>

        <div class="text-1.25rem">
          <ul
            class="mb-0.75rem w-207px flex flex-wrap gap-1.5rem md:(w-auto items-center)"
          >
            <li class=""><NuxtLink to="/">關於我們</NuxtLink></li>
            <b
              class="hidden h-2px w-36px border border-neutral-50 border-dashed md:(flex)"
            />
            <li class=""><NuxtLink to="/">使用者條款</NuxtLink></li>
            <b
              class="hidden h-2px w-36px border border-neutral-50 border-dashed md:(flex)"
            />
            <li class=""><NuxtLink to="/">隱私權政策</NuxtLink></li>
            <b
              class="hidden h-2px w-36px border border-neutral-50 border-dashed md:(flex)"
            />
            <li class=""><NuxtLink to="/">常見問題</NuxtLink></li>
          </ul>
        </div>
      </section>

      <section
        class="w-100% flex flex-col border rounded-1rem bg-neutral-50 p-2rem md:(w-416px)"
      >
        <ul class="mb-1.5rem flex gap-1.5rem text-neutral-800">
          <li class="">
            <NuxtLink to="/">
              <img
                src="@/assets/img/social-facebook.webp"
                alt="facebook logo"
                class="w-2rem rounded-0.5rem"
              >
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="https://www.instagram.com/mr.d.pets/">
              <img
                src="@/assets/img/social-instagram.webp"
                alt="instagram logo"
                class="w-2rem rounded-0.5rem"
              >
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink
              to="https://shopee.tw/m10805109?categoryId=100631&entryPoint=ShopByPDP&itemId=22544237464"
            >
            <img
                src="@/assets/img/social-shoppee.png"
                alt="shoppee logo"
                class="w-2rem"
              >
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink to="https://www.pinkoi.com/store/mr-d-pets">

              <img
                src="@/assets/img/social-pinkoi.png"
                alt="pinkoi logo"
                class="w-2rem"
              >
            </NuxtLink>
          </li>
        </ul>

        <p class="text-14px text-neutral-600">參考資料來源：德老爺店舖</p>
        <p class="text-14px text-neutral-600">Hex School 北十一組 專題使用</p>
      </section>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
