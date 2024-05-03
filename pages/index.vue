<script setup>
const dummy_banner = [
  {
    id: 1,
    imgUrl: "/img/banner/1.webp",
    routeLink: "",
    title: "原型鮮食 頂級饗宴",
    subtitle: "全人食等級，寵物鮮食新選擇",
  },
  {
    id: 2,
    imgUrl: "/img/banner/2.webp",
    routeLink: "",
    title: "全人食級 寵愛每口",
    subtitle: "原塊肉品，天然凍乾，保留原味原香",
  },
  {
    id: 3,
    imgUrl: "/img/banner/3.webp",
    routeLink: "",
    title: "毛孩美食 享食天然",
    subtitle: "鮮食無負擔，原型肉品無添加，寵愛無疆界",
  },
  {
    id: 4,
    imgUrl: "/img/banner/1.webp",
    routeLink: "",
    title: "原型鮮食 頂級饗宴",
    subtitle: "全人食等級，寵物鮮食新選擇",
  },
  {
    id: 5,
    imgUrl: "/img/banner/2.webp",
    routeLink: "",
    title: "全人食級 寵愛每口",
    subtitle: "原塊肉品，天然凍乾，保留原味原香",
  },
  {
    id: 6,
    imgUrl: "/img/banner/3.webp",
    routeLink: "",
    title: "毛孩美食 享食天然",
    subtitle: "鮮食無負擔，原型肉品無添加，寵愛無疆界",
  },
];
</script>

<template>
  <div p="x-0.75rem t-1.25rem" class="flex-grow-1 border bg-second-200">
    <Swiper
      space-between="12"
      :modules="[SwiperPagination]"
      :pagination="{ dynamicBullets: false }"
    >
      <SwiperSlide
        v-for="banner in dummy_banner"
        :key="banner.id"
        class="relative pb-5.75rem"
      >
        <img
          :src="banner.imgUrl"
          alt="banner"
          class="aspect-350/512"
          rounded="t-80px b-20px"
          object="cover center"
        />

        <div
          class="absolute bottom-40px left-50% mx-auto w-[calc(100%-2rem)] flex flex-col translate-x--50% items-center gap-0.5rem rounded-t-1rem bg-second-200 p-1rem text-center text-neutral-600"
        >
          <h3 class="text-2rem">{{ banner.title }}</h3>
          <p class="text-balance">{{ banner.subtitle }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-pagination) {
  @apply flex justify-center gap-1rem bottom-1.5rem;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-second-400 opacity-100 w-0.75rem h-0.75rem !mx-unset;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-neutral-600;
}
</style>
