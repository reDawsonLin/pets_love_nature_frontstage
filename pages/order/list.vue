<script setup>
import { useCookie } from "nuxt/app";

const id_customer = useCookie("id_customer");

const { data: data_orders, error: error_orders } = await useTokenFetch(
  `/orders/${id_customer.value}`
);

const { data: data_orderList } = data_orders.value;
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

    <h1 class="title_h1 mx-auto my-1rem flex justify-center lg:(my-2rem)">訂單記錄</h1>

    <section
      class="list_order mx-1rem mb-2rem h-70vh flex flex-col overflow-y-auto border rounded-0.25rem px-1rem py-1.5rem lg:(mx-0 overflow-y-auto p-0)"
    >
      <table>
        <thead class="hidden lg:(table-header-group)">
          <tr class="thead_tr bg-neutral-400 text-neutral-600">
            <th class="">訂單編號</th>
            <th class="">訂單日期</th>
            <th class="">合計</th>
            <th class="">訂單狀態</th>
            <th class="lg:(w-90px)">操作</th>
          </tr>
        </thead>

        <tbody class="flex flex-col gap-1.25rem lg:(table-row-group)">
          <tr v-for="item in data_orderList" :key="item.id" class="tbody_tr">
            <td>
              <p class="" data-title="訂單編號">
                {{ item._id }}
              </p>
            </td>
            <td class="">
              <p class="" data-title="訂單日期">
                {{ $dayjs(item.orderDate).format("YYYY/MM/DD HH:mm") }}
              </p>
            </td>
            <td class="">
              <p class="" data-title="合計">
                NT${{ addThousandPoint(item.orderAmount) }}
              </p>
            </td>
            <td class="">
              <p class="" data-title="訂單狀態">
                {{ orderStatusTrans(item.orderStatus) }}
              </p>
            </td>
            <td class="p-0">
              <NuxtLink :to="`/order/${item._id}`" class="button">操作</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-areas:
      ". title title title ."
      ". sidebar content content .";
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

.list_order {
  @media screen and (min-width: 1024px) {
    grid-area: content;
  }
}

.thead_tr {
  th {
    @apply lg:(py-0.75rem px-0.5rem);
  }
}

.tbody_tr {
  @apply bg-neutral-100 rounded-0.5rem flex flex-col py-1rem px-0.75rem;
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
  }
}
</style>
