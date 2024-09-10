<script setup>
const { width: window_width } = useWindowSize();
const comment_swiperPerView = computed(() => {
  if (window_width.value < 768) return 1;
  else return 3;
});
const comment_swiperCenteredSlide = computed(() => {
  if (window_width.value < 768) return false;
  else return true;
});
const comment_autoplay = computed(() => {
  if (window_width.value < 768) {
    return {
      delay: 3000,
    };
  } else {
    return {
      delay: 0,
      pauseOnMouseEnter: true,
    };
  }
});

const window_width_md = computed(() => window_width.value < 768);

watchEffect(() => {});

const { data: data_commentList, error: error_commentList } = await useApiFetch(
  "/comment"
);

const { data: data_banner, error: error_banner } = await useApiFetch("/banner");
const toRoute = (item) => {
  if (item.hyperlink) return { name: "product", query: { searchType: item.hyperlink } };
  else return { name: "product" };
};

const data_comment = ref([]);
onMounted(() => {
  for (let i = 0; i < data_commentList.value.data.length; i++) {
    const item = data_commentList.value.data[i];
    if (data_comment.value.length >= 7) break;
    if (!item.comment) return;

    item.customerId.customerName = hideString(item.customerId.customerName);
    data_comment.value.push(item);
  }
});

// --------------------------------------
const data_feature = [
  {
    id: 1,
    iconName: "advance_nature",
    content1: "100%",
    content2: "純天然原料",
  },
  {
    id: 2,
    iconName: "advance_noAdd",
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
    iconName: "advance_good",
    content1: "人食等級",
    content2: "安心食用",
  },
];

const data_category = [
  {
    id: 1,
    title: "原塊凍乾",
    subtitle: "Freeze Dried Chunk",
    description:
      "台灣自有工廠生產，不加任何調味料防腐劑、堅持保有最原始的營養。低脂低熱量，結構完整鬆軟，輕鬆撥小塊、壓粉，不須加水還原就可以輕鬆食用！",
    remind: "",
    bgUrl: "bg-[url(/img/home-2-1.webp)]",
    routeUrl: { name: "product", query: { searchType: "dry" } },
    gradientColor: "from-[#fde7ef]",
  },
  {
    id: 2,
    title: "客製鮮食",
    subtitle: "Customized Fresh Food",
    description:
      "100% 純手工製作，根據犬貓不同階段需求，虚弱、挑食、疾病調養等，客製調配最適合的鮮食。",
    remind: "*鮮食為食品，醫療仍須遵照醫囑，並請依照醫師指示食用。",
    bgUrl: "bg-[url(/img/home-2-2.webp)]",
    routeUrl: { name: "product", query: { searchType: "fresh" } },
    gradientColor: "from-[#edeef0]",
  },
];

const data_hotProduct = [
  {
    id: 1,
    product_type: "狗狗專區",
    product_type_code: "dog",
    bg_url: "bg-[url(/img/home-3-1.webp)]",
    routeUrl: { name: "product", query: { searchType: "dog" } },
  },
  {
    id: 2,
    product_type: "貓貓專區",
    product_type_code: "cate",
    bg_url: "bg-[url(/img/home-3-2.webp)]",
    routeUrl: { name: "product", query: { searchType: "cat" } },
  },
  {
    id: 3,
    product_type: "鮮食專區",
    product_type_code: "fresh",
    bg_url: "bg-[url(/img/home-3-3.webp)]",
    routeUrl: { name: "product", query: { searchType: "fresh" } },
  },
];
</script>

<template>
  <section class="banner_list flex-grow-1 bg-second-200" p="x-0.75rem t-1.25rem">
    <Swiper
      class="md:(max-w-1760px w-100%)"
      space-between="12"
      loop
      :modules="[SwiperPagination, SwiperAutoplay]"
      :pagination="{ dynamicBullets: false, clickable: true }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide
        v-for="banner in data_banner?.data"
        :key="banner._id"
        class="relative pb-5.75rem md:(pb-9rem)"
      >
        <NuxtLink :to="toRoute(banner)">
          <img
            :src="banner.imgUrl"
            alt="banner"
            class="aspect-350/512 md:(aspect-1760/662 rounded-5rem)"
            rounded="t-80px b-20px"
            object="cover center"
          >

          <div
            class="absolute bottom-50px left-50% mx-auto w-[calc(100%-2rem)] flex flex-col translate-x--50% items-center gap-0.5rem rounded-t-1rem bg-second-200 p-1rem text-center text-neutral-600 md:(bottom-10.25rem max-w-47rem w-100% rounded-1rem bg-second-200/90)"
          >
            <h3 class="text-2rem md:(text-3rem)">{{ banner.title }}</h3>
            <p class="text-balance md:(text-1.75rem)">{{ banner.subtitle }}</p>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </section>

  <section
    class="brand_info mt-2rem lg:([background-repeat:no-repeat,_no-repeat,_repeat] mt-0 flex justify-center gap-4.875rem bg-[position:left_bottom,102%_center,center] bg-[size:556px,_370px,_10px] bg-[url(@/assets/img/home-2-3.webp),_url(@/assets/img/home-2-4.webp),_url(@/assets/img/bg-brand.webp)] px-1rem)"
  >
    <header class="mb-1rem flex flex-col items-center lg:(gap-4.5rem pt-7.5rem)">
      <SvgIcon
        name="logo_pink"
        class="w-5rem lg:(order-2 w-19.25rem bg-neutral-100/[.9])"
      />
      <h3 class="lg:(order-1 text-3rem)">Brand 特色</h3>
    </header>

    <ul
      class="box_feature grid grid-cols-2 mx-auto max-w-500px lg:(mx-0 max-w-unset gap-x-1.5rem)"
    >
      <template v-for="feature in data_feature" :key="feature.id">
        <li
          class="feature group px-0.75rem py0.5rem text-center text-neutral-800 lg:(p-3rem)"
        >
          <div
            class="wrapper_icon transition-background mb-0.25rem aspect-1/1 flex items-center justify-center rounded-1.5rem bg-second-400 p-1.75rem shadow-[-0.25rem_0.25rem_0.5rem_rgba(210,148,107,0.3)] transition-(transform) lg:(max-w-320px w-16vw rounded-2rem p-1rem) group-hover:(rotate-5 bg-second-200)"
          >
            <SvgIcon :name="feature.iconName" class="w-5rem lg:(max-w-160px w-8.3vw)" />
          </div>
          <p text-1.25rem class="lg:(text-2rem)">{{ feature.content1 }}</p>
          <p text-1.25rem class="lg:(text-2rem)">{{ feature.content2 }}</p>
        </li>
      </template>
    </ul>
  </section>

  <section class="product_category" p="x-0.75rem t-2rem b-4rem md:(y-7.5rem)">
    <ul
      class="flex flex-col gap-1.5rem sm:(mx-auto max-w-500px) md:(max-w-1296px flex-row flex-wrap justify-center)"
    >
      <li
        v-for="category in data_category"
        :key="category.id"
        class="flex gap-1.5rem md:(flex-grow-1)"
      >
        <div
          class="w-3.75rem flex items-center justify-center gap-1rem write-vertical-left md:(justify-start)"
        >
          <p class="text-2.5rem line-height-none tracking-1rem md:(text-3rem)">
            {{ category.title }}
          </p>
          <p class="text-0.75rem md:(text-1.25rem)">{{ category.subtitle }}</p>
        </div>

        <NuxtLink
          :to="category.routeUrl"
          class="group relative aspect-257/358 flex-grow-1 rounded-1.5rem lg:(aspect-430/520) md:(aspect-unset)"
          :class="[`${category.bgUrl}`]"
          bg="center [length:auto_100%] no-repeat"
        >
          <div
            class="absolute inset-0 flex flex-col justify-end rounded-1.5rem from-20% bg-gradient-to-t px-1rem py-0.75rem opacity-0 transition-opacity md:(p-2.25rem) group-hover:opacity-100"
            :class="[`${category.gradientColor}`]"
          >
            <p class="text-balance text-1rem md:(text-1.5rem)">
              {{ category.description }}
            </p>
            <p v-show="category.remind" class="text-0.75rem">
              {{ category.remind }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>

  <section
    class="product_suggest relative rounded-2.5rem bg-second-200"
    p="x-0.75rem y-2.5rem md:(y-7.5rem)"
  >
    <header class="md:(mx-auto mb-3rem max-w-1296px flex items-center justify-between)">
      <h2 class="mb-3rem text-center md:(mb-0)">熱銷商品</h2>

      <ClientOnly>
        <ButtonMore
          v-if="window_width >= 768"
          content="所有商品"
          :route-url="{ name: 'product' }"
          class="md:(mx-unset)"
          bg-color="bg-second-200"
        />
      </ClientOnly>
    </header>

    <ul
      class="mb-3rem flex flex-col items-center gap-1rem md:(mx-auto mb-unset max-w-1296px flex-row gap-1.5rem)"
    >
      <template v-for="product in data_hotProduct" :key="product.id">
        <li class="aspect-1/1 w-100% md:(aspect-416/580)">
          <NuxtLink
            :to="product.routeUrl"
            class="group product_hot relative h-100% w-100% flex rounded-2rem bg-[length:100%] bg-center hover:(bg-[length:110%] shadow-md)"
            :class="product.bg_url"
          >
            <p
              class="transition-property-background absolute bottom-3rem left-50% w-fit translate-x--50% whitespace-nowrap rounded-5rem bg-neutral-50 px-3rem py-0.75rem text-2rem transition-duration-100 transition-ease-linear transition-property-(color transform) group-hover:(translate-y--1rem bg-neutral-800 text-neutral-50)"
            >
              {{ product.product_type }}
            </p>
          </NuxtLink>
        </li>
      </template>
    </ul>

    <ButtonMore
      content="所有商品"
      :route-url="{ name: 'product' }"
      class="md:(hidden)"
      bg-color="bg-second-200"
    />
  </section>

  <section class="comment_list px-2rem py-4rem">
    <header class="md:(mx-auto mb-3rem max-w-1296px flex items-center justify-between)">
      <h2 class="mb-3rem text-center md:(mb-0)">熱烈好評</h2>

      <ButtonMore
        content="所有商品"
        :route-url="{ name: 'product' }"
        class="md:(mx-unset) !hidden !md:flex"
        bg-color="bg-#fff"
      />
    </header>

    <Swiper
      class="mb-1.5rem"
      space-between="24"
      :modules="[SwiperPagination, SwiperAutoplay, SwiperFreeMode]"
      :slides-per-view="comment_swiperPerView"
      :centered-slides="comment_swiperCenteredSlide"
      :pagination="{ dynamicBullets: true }"
      :speed="window_width_md ? 1000 : 7000"
      :free-mode="{ enabled: !window_width_md }"
      :loop="true"
      :autoplay="comment_autoplay"
    >
      <SwiperSlide
        v-for="comment in data_comment"
        :key="comment._id"
        class="flex-col px-1.25rem pb-3rem !flex md:(flex-row gap-3rem)"
      >
        <div class="box_comment">
          <p class="mb-0.75rem text-1.25rem md:(line-clamp-4 text-1.25rem)">
            {{ comment.comment }}
          </p>
          <p class="text-0.875rem text-neutral-400">
            {{ $dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm") }}
          </p>
        </div>

        <div class="mx-auto flex gap-0.5rem md:(order-1 w-3.75rem shrink-0 flex-col)">
          <img
            :src="
              comment.customerId.image ? comment.customerId.image : '/img/home-4-1.webp'
            "
            alt="avatar"
            class="aspect-1/1 w-2.5rem rounded-50% object-cover object-center md:(w-100%)"
          >
          <p class="md:() flex items-center justify-center">
            {{ comment.customerId.customerName }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>

    <ButtonMore
      content="所有商品"
      :route-url="{ name: 'product' }"
      bg-color="bg-#fff"
      class="md:(hidden)"
    />
  </section>
</template>

<style scoped>
.banner_list :deep(.swiper-pagination) {
  @apply bottom-1.5rem;
  @apply md:(bottom-5rem);
}

.banner_list :deep(.swiper-pagination-bullet) {
  @apply bg-second-400;
}

:deep(.swiper-pagination) {
  @apply flex justify-center gap-1rem;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-neutral-200  opacity-100 w-0.75rem h-0.75rem !mx-unset;
  @apply md:(w-1.5rem h-1.5rem);
}

:deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
  @apply bg-neutral-600;
}

.brand_info {
}

.product_hot {
  transition: background-size 0.3s ease, shadow 0.3s ease;
}

.comment_list {
  :deep(.swiper-wrapper) {
    @media screen and (min-width: 768px) {
      transition-timing-function: linear !important;
    }
  }

  .box_comment {
    @apply relative mb-2rem rounded-1rem bg-second-200 p-1.5rem shadow-[-4px_-4px_8px_rgba(210,148,107,0.3)];
    @apply md:(order-2 mb-0 py-1.75rem px-2rem grow-1);

    &::after {
      content: "";
      position: absolute;
      right: 3rem;
      top: 100%;
      display: flex;
      height: 2rem;
      width: 2rem;
      border-bottom: 2rem solid transparent;
      border-left: 2rem solid #f9f0ea;
      z-index: -1;
    }

    @media screen and (min-width: 768px) {
      &::after {
        top: 2rem;
        right: 100%;
        border-left: none;
        border-top: none;
        border-right: 2rem solid #f9f0ea;
        z-index: 1;
      }
    }
  }

  :deep(.swiper-pagination) {
    @apply md:(hidden);
  }
}
</style>
