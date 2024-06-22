<script setup>
import { useCookie } from "nuxt/app";

const route = useRoute();
const id_order = route.params.id;

const { data: data_order, error: error_order } = await useTokenFetch(
  `/order/${id_order}`
);

console.log("data_order :>> ", data_order.value);
const detail_order = data_order.value.data[0];

console.log("detail_order :>> ", detail_order);

// --------------------------------------------
const { width: window_width } = useWindowSize();
</script>

<template>
  <div class="wrapper">
    <aside class="sidebar flex">
      <ul
        class="mx-auto flex gap-1rem overflow-x-auto px-0.75rem py-0.5rem lg:(w-100% flex-col items-center)"
      >
        <li class="">
          <NuxtLink :to="{ name: 'member' }"> 個人資訊 </NuxtLink>
        </li>
        <li class="">
          <NuxtLink :to="{ name: 'order-list' }"> 訂單記錄 </NuxtLink>
        </li>
        <li class="opacity-50">收藏商品</li>
        <li class="opacity-50">聊聊紀錄</li>
      </ul>
    </aside>

    <h1 class="title_h1 mx-auto my-1rem flex justify-center lg:(my-2rem)">
      訂單詳細資訊
    </h1>

    <section
      class="content_order h-100% flex flex-col overflow-y-auto rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(px-2rem py-2.25rem)"
    >
      <table>
        <thead>
          <tr class="thead_tr bg-neutral-200 text-neutral-600 lg:(bg-second-400)">
            <th
              class="rounded-0.25rem text-1.25rem lg:(w-37% rounded-l-0 rounded-l-0.25rem text-1rem)"
              :colspan="window_width < 1024 ? 1 : 2"
            >
              商品
            </th>
            <th class="hidden lg:(table-cell)">單價</th>
            <th class="hidden lg:(table-cell)">數量</th>
            <th class="hidden lg:(table-cell rounded-r-0.25rem)">總計</th>
          </tr>
        </thead>

        <tbody class="">
          <tr
            v-for="item in detail_order.orderProductList"
            :key="item.productId"
            class="tbody_tr mb-1.5rem"
          >
            <td class="td_img mr-1rem lg:(min-w-76px)">
              <img
                class="h-100% object-cover object-center lg:(h-3.75rem w-3.75rem)"
                :src="item.coverImg"
                alt="product image"
              >
            </td>
            <td class="td_content">
              <p class="line-clamp-2">
                {{ item.productTitle }}
              </p>
              <p class="">{{ item.weight }}g</p>
            </td>

            <td class="td_price lg:(text-center)">
              <p class="">
                NT$
                <span class="ml-0.25rem text-1.5rem line-height-120%">{{
                  addThousandPoint(item.price)
                }}</span>
              </p>
            </td>

            <td class="td_amount">
              <p
                class="relative top-2px flex justify-end lg:(justify-center text-1.5rem before:content-empty) before:(content-['x'])"
              >
                {{ item.quantity }}
              </p>
            </td>

            <td class="td_total mt-1.5rem lg:(mt-0) sm:(mt-0.5rem)">
              <p class="flex items-end justify-end text-rose-500 lg:(justify-center)">
                NT$
                <span class="ml-0.25rem text-1.5rem line-height-120%">{{
                  addThousandPoint(item.price * item.quantity)
                }}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="lg:(flex justify-end rounded-0.5rem bg-neutral-200 p-1rem)">
        <div
          class="flex items-end justify-center gap-1rem border border-neutral-200 rounded-0.5rem p-1.5rem lg:(border-none bg-neutral-50 px-1.5rem py-1rem)"
        >
          <p class="text-1.25rem text-neutral-600">總金額</p>
          <p class="text-rose-500">
            NT$
            <span class="ml-0.25rem text-1.5rem line-height-120%">{{
              addThousandPoint(totalPrice(detail_order.orderProductList))
            }}</span>
          </p>
        </div>
      </div>

      <div
        class="mb-2rem mt-2rem flex flex-col gap-1rem lg:(mb-0 mt-1.5rem flex-row items-start justify-between)"
      >
        <button
          type="button"
          class="transition-[border-color, text-color] order-2 hidden border border-neutral-300 rounded-0.25rem px-1rem pb-0.5rem pt-0.75rem text-neutral-400 lg:(order-1 flex) hover:(border-neutral-400 text-neutral-600)"
        >
          退貨
        </button>

        <div class="order-1 flex flex-col justify-between gap-1rem lg:(flex-row)">
          <p class="">喜歡之前購買的商品嗎？<br >給我們一個好評吧！</p>
          <!-- :to="`/evaluate/${detail_order._id}`" -->
          <NuxtLink
            :to="`/evaluate`"
            class="transition-[background-color] flex cursor-pointer items-center justify-center rounded-0.25rem px-1rem py-0.75rem font-bold lg:(w-200px) !bg-orange-200 !hover:bg-orange-300"
          >
            評價
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-areas:
      ". title title title ."
      ". sidebar content content ."
      ". sidebar info info .";
    grid-template-columns: 1fr 1.5fr 7fr 1.5fr 1fr;
    /* grid-template-rows: auto; */
    gap: 0rem 1rem;
  }
}

.sidebar {
  @media screen and (min-width: 1024px) {
    grid-area: sidebar;
  }

  > ul {
    > li {
      @apply whitespace-nowrap;
      @apply hover:(bg-second-200)
      @apply lg:(flex justify-center w-100% py-0.5rem px-1rem);
      @apply transition-[background];
    }
  }
}

.title_h1 {
  font-size: clamp(1.75rem, 7vw, 2.5rem);

  @media screen and (min-width: 1024px) {
    grid-area: title;
  }
}

.content_order {
  @media screen and (min-width: 1024px) {
    grid-area: content;
  }
}

.info_order {
  @media screen and (min-width: 1024px) {
    grid-area: info;
  }
}

.thead_tr {
  /* th {
    @apply lg:(py-0.75rem px-0.5rem);
  } */
}

.tbody_tr {
  /* @apply bg-neutral-100 rounded-0.5rem flex flex-col py-1rem px-0.75rem;
  @apply hover:(bg-neutral-200);
  @apply transition-[background];

  @apply lg:(table-row);

  > td {
    @apply lg:(py-0.75rem px-0.5rem);

    > p {
      @apply flex gap-0.5rem before:( content-[attr(data-title)]);
      @apply lg:(justify-center before:(content-empty));
    }
  }

  .button {
    @apply flex justify-center pt-0.5rem pb-0.25rem px-0.5rem rounded-0.25rem bg-neutral-300 mt-0.5rem cursor-pointer;
    @apply hover:(bg-neutral-400);
    @apply transition-[background];

    @apply lg:(w-fit  mt-0 mx-auto);
  } */
}

.thead_tr {
  > th {
    @apply font-400 pt-1rem pb-0.625rem;
  }
}

.tbody_tr {
  position: relative;
  display: grid;
  grid-template-areas:
    "img content content"
    "img price quantity"
    "total total total";

  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 0.5rem;

  &:first-of-type {
    &::before {
      content: none;
    }
  }

  &::before {
    @apply bg-neutral-200;
    content: "";
    position: absolute;
    top: -0.75rem;
    left: 0;
    display: flex;
    width: 100%;
    height: 2px;
  }

  @media screen and (min-width: 640px) {
    grid-template-areas:
      "img content content"
      "img price quantity"
      "img total total";
  }

  @media screen and (min-width: 1024px) {
    display: table-row;

    &::before {
      content: none;
    }

    &:not(&:first-of-type) {
      border-top: 2px solid;

      @apply border-t-neutral-200;
    }
  }

  > td {
    @apply lg:([&:nth-child(1)]-pr-0 px-1rem py-4.5rem);
  }
}

.td_img {
  grid-area: img;
}

.td_content {
  grid-area: content;
}

.td_price {
  grid-area: price;
}

.td_amount {
  grid-area: quantity;
}

.td_total {
  grid-area: total;
}
</style>
