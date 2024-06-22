<script setup>
const id_order = useCookie("id_order");
console.log("id_order.value :>> ", id_order.value);

const { data: data_order, error: error_order } = await useTokenFetch(
  `/order/${id_order.value}`
);

console.log("data_order.value :>> ", data_order.value);
console.log("error_order.value :>> ", error_order.value);

const { orderProductList: data_cart } = data_order.value.data[0];

const { width: window_width } = useWindowSize();
</script>

<template>
  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-1rem px-0.75rem py-3rem lg:(gap-1.5rem)"
  >
    <section
      class="flex flex-col gap-1rem rounded-1rem bg-second-400 px-1rem py-1.5rem text-neutral-600 lg:(gap-1rem px-1.75rem py-2.5rem)"
    >
      <div class="flex items-center justify-center gap-1.5rem text-1.5rem">
        <SvgIcon name="shipping" class="h-2.5rem w-2.5rem lg:(h-3.5rem w-3.5rem)" />
        <p class="">感謝您的購買！</p>
      </div>

      <div
        class="flex items-end justify-center gap-1.5rem rounded-0.25rem bg-neutral-50 p-0.75rem"
      >
        <p class="text-1.25rem text-neutral-600">總金額</p>
        <p class="text-rose-500">
          NT$
          <span class="ml-0.25rem text-2rem line-height-120%">{{
            addThousandPoint(totalPrice(data_cart))
          }}</span>
        </p>
      </div>
    </section>

    <section
      class="h-100% flex flex-col rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(px-2rem py-2.25rem)"
    >
      <table>
        <thead>
          <tr class="thead_tr bg-neutral-200 text-neutral-600 lg:(bg-second-400)">
            <th
              class="rounded-0.25rem text-1.25rem lg:(w-37% rounded-l-0.25rem rounded-r-0 text-1rem)"
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
          <tr v-for="item in data_cart" :key="item.id" class="tbody_tr">
            <td class="td_img mr-1rem lg:(min-w-76px)">
              <img
                class="h-100% object-cover object-center lg:(h-5rem w-5rem)"
                :src="item.coverImg"
                alt="product image"
              />
            </td>
            <td class="td_content lg:(text-1.25rem)">
              <p class="line-clamp-2">
                {{ item.productTitle }}
              </p>
              <p>{{ item.weight }}g</p>
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

            <td class="td_total mt-0.5rem lg:(mt-0)">
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
    </section>

    <NuxtLink
      :to="{ name: 'index' }"
      class="w-100% flex items-center justify-center gap-0.5rem rounded-0.25rem bg-rose-200 p-1rem text-1.25rem text-red-500 transition-colors lg:(mx-auto max-w-300px gap-1rem p-1rem) hover:(bg-rose-600 text-neutral-50)"
    >
      <SvgIcon name="cart" class="h-1.5rem w-1.5rem lg:(h-1.75rem w-1.75rem)" />
      <p class="">更多好物</p>
    </NuxtLink>
  </div>
</template>

<style scoped>
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
    top: -2px;
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
    @apply lg:([&:nth-child(1)]-pr-0 px-1rem py-2.5rem);
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
