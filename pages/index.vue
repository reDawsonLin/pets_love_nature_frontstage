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
    title: "全人食等級 寵愛每一口",
    subtitle: "原塊肉品，天然凍乾，保留原味原香",
  },
  {
    id: 3,
    imgUrl: "/img/banner/3.webp",
    routeLink: "",
    title: "毛孩天然美食 享受鮮食饗宴",
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
    title: "全人食等級 寵愛每一口",
    subtitle: "原塊肉品，天然凍乾，保留原味原香",
  },
  {
    id: 6,
    imgUrl: "/img/banner/3.webp",
    routeLink: "",
    title: "毛孩天然美食 享受鮮食饗宴",
    subtitle: "鮮食無負擔，原型肉品無添加，寵愛無疆界",
  },
];
</script>

<template>
  <div p="x-0.75rem t-1.25rem" class="flex-grow-1 border bg-second-200">
    <!-- <img
      src="/img/banner/1.webp"
      alt="banner"
      class="aspect-350/512"
      rounded="t-80px b-20px"
      object="cover center"
    /> -->
    <Swiper
      space-between="12"
      :modules="[SwiperPagination]"
      :pagination="{ dynamicBullets: true }"
    >
      <SwiperSlide
        v-for="banner in dummy_banner"
        :key="banner.id"
        class="relative"
      >
        <img
          :src="banner.imgUrl"
          alt="banner"
          class="aspect-350/512"
          rounded="t-80px b-20px"
          object="cover center"
        />

        <div p-1rem round="t-1rem" border border-red-7>
          <h3 class="text-2rem">{{ banner.title }}</h3>
          <p>{{ banner.subtitle }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped></style>
