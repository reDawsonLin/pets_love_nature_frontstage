<script setup>
const dummy_banner = [
  {
    id: 1,
    imgUrl: "../assets/img/banner/1.webp",
    routeLink: "",
    title: "原型鮮食 頂級饗宴",
    subtitle: "全人食等級，寵物鮮食新選擇",
  },
  {
    id: 2,
    imgUrl: "../assets/img/banner/2.webp",
    routeLink: "",
    title: "全人食等級 寵愛每一口",
    subtitle: "原塊肉品，天然凍乾，保留原味原香",
  },
  {
    id: 3,
    imgUrl: "../assets/img/banner/3.webp",
    routeLink: "",
    title: "毛孩天然美食 享受鮮食饗宴",
    subtitle: "鮮食無負擔，原型肉品無添加，寵愛無疆界",
  },
];
</script>

<template>
  <div p="x-0.75rem t-1.25rem" class="flex-grow-1 border">
    <img
      rounded="t-80px b-20px"
      object="cover center"
      class="aspect-350/512"
      src="@/assets/img/banner/1.webp"
      alt="banner"
    />
  </div>

  <Swiper :modules="[SwiperPagination]" :pagination="{ dynamicBullets: true }">
    <SwiperSlide v-for="banner in dummy_banner" :key="banner.id">
      <img :src="banner.imgUrl" alt="" />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped></style>
