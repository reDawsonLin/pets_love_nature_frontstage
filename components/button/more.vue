<script setup>
defineProps({
  content: {
    type: String,
    default: "",
  },
  routeUrl: {
    type: Object,
    default() {
      return { name: "index" };
    },
  },
  bgColor: {
    type: String,
    default: "bg-transparent",
  },
});
</script>

<template>
  <!-- <pre>{{ routeUrl }}</pre> -->
  <NuxtLink :to="routeUrl" class="group relative mx-auto h-3rem w-233px flex">
    <p
      class="absolute left-0 top-50% z-3 h-100% flex translate-y--50% items-center pr-1rem transition-left"
      :class="bgColor"
      group-hover:left-3.5rem
    >
      {{ content }}
    </p>

    <div class="absolute right-0 top-50% flex translate-y--50%">
      <SvgIcon name="arrow_dash" class="relative right-1.25rem z-2" />
      <span
        class="absolute right-0 top-0 z-1 h-3rem w-3rem translate-y--40% rounded-50% bg-second-400"
        group-hover:animate-pulse
      />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
