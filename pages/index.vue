<script setup>
const data_banner = [
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
    routeUrl: "",
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
    routeUrl: "",
    gradientColor: "from-[#edeef0]",
  },
];

const data_hotProduct = [
  {
    id: 1,
    product_type: "狗狗專區",
    product_type_code: "dog",
    bg_url: "bg-[url(/img/home-3-1.webp)]",
  },
  {
    id: 2,
    product_type: "貓貓專區",
    product_type_code: "cate",
    bg_url: "bg-[url(/img/home-3-2.webp)]",
  },
  {
    id: 3,
    product_type: "鮮食專區",
    product_type_code: "fresh",
    bg_url: "bg-[url(/img/home-3-3.webp)]",
  },
];

const data_comment = [
  {
    id: 1,
    content: "超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️",
    createdTime: "2024-01-22 21:10",
    accountName: "p*****6",
    avatarUrl: "/img/home-4-1.webp",
  },
  {
    id: 2,
    content: "超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️",
    createdTime: "2024-01-22 21:10",
    accountName: "p*****6",
    avatarUrl: "/img/home-4-2.webp",
  },
  {
    id: 3,
    content: "超讚的顏色整體、質感都很滿意，好賣家👍謝謝，有需要會在回購喔，乾蝦❤️",
    createdTime: "2024-01-22 21:10",
    accountName: "p*****6",
    avatarUrl: "/img/home-4-3.webp",
  },
];

const chatCount = ref(10);

// const scrollY = computed(() => {
//   const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
//   console.log("y :>> ", y);
//   return y.value;
// });
// const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
//

const { y: windowScroll } = useWindowScroll();

const showChat = computed(() => {
  const targetPoint = document?.body.scrollHeight - window?.innerHeight - 300;

  if (windowScroll.value > targetPoint) return true;
  else false;
});

const { width: window_width } = useWindowSize();

const comment_swiperPerView = computed(() => {
  if (window_width.value < 768) return 1;
  else return 3;
});

const comment_swiperCenteredSlide = computed(() => {
  if (window_width.value < 768) return false;
  else return true;
});

watchEffect(() => {
  // console.log("windowScroll.value :>> ", windowScroll.value);
  // console.log("window_width.value :>> ", window_width.value);
});
</script>

<template>
  <section class="banner_list flex-grow-1 bg-second-200" p="x-0.75rem t-1.25rem">
    <Swiper
      class="md:(max-w-1760px w-100%)"
      space-between="12"
      :modules="[SwiperPagination]"
      :pagination="{ dynamicBullets: false }"
    >
      <SwiperSlide
        v-for="banner in data_banner"
        :key="banner.id"
        class="relative pb-5.75rem md:(pb-9rem)"
      >
        <img
          :src="banner.imgUrl"
          alt="banner"
          class="aspect-350/512 md:(aspect-1760/662)"
          rounded="t-80px b-20px"
          object="cover center"
          md:(rounded-5rem)
        />

        <div
          class="absolute bottom-50px left-50% mx-auto w-[calc(100%-2rem)] flex flex-col translate-x--50% items-center gap-0.5rem rounded-t-1rem bg-second-200 p-1rem text-center text-neutral-600 md:(bottom-10.25rem max-w-47rem w-100% rounded-1rem bg-second-200/90)"
        >
          <h3 class="text-2rem" md:(text-3rem)>{{ banner.title }}</h3>
          <p class="text-balance" md:(text-1.75rem)>{{ banner.subtitle }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  <section
    class="brand_info md:([background-repeat:no-repeat,_no-repeat,_repeat] flex justify-center gap-4.875rem bg-[position:left_bottom,102%_center,center] bg-[size:556px,_370px,_10px] bg-[url(@/assets/img/home-2-3.webp),_url(@/assets/img/home-2-4.webp),_url(@/assets/img/bg-brand.webp)])"
  >
    <header class="mb-1rem flex flex-col items-center md:(gap-4.5rem pt-7.5rem)">
      <SvgIcon name="logo_pink" class="w-5rem md:(order-2 w-19.25rem)" />
      <h3 class="md:(order-1 text-3rem)">Brand 特色</h3>
    </header>

    <ul class="box_feature grid grid-cols-2 md:(gap-x-1.5rem)">
      <template v-for="feature in data_feature" :key="feature.id">
        <li class="feature px-0.75rem py0.5rem text-center text-neutral-800 md:(p-3rem)">
          <div
            class="107,0.3)] wrapper_icon shadow-[-0.25rem_0.25rem_0.5rem_rgba(210,148, mb-0.25rem aspect-1/1 flex items-center justify-center rounded-1.5rem bg-second-400 p-1.75rem md:(rounded-4.5rem p-5rem)"
          >
            <SvgIcon :name="feature.iconName" class="w-5rem md:(w-10rem)" />
          </div>
          <p text-1.25rem class="md:(text-2rem)">{{ feature.content1 }}</p>
          <p text-1.25rem class="md:(text-2rem)">{{ feature.content2 }}</p>
        </li>
      </template>
    </ul>
  </section>

  <section class="product_category" p="x-0.75rem t-2rem b-4rem md:(y-7.5rem)">
    <ul class="flex flex-col gap-1.5rem md:(flex-row justify-center gap-7.5rem)">
      <li
        v-for="category in data_category"
        :key="category.id"
        class="flex gap-1.5rem md:(h-32.5rem gap-3rem)"
      >
        <div
          class="w-3.75rem flex items-center justify-center gap-1rem write-vertical-left md:(justify-start)"
        >
          <p class="text-2.5rem line-height-none tracking-1rem md:(text-3rem)">
            {{ category.title }}
          </p>
          <p class="text-0.75rem md:(text-1.25rem)">{{ category.subtitle }}</p>
        </div>

        <div
          class="group md:() relative aspect-257/358 flex-grow-1 rounded-1.5rem"
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
        </div>
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
          route-url="/"
          class="md:(mx-unset)"
          bg-color="bg-second-200"
        />
      </ClientOnly>
    </header>

    <ul
      class="mb-3rem flex flex-col items-center gap-1rem md:(mx-auto mb-unset max-w-1296px flex-row gap-1.5rem)"
    >
      <template v-for="product in data_hotProduct" :key="product.id">
        <li
          class="group relative aspect-1/1 w-100% rounded-2rem transition-shadow md:(aspect-416/580)"
          :class="product.bg_url"
          bg="center cover"
          hover:shadow-md
        >
          <NuxtLink
            to="/"
            class="transition-property-background absolute bottom-3rem left-50% w-fit translate-x--50% whitespace-nowrap rounded-5rem bg-neutral-50 text-2rem transition-duration-100 transition-ease-linear transition-property-(color transform) group-hover:(translate-y--1rem bg-neutral-800 text-neutral-50)"
            p="x-3rem y-0.75rem"
          >
            <!-- transition-property="color" -->
            {{ product.product_type }}</NuxtLink
          >
        </li>
      </template>
    </ul>

    <ButtonMore
      content="所有商品"
      route-url="/"
      class="md:(hidden)"
      bg-color="bg-second-200"
    />
  </section>

  <section class="md:() comment_list" p=" y-4rem">
    <header class="md:(mx-auto mb-3rem max-w-1296px flex items-center justify-between)">
      <h2 class="mb-3rem text-center md:(mb-0)">熱烈好評</h2>

      <ClientOnly>
        <ButtonMore
          v-if="window_width >= 768"
          content="所有商品"
          route-url="/"
          class="md:(mx-unset bg-neutral-50)"
        />
      </ClientOnly>
    </header>

    <Swiper
      class="md:() mb-1.5rem"
      space-between="24"
      :modules="[SwiperPagination]"
      :slides-per-view="comment_swiperPerView"
      :centered-slides="comment_swiperCenteredSlide"
      :pagination="true"
    >
      <!-- :slides-per-view="3" -->
      <SwiperSlide
        v-for="comment in data_comment"
        :key="comment.id"
        class="flex flex-col px-0.75rem pb-3rem md:(flex-row gap-1.75rem)"
      >
        <div
          class="relative mb-1rem rounded-1rem bg-second-200 p-1.5rem shadow-[-4px_-4px_8px_rgba(210,148,107,0.3)] after:(absolute right-3rem top-100% h-2rem w-2rem flex border-b-2rem border-l-2rem border-b-transparent border-l-second-200 shadow-[-4px_-4px_8px_rgba(210,148,107,0.3)] content-empty) md:(order-2 mb-0 h-265px w-350px p-3rem)"
        >
          <p class="mb-0.75rem text-1.5rem md:(line-clamp-4)">
            {{ comment.content }}
          </p>
          <p class="text-0.875rem text-neutral-400">
            {{ comment.createdTime }}
          </p>
        </div>

        <div class="mx-auto flex gap-0.5rem md:(order-1 flex-col)">
          <img
            :src="comment.avatarUrl"
            alt="avatar"
            class="aspect-1/1 w-2.5rem rounded-50% object-cover object-center md:(w-6.25rem)"
          />
          <p>{{ comment.accountName }}</p>
        </div>
      </SwiperSlide>
    </Swiper>

    <ButtonMore content="所有評論" route-url="/" bg-color="bg-#fff" />
  </section>

  <ClientOnly>
    <div
      class="chat_icon bottom-5rem right-0.75rem z-10 h-3.5rem w-3.5rem flex cursor-pointer items-center justify-center rounded-50% bg-rose-500 opacity-0 transition-opacity md:(right-3vw)"
      :class="[
        {
          'opacity-100': windowScroll > 200,
          '!bottom-1.5rem': showChat,
        },
        showChat ? 'absolute' : 'fixed',
      ]"
    >
      <SvgIcon name="chat" class="h-2rem w-2rem text-white hover:text-blue" />

      <span
        class="absolute right--0.25rem top--0.25rem h-1.25rem w-1.25rem flex items-center justify-center border border-2px border-white rounded-50% bg-rose-500 text-0.75rem text-white"
        >{{ chatCount > 9 ? "9+" : chatCount }}
      </span>
    </div>
  </ClientOnly>
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
  @apply;
  /* @apply md:(before:(content-empty)); */

  /* md:( before:(content-empty flex absolute left-0 bottom-0 bg-[url('@/assets/img/home-2-3.webp')] w-556px h-362px border border-red-7 ) after:(content-empty flex w-1rem h-1rem absolute border-red-700 border) )"
    p="x-0.75rem y-3rem */
}

.comment_list :deep(.swiper-pagination) {
  @apply md:(hidden);
}

/* .brand_info {
  border: 1px solid red;

  @media screen and (min-width: 768px) {
    background-image: url("@/assets/img/bg-brand.webp"),url("@/assets/img/home-2-3.webp"), url("@/assets/img/home-2-4.webp");
    background-position: center, left bottom, right center;
    background-repeat: repeat, no-repeat, no-repeat;
    background-size: cover, 556px 362px, 432px 526px;
  }
} */
</style>
