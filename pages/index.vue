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
</script>

<template>
  <main>
    <section class="banner_list flex-grow-1 bg-second-200" p="x-0.75rem t-1.25rem">
      <Swiper
        space-between="12"
        :modules="[SwiperPagination]"
        :pagination="{ dynamicBullets: false }"
      >
        <SwiperSlide
          v-for="banner in data_banner"
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
      <header class="mb-1rem flex flex-col items-center">
        <SvgIcon name="logo_pink" class="w-5rem" />
        <h3>Brand 特色</h3>
      </header>

      <ul class="box_feature grid grid-cols-2">
        <template v-for="feature in data_feature" :key="feature.id">
          <li class="feature px-0.75rem py0.5rem text-center text-neutral-800">
            <div
              class="148, 107,0.3)] wrapper_icon shadow-[-0.25rem_0.25rem_0.5rem_rgba(210, mb-0.25rem aspect-1/1 flex items-center justify-center rounded-1.5rem bg-second-400 p-1.75rem"
            >
              <SvgIcon :name="feature.iconName" class="w-5rem" />
            </div>
            <p text-1.25rem>{{ feature.content1 }}</p>
            <p text-1.25rem>{{ feature.content2 }}</p>
          </li>
        </template>
      </ul>
    </section>

    <section class="product_category" p="x-0.75rem t-2rem b-4rem">
      <ul class="flex flex-col gap-1.5rem">
        <li v-for="category in data_category" :key="category.id" class="flex gap-1.5rem">
          <div
            class="w-3.75rem flex items-center justify-center gap-1rem write-vertical-left"
          >
            <p class="text-2.5rem line-height-none tracking-1rem">
              {{ category.title }}
            </p>
            <p class="text-0.75rem">{{ category.subtitle }}</p>
          </div>

          <div
            class="group relative aspect-257/358 flex-grow-1 rounded-1.5rem"
            :class="[`${category.bgUrl}`]"
            bg="center [length:auto_100%] no-repeat"
          >
            <div
              class="absolute inset-0 flex flex-col justify-end rounded-1.5rem from-20% bg-gradient-to-t px-1rem py-0.75rem opacity-0 transition-opacity group-hover:opacity-100"
              :class="[`${category.gradientColor}`]"
            >
              <p class="text-balance text-1rem">{{ category.description }}</p>
              <p v-show="category.remind" class="text-0.75rem">
                {{ category.remind }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="product_suggest rounded-2.5rem bg-second-200" p="x-0.75rem y-2.5rem">
      <h2 class="mb-3rem text-center">熱銷商品</h2>

      <ul class="mb-3rem flex flex-col items-center gap-1rem">
        <template v-for="product in data_hotProduct" :key="product.id">
          <li
            class="group relative aspect-1/1 w-100% rounded-2rem transition-shadow"
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

      <ButtonMore content="所有商品" route-url="/" bg-color="bg-second-200" />
    </section>

    <section class="comment_list" p=" y-4rem">
      <h2 class="mb-3rem text-center">熱烈好評</h2>

      <Swiper
        space-between="12"
        :modules="[SwiperPagination]"
        :pagination="{ dynamicBullets: false }"
      >
        <SwiperSlide
          v-for="comment in data_comment"
          :key="comment.id"
          class="pb-4.5rem px-0.75rem flex flex-col"
        >
          <div
            class="relative p-1.5rem bg-second-200 rounded-1rem shadow-[-4px_-4px_8px_rgba(210,148,107,0.3)] mb-1rem"
            after:(content-empty
            absolute
            top-100%
            right-1.25rem
            flex
            border-l-2rem
            border-l-second-200
            border-b-2rem
            border-b-transparent
            w-2rem
            h-2rem
            shadow-[-4px_-4px_8px_rgba(210,148,107,0.3)]
            )
          >
            <p class="text-1.5rem mb-0.75rem">{{ comment.content }}</p>
            <p class="text-0.875rem text-neutral-400">{{ comment.createdTime }}</p>
          </div>

          <div class="flex gap-0.5rem mx-auto">
            <img
              :src="comment.avatarUrl"
              alt="avatar"
              class="w-2.5rem aspect-1/1 object-cover object-center rounded-50%"
            />
            <p>{{ comment.accountName }}</p>
          </div>

          <!-- <img
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
          </div> -->
        </SwiperSlide>
      </Swiper>

      <ButtonMore content="所有評論" route-url="/" bg-color="bg-#fff" />
    </section>
  </main>
</template>

<style scoped>
:deep(.banner-list.swiper-pagination) {
  @apply bottom-1.5rem;
}

:deep(.swiper-pagination) {
  @apply flex justify-center gap-1rem;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-second-400 opacity-100 w-0.75rem h-0.75rem !mx-unset;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-neutral-600;
}
</style>
