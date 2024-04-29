<script setup></script>

<template>
  <div class="nav_wrapper">
    <header
      p="b-1.125rem l-0.75rem r-1rem t-1.75rem"
      class="flex items-center justify-between bg-neutral-800"
    >
      <NuxtLink to="/" class="box flex gap-1rem">
        <SvgIcon name="logo_light" class="aspect-32/30 w-2rem" />
        <SvgIcon name="brand_name" class="aspect-120/27 w-7.5rem" />
        <!-- <SvgIcon name="logo_light" class="aspect-[32/30] w-[2rem]" />
        <SvgIcon name="brand_name" class="aspect-[120/27] w-[7.5rem]" /> -->
      </NuxtLink>

      <div class="h-4 w-1.5rem flex cursor-pointer items-center">
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
    @apply relative flex h-2px w-1.5rem rounded-lg bg-neutral-50;
  }

  &::before {
    @apply top-2 content-[''] absolute;
  }

  &::after {
    @apply bottom-2 content-['']  absolute;
  }
}
</style>
