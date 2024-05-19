<script setup>
import SvgIcon from "../svgIcon.vue";
</script>

<template>
  <footer
    class="rounded-t-1rem bg-neutral-800 p-1.5rem text-neutral-50 md:(pb-6rem pt-5rem)"
  >

  <div class="mx-auto flex flex-col items-center md:(max-w-1296px flex-row)">
    <section class="mb-3rem flex flex-col items-center gap-1.5rem md:(mb-0 flex-grow-1 items-start)">
      <div class="flex flex-col items-center gap-1.5rem md:(flex-row gap-2rem)">
        <SvgIcon name="logo_light" class="w-4.5rem" />
        <SvgIcon name="brand_name" class="w-12.5rem" />
      </div>

      <div class="text-1.25rem">
        <ul class="mb-0.75rem w-207px flex flex-wrap gap-1.5rem md:(w-auto items-center)">
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

    <section class="w-100% flex flex-col border rounded-1rem bg-neutral-50 p-2rem md:(w-416px)">
      <ul class="mb-1.5rem flex gap-1.5rem text-neutral-800">
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

      <p class="text-14px text-neutral-600">參考資料來源：德老爺店舖</p>
      <p class="text-14px text-neutral-600">Hex School 北十一組 專題使用</p>
    </section>
  </div>
  </footer>
</template>

<style lang="scss" scoped></style>
