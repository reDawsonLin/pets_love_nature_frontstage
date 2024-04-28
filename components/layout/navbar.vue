<script setup></script>

<template>
  <div class="nav_wrapper">
    <header
      class="flex items-center justify-between bg-neutral-800 pb-[1.125rem] pl-3 pr-4 pt-[1.75rem]"
    >
      <NuxtLink to="/" class="box flex gap-[1rem]">
        <Icons name="logo_light" class="aspect-[32/30] w-[2rem]" />
        <Icons name="brand_name" class="aspect-[120/27] w-[7.5rem]" />
      </NuxtLink>

      <div class="box flex items-center h-4 w-6 cursor-pointer">
        <p
          class="hamburger h-[2px] w-6 rounded-lg bg-neutral-50 before:relative before:top-2 before:flex before:h-[2px] before:w-6 before:rounded-lg before:bg-neutral-50 before:content-[''] after:relative after:bottom-2.5 after:flex after:h-[2px] after:w-6 after:rounded-lg after:bg-neutral-50 after:content-['']"
        />
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>


</style>
