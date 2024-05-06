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

const dummy_feature = [
  {
    id: 1,
    iconName: "advance_nature",
    content1: "100%",
    content2: "純天然原料",
  },
  {
    id: 2,
    iconName: "advance_good",
    content1: "無防腐劑",
    content2: "無誘食劑",
  },
  {
    id: 3,
    iconName: "advance_noGluten",
    content1: "無麩質",
    content2: "無添加",
  },
  {
    id: 4,
    iconName: "advance_noAdd",
    content1: "人食等級",
    content2: "安心食用",
  },
];

const dummy_category = [
  {
    id: 1,
    title: "原塊凍乾",
    subtitle: "Freeze Dried Chunk",
    description:
      "台灣自有工廠生產，不加任何調味料防腐劑、堅持保有最原始的營養。低脂低熱量，結構完整鬆軟，輕鬆撥小塊、壓粉，不須加水還原就可以輕鬆食用！",
    remind: "",
    bgUrl: "bg-[url(/img/home-2-1.webp)]",
    routeUrl: "",
  },
  {
    id: 2,
    title: "客製鮮食",
    subtitle: "Customized Fresh Food",
    description:
      "100% 純手工製作，根據犬貓不同階段需求，虚弱、挑食、疾病調養等，客製調配最適合的鮮食。",
    remind: "*鮮食為食品，醫療仍須遵照醫囑，並請依照醫師指示食用。",
    bgUrl: "bg-[url(/img/home-2-2.webp)]",
    routeUrl: "",
  },
];
</script>

<template>
  <section
    class="banner_list flex-grow-1 bg-second-200"
    p="x-0.75rem t-1.25rem"
  >
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
          class="absolute bottom-50px left-50% mx-auto w-[calc(100%-2rem)] flex flex-col translate-x--50% items-center gap-0.5rem rounded-t-1rem bg-second-200 p-1rem text-center text-neutral-600"
        >
          <h3 class="text-2rem">{{ banner.title }}</h3>
          <p class="text-balance">{{ banner.subtitle }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  <section class="brand_info" p="x-0.75rem y-3rem">
    <header class="flex flex-col items-center mb-1rem">
      <SvgIcon name="logo_pink" class="w-5rem" />
      <h3>Brand 特色</h3>
    </header>

    <ul class="box_feature grid grid-cols-2">
      <template v-for="item in dummy_feature" :key="item.id">
        <li class="feature px-0.75rem py0.5rem text-neutral-800 text-center">
          <div
            class="wrapper_icon flex justify-center items-center mb-0.25rem aspect-1/1 rounded-1.5rem bg-second-400 p-1.75rem shadow-[-0.25rem_0.25rem_0.5rem_rgba(210, 148, 107,0.3)]"
          >
            <SvgIcon :name="item.iconName" class="w-5rem" />
          </div>
          <p text-1.25rem>{{ item.content1 }}</p>
          <p text-1.25rem>{{ item.content2 }}</p>
        </li>
      </template>
    </ul>
  </section>

  <section class="product_category">
    <ul class="flex flex-col gap-1.5rem py-2rem px-0.75rem">
      <li v-for="item in dummy_category" :key="item.id" class="flex gap-1.5rem">
        <div
          class="box_title write-vertical-left flex gap-1rem justify-center items-center"
        >
          <p class="text-2.5rem tracking-1rem">{{ item.title }}</p>
          <p class="text-0.75rem">{{ item.subtitle }}</p>
        </div>

        <div
          class="relative rounded-1.5rem aspect-257/358 flex-grow-1"
          :class="`${item.bgUrl}`"
          bg="center [length:auto_100%] no-repeat"
        >
          <div
            class="absolute inset-0 px-1rem py-0.75rem flex flex-col justify-end bg-gradient-to-t from-[#edeef098]"
          >
        <!-- from-[rgb(237_ 238_240/.98)] -->
          <!-- bg-gradient-to-t from-[#edeef0] from-98% -->
            <!-- background-image: linear-gradient(to bottom, rgba(255, 255, 255,
            0.8), rgba(255, 255, 255, 0)); -->
            <!-- linear-gradient(0deg, rgba(237,238,240,0.861782212885154) 0%, rgba(237,238,240,1) 98%); -->

            <p class="text-1rem">{{ item.description }}</p>
            <p v-show="item.remind" class="text-0.75rem">{{ item.remind }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>

  <section class="product_suggest"></section>

  <section class="comment_list"></section>
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
