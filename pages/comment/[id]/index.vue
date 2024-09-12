<script setup>
import Swal from "sweetalert2";

// -------------

const route = useRoute();
const id_order = route.params.id;
const id_customer = useCookie("id_customer");

const show_pending = ref(true);

const { data: data_unRateList, error: error_unRateList } = await useTokenFetch(
  `/comment/getNoCommentOrderIdList/${id_customer.value}`
);

// -------------
const currentOrder = ref({});
const { data: data_order, error: error_order } = await useTokenFetch(
  `/comment/getNoComment/${id_customer.value}/${id_order}`
);

currentOrder.value = data_order.value.data[0];

orderTrans();
onMounted(async () => {});

const getOrderDetail = async (id) => {
  const { data, error } = await useToken$Fetch(
    `/comment/getNoComment/${id_customer.value}/${id}`
  );

  currentOrder.value = data[0];
  orderTrans();
};

async function orderTrans() {
  show_pending.value = true;

  currentOrder.value.orderProductList.forEach((item) => {
    item.star = 0;
    item.hoverStar = 0;
    item.comment = "";
  });

  // step 1 get productInfoId -------
  // for (
  //   let index = 0;
  //   index < currentOrder.value.orderProductList.length;
  //   index++
  // ) {
  //   const { data } = await useToken$Fetch(
  //     `/product/${currentOrder.value.orderProductList[index].productId}`
  //   );

  //   currentOrder.value.orderProductList[index].productInfoId = data.productId;
  // }

  const list_productInfoId = [];
  const list_delete = [];
  const target = currentOrder.value.orderProductList;

  target.forEach((item, index) => {
    if (!list_productInfoId.includes(item.productInfoId))
      return list_productInfoId.push(item.productInfoId);

    const firstItem = target.find(
      (item2) => item2.productInfoId === item.productInfoId
    );

    firstItem.quantity += item.quantity;
    firstItem.list_weight = [item.weight];
    list_delete.push(index);
  });

  list_delete.sort((a, b) => b - a);
  list_delete.forEach((num) => target.splice(num, 1));

  show_pending.value = false;
}

// --------------------------------------------
const { data: data_member, error: error_member } = await useTokenFetch(
  `/customer/${id_customer.value}`
);
if (error_member.value)
  console.log("error_member.value :>> ", error_member.value);
const detail_member = data_member.value.data;

// --------------------------------------------
const { width: window_width } = useWindowSize();

// -------------

const hoverStar = (index, item) => {
  item.hoverStar = index;
  commentEmpty.value = false;
};

// -------
const commentEmpty = ref(false);
const list_promise = ref([]);

const commentSubmit = async () => {
  list_promise.value = [];
  // ---
  let empty = false;
  currentOrder.value.orderProductList.forEach((item) => {
    if (!item.star && !item.hoverStar) return (empty = true);
    if (!item.star && item.hoverStar) item.star = item.hoverStar;
  });
  if (empty) return (commentEmpty.value = true);

  const id_currentOrder = currentOrder.value._id;

  currentOrder.value.orderProductList.forEach((item) => {
    const param = {
      productId: item.productInfoId,
      orderId: id_currentOrder,
      customerId: id_customer.value,
      star: item.star,
      quantity: item.quantity,
      comment: item.comment,
    };

    list_promise.value.push(postComment(param));
  });

  const res = await Promise.all(list_promise.value);

  useToken$Fetch(`/orderStatus`, {
    method: "PATCH",
    body: { orderId: id_order, orderStatus: 5 },
  });

  await Swal.fire({
    // position: "top-end",
    icon: "success",
    title: "評價成功!",
    showConfirmButton: false,
    timer: 1000,
  });

  // after fetch handle -------
  navigateTo({ name: "order-list" });
};

async function postComment(param_post) {
  return useToken$Fetch(`/comment`, {
    method: "POST",
    body: param_post,
  });
}
</script>

<template>
  <LoadingPending :show="show_pending" />

  <div class="wrapper mx-auto mb-2rem max-w-1296px w-100%">
    <aside class="sidebar hidden flex-col items-center lg:(flex)">
      <p class="">待評價訂單</p>

      <ul
        class="mx-auto flex gap-1rem overflow-x-auto px-0.75rem py-0.5rem lg:(w-100% flex-col items-center)"
      >
        <template v-for="item in data_unRateList.data" :key="item">
          <li class="hover:()" @click="getOrderDetail(item)">{{ item }}</li>
        </template>
      </ul>
    </aside>

    <h1 class="title_h1 mx-auto my-1rem flex justify-center lg:(my-2rem)">
      給予評價
    </h1>

    <section
      class="content_order mx-1rem mb-1.5rem h-100% flex flex-col overflow-y-auto rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(mb-0 px-1.25rem pb-1rem pt-2.25rem)"
    >
      <table>
        <thead>
          <tr
            class="thead_tr bg-neutral-200 text-neutral-600 lg:(bg-second-400)"
          >
            <th
              class="rounded-0.25rem text-1.25rem lg:(w-37% rounded-l-0 rounded-l-0.25rem text-1rem)"
              :colspan="window_width < 1024 ? 1 : 2"
            >
              商品
            </th>
            <th class="hidden lg:(table-cell)">評分</th>
            <!-- <th class="hidden lg:(table-cell)"></th> -->
            <th class="hidden lg:(table-cell rounded-r-0.25rem)">內容</th>
          </tr>
        </thead>

        <tbody class="">
          <tr
            v-for="item in currentOrder.orderProductList"
            :key="item.productId"
            class="tbody_tr"
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
              <p class="">
                {{ item.weight }}g

                <template v-if="item?.list_weight?.length">
                  <span v-for="weight in item.list_weight" class=""
                    >{{ weight }}g</span
                  >
                </template>
              </p>
            </td>

            <td class="td_price flex items-end lg:(table-cell)">
              <div
                v-if="!item.star"
                class="box_star flex justify-center flex-items-center"
              >
                <img
                  v-for="index in item?.hoverStar"
                  :key="index"
                  src="/assets/img/icon/icon-star.svg"
                  alt=""
                  @mouseover="hoverStar(index, item)"
                  @click="item.star = index"
                >
                <img
                  v-for="index in 5 - item?.hoverStar"
                  :key="index"
                  src="/assets/img/icon/icon-star-hollow.svg"
                  alt=""
                  @mouseover="hoverStar(index + item.hoverStar, item)"
                  @click="item.star = index + item.hoverStar"
                >
              </div>
              <div
                v-else
                class="box_star flex justify-center flex-items-center"
              >
                <img
                  v-for="index in item.star"
                  :key="index"
                  src="/assets/img/icon/icon-star.svg"
                  alt="Star"
                  @click="item.star = index"
                >
                <img
                  v-for="index in 5 - item.star"
                  :key="index"
                  src="/assets/img/icon/icon-star-hollow.svg"
                  alt=""
                  @click="item.star = index + item.star"
                >
              </div>
            </td>

            <td class="">
              <textarea
                v-model="item.comment"
                rows="4"
                class="block w-full border border-gray-300 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400"
                placeholder="(選填)請跟我們分享你的評價!"
                maxlength="500"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div
      class="btn_comment mb-1.5rem mr-1rem flex flex-col items-end lg:(mb-0)"
    >
      <button
        type="button"
        class="transition-[background-color] w-200px flex cursor-pointer items-center justify-center rounded-0.25rem px-1rem py-0.75rem font-bold lg:(w-200px) !bg-orange-200 !hover:bg-orange-300"
        @click="commentSubmit()"
      >
        評價
      </button>
      <p v-show="commentEmpty" class="mt-0.25rem text-0.875rem text-rose-400">
        請點選星星評價後送出
      </p>
    </div>

    <section
      class="info_order mx-1rem flex flex-col rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(items-center px-1.5rem py-2rem)"
    >
      <ul
        class="list_info flex flex-col gap-1.5rem lg:(max-w-1200px w-100% flex-row justify-between gap-1rem)"
      >
        <li>
          <h3>訂單資訊</h3>
          <p>訂單編號：{{ currentOrder._id }}</p>
          <p>
            訂單日期：{{
              $dayjs(currentOrder.createdAt).format("YYYY/MM/DD HH:mm")
            }}
          </p>
          <p>訂單狀態：{{ orderStatusTrans(currentOrder.orderStatus) }}</p>
        </li>

        <li>
          <h3>顧客資訊</h3>
          <p>姓名：{{ detail_member.customerName }}</p>
          <p>電話號碼：{{ hideMobileNumber(detail_member.phone) }}</p>
        </li>

        <li>
          <h3>送貨資訊</h3>
          <p>收件人：{{ currentOrder.deliveryUserName }}</p>
          <p>電話號碼：{{ hideMobileNumber(currentOrder.deliveryPhone) }}</p>
          <p>
            地址：臺灣
            {{ currentOrder.deliveryAddress.county }}
            {{ currentOrder.deliveryAddress.district }}
            {{ currentOrder.deliveryAddress.address }}
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 2px solid #690461;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50% !important;
    text-align: left !important;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "商品資料";
    color: #525252;
  }
  td:nth-of-type(2):before {
    content: "評分";
    color: #525252;
  }
  td:nth-of-type(3):before {
    content: "內容";
    color: #525252;
  }
} */

.wrapper {
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-areas:
      ". title title title ."
      ". sidebar content content ."
      ". sidebar . button ."
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
      @apply whitespace-nowrap cursor-pointer;
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

.btn_comment {
  @media screen and (min-width: 1024px) {
    grid-area: button;
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
    "img price quantity";

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
    display: table-row !important;

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

/*  */
.box_star {
  > img {
    @apply w-1.75rem cursor-pointer;
  }
}
</style>
