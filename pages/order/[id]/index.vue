<script setup>
import { useCookie } from "nuxt/app";
import Swal from "sweetalert2";

const route = useRoute();
const id_order = route.params.id;

const { data: data_order, error: error_order } = await useTokenFetch(
  `/order/${id_order}`
);
if (error_order.value) console.log("error_order.value :>> ", error_order.value);
const detail_order = data_order.value.data[0];
console.log("detail_order :>> ", detail_order);

const id_customer = useCookie("id_customer");
const { data: data_member, error: error_member } = await useTokenFetch(
  `/customer/${id_customer.value}`
);
if (error_member.value) console.log("error_member.value :>> ", error_member.value);
const detail_member = data_member.value.data;

// --------------------------------------------
const returnOrder = async () => {
  const result = await Swal.fire({
    title: "是否確定將此訂單進行退貨處理？",
    showDenyButton: true,
    confirmButtonText: "是",
    denyButtonText: "否",
  });

  if (result.isConfirmed) {
    await useToken$Fetch(`/orderStatus`, {
      method: "PATCH",
      body: { orderId: id_order, orderStatus: -1 },
    });

    Swal.fire("退貨申請已送出", "", "success");
    navigateTo({ name: "order-list" });
  }
};

// --------------------------------------------
const data_comment = ref([]);
if (detail_order.orderStatus >= 5) {
  const { data, error: error_comment } = await useTokenFetch(
    `/comment/getCommentByOrderId/${id_order}`
  );
  console.log("error_comment :>> ", error_comment.value);

  if (data.value) data_comment.value = data.value;

  data_comment.value.data.forEach((item) => {
    item.star = Math.round(item.star);
  });
}

const { width: window_width } = useWindowSize();
</script>

<template>
  <div class="wrapper mx-auto mb-2rem max-w-1296px w-100%">
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
        <!-- <li class="opacity-50">收藏商品</li>
        <li class="opacity-50">聊聊紀錄</li> -->
      </ul>
    </aside>

    <h1 class="title_h1 mx-auto my-1rem flex justify-center lg:(my-2rem)">
      訂單詳細資訊
    </h1>

    <section
      class="content_order mx-1rem mb-2rem h-100% flex flex-col overflow-y-auto rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(mb-0 px-1.25rem pb-1rem pt-2.25rem)"
    >
      <table>
        <thead>
          <tr class="thead_tr bg-neutral-200 text-neutral-600 lg:(bg-second-400)">
            <th
              class="rounded-0.25rem text-1.25rem lg:(w-37% rounded-r-0 text-1rem)"
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
        v-if="detail_order.orderStatus === 4"
        class="mt-2rem flex flex-col gap-1rem lg:(mb-0 mt-1.5rem flex-row items-start justify-between)"
      >
        <button
          type="button"
          class="transition-[border-color, text-color] order-2 hidden border border-neutral-300 rounded-0.25rem px-1rem pb-0.5rem pt-0.75rem text-neutral-400 lg:(order-1 flex) hover:(border-neutral-400 text-neutral-600)"
          @click="returnOrder()"
        >
          退貨
        </button>

        <div class="order-1 flex flex-col justify-between gap-1rem lg:(flex-row)">
          <p class="">喜歡之前購買的商品嗎？<br >給我們一個好評吧！</p>

          <NuxtLink
            :to="`/comment/${detail_order._id}`"
            class="transition-[background-color] flex cursor-pointer items-center justify-center rounded-0.25rem px-1rem py-0.75rem font-bold lg:(w-200px) !bg-orange-200 !hover:bg-orange-300"
          >
            評價
          </NuxtLink>
        </div>
      </div>
    </section>

    <section
      v-if="detail_order.orderStatus === 5 && data_comment?.data?.length"
      class="content_comment mx-1rem mb-1.5rem h-100% flex flex-col overflow-y-auto rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(mb-0 px-1.25rem pb-1rem pt-2.25rem)"
    >
      <h3
        class="rounded-0.25rem bg-neutral-200 pb-0.625rem pt-1rem text-center text-1.25rem text-neutral-600 font-400 lg:(rounded-r-0 bg-second-400 text-1rem)"
      >
        評價紀錄
      </h3>

      <ul class="mt-1rem flex flex-col gap-1rem">
        <template v-for="item in data_comment.data" :key="item.productId">
          <li class="flex items-center gap-1rem">
            <div class="w-30% flex-shrink-0 lg:(min-w-76px w-auto pl-1rem)">
              <img
                class="object-cover object-center lg:(h-3.75rem w-3.75rem)"
                :src="item.productId.imageGallery[0].imgUrl"
                alt="product image"
              >
            </div>

            <div class="flex flex-col gap-0.5rem lg:(flex-grow-1 flex-row)">
              <p class="line-clamp-2 lg:(w-100% flex items-center)">
                {{ item.productId.title }}
              </p>
              <div class="flex lg:(w-100%)">
                <div class="box_star flex justify-center flex-items-center">
                  <img
                    v-for="index in item.star"
                    :key="index"
                    src="/assets/img/icon/icon-star.svg"
                    alt="Star"
                  >
                  <img
                    v-for="index in 5 - item.star"
                    :key="index"
                    src="/assets/img/icon/icon-star-hollow.svg"
                    alt=""
                  >
                </div>
              </div>
              <p class="lg:(w-300%)">{{ item.comment }}</p>
            </div>
          </li>
        </template>
      </ul>
    </section>

    <section
      class="info_order mx-1rem flex flex-col rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(items-center px-1.5rem py-2rem)"
    >
      <ul
        class="list_info flex flex-col gap-1.5rem lg:(max-w-1200px w-100% flex-row justify-between gap-1rem)"
      >
        <li>
          <h3>訂單資訊</h3>
          <p>訂單編號：{{ detail_order._id }}</p>
          <p>訂單日期：{{ $dayjs(detail_order.createdAt).format("YYYY/MM/DD HH:mm") }}</p>
          <p>訂單狀態：{{ orderStatusTrans(detail_order.orderStatus) }}</p>
        </li>

        <li>
          <h3>顧客資訊</h3>
          <p>姓名：{{ detail_member.customerName }}</p>
          <p>電話號碼：{{ hideMobileNumber(detail_member.phone) }}</p>
        </li>

        <li>
          <h3>送貨資訊</h3>
          <p>收件人：{{ detail_order.deliveryUserName }}</p>
          <p>電話號碼：{{ hideMobileNumber(detail_order.deliveryPhone) }}</p>
          <p>
            地址：臺灣
            {{ detail_order.deliveryAddress.county }}
            {{ detail_order.deliveryAddress.district }}
            {{ detail_order.deliveryAddress.address }}
          </p>
        </li>
      </ul>
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
      ". sidebar comment comment ."
      ". sidebar info info .";
    grid-template-columns: 1fr 1.5fr 7fr 1.5fr 1fr;
    /* grid-template-rows: auto; */
    gap: 1rem 1rem;
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

.content_comment {
  @media screen and (min-width: 1024px) {
    grid-area: comment;
  }
}

.info_order {
  @media screen and (min-width: 1024px) {
    grid-area: info;
  }

  .list_info {
    > li {
      > h3 {
        @apply text-1.25rem font-600;

        @media screen and (min-width: 1024px) {
        }
      }
    }
  }
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
