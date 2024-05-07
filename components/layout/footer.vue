<script setup>
import SvgIcon from "../svgIcon.vue";
</script>

<template>
  <footer
    class="bg-neutral-800 rounded-t-1rem p-1.5rem flex flex-col items-center text-neutral-50"
  >
    <SvgIcon name="logo_light" class="w-4.75rem mb-1.5rem" />
    <SvgIcon name="brand_name" class="w-12.5rem mb-1.5rem" />

    <div class="mb-3rem">
      <ul class="flex gap-1.5rem mb-0.75rem">
        <li class=""><NuxtLink to="/">關於我們</NuxtLink></li>
        <li class=""><NuxtLink to="/">使用者條款</NuxtLink></li>
      </ul>

      <ul class="flex gap-1.5rem">
        <li class=""><NuxtLink to="/">隱私權政策</NuxtLink></li>
        <li class=""><NuxtLink to="/">常見問題</NuxtLink></li>
      </ul>
    </div>

    <div class="">
      <ul class="">
        <li class="">
          
          <NuxtLink to="/">
            <SvgIcon name="facebook" />
          </NuxtLink>
          
        </li>
        <li class="">
          
          <NuxtLink>
          
          <SvgIcon name="instagram" /></li>
        <li class="">
          
          <NuxtLink>
          
          <SvgIcon name="shopee" /></li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
