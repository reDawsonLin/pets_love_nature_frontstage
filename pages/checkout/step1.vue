<script setup>
import tw_postal_code from "@/assets/json/tw_postal_code.json";
import { useStoreCheckout } from "@/stores/storeCheckout";
import { useStoreCart } from "~/stores/storeCart";

import { object, string, mixed } from "yup";

definePageMeta({ middleware: "need-login" });

const storeCart = useStoreCart();
const { data_checkoutCart } = storeToRefs(storeCart);

const store_checkout = useStoreCheckout();
const { param_post } = storeToRefs(store_checkout);
const { intParamPost } = store_checkout;

// member -------
// check member store have data or not ---
const id_customer = useCookie("id_customer");
const { data: data_member, error: error_member } = await useTokenFetch(
  `/customer/${id_customer.value}`
);
if (error_member.value) console.log("error_member.value :>> ", error_member.value);

const {
  deliveryAddress: { county, district, address },
  email,
  recipientName,
  recipientPhone,
} = data_member.value.data;

const same_member = ref(false);
const memberSame = () => {
  if (same_member.value) {
    if (email) param_post.value.Email = email;
    if (recipientName) param_post.value.deliveryUserName = recipientName;
    if (recipientPhone) param_post.value.deliveryPhone = recipientPhone;
    if (county) param_post.value.deliveryAddress.county = county;
    if (district) param_post.value.deliveryAddress.district = district;
    if (address) param_post.value.deliveryAddress.address = address;
  } else {
    param_post.value.Email = "";
    param_post.value.deliveryUserName = "";
    param_post.value.deliveryPhone = "";
    param_post.value.deliveryAddress.county = "";
    param_post.value.deliveryAddress.district = "";
    param_post.value.deliveryAddress.address = "";
  }
};

// cart -------
const data_cart = ref();
if (import.meta.client) cartToParamPost();

function cartToParamPost() {
  intParamPost();
  data_cart.value = JSON.parse(sessionStorage.getItem("checkout_cart"));

  let data_source;

  if (data_checkoutCart.value?.length) {
    if (!data_cart.value) data_cart.value = data_checkoutCart.value;

    data_source = data_checkoutCart.value;
  } else if (data_cart.value?.length) {
    data_source = data_cart.value;
  } else {
    navigateTo({ name: "shopping-cart" });
  }

  param_post.value.Amt = totalPrice(data_source);
  param_post.value.ItemDesc = data_source.map((item) => item.title).join(",");
  param_post.value.userId = id_customer.value;
  param_post.value.orderProductList = data_source.map((item) => ({
    productId: item._id,
    productTitle: item.title,
    price: item.price,
    quantity: item.quantity,
    coverImg: item.imageGallery[0].imgUrl,
    weight: item.weight,
  }));
}

const countyChange = () => {
  param_post.value.deliveryAddress.district = "";
};

// postal dropdown -------
const current_district = computed(() => {
  const result = tw_postal_code.find(
    (item) => item.name === param_post.value.deliveryAddress.county
  );

  if (param_post.value.deliveryAddress.county) return result.districts;
  else return null;
});

// 選擇滑窗
const show_modal = ref(false);
const openModal = () => {
  document.querySelector("body").classList.add("stopScroll");
  show_modal.value = true;
};

const closeModal = () => {
  document.querySelector("body").classList.remove("stopScroll");
  show_modal.value = false;
};

const { width: window_width } = useWindowSize();

// -------
const schema = object({
  deliveryUserName: string().required("此為必填欄位"),
  deliveryPhone: string().required("此為必填欄位"),
  Email: string().email("email 格式錯誤").required("此為必填欄位"),
  delivery_county: mixed().test(
    "required",
    "此為必填欄位",
    () => param_post.value.deliveryAddress.county
  ),
  delivery_district: mixed().test(
    "required",
    "此為必填欄位",
    () => param_post.value.deliveryAddress.district
  ),
  delivery_address: string().required("此為必填欄位"),
});

// --------
// const param_post_step1 = useCookie("param_post_step1");
// param_post_step1.value = null;

const formSubmit = async () => {
  sessionStorage.setItem("param_post_step1", JSON.stringify(param_post.value));

  await nextTick();

  navigateTo({ name: "checkout-step2" });
};

const onInvalidSubmit = (errors) => {
  console.log("errors :>> ", errors);
};
</script>

<template>
  <Teleport to="body">
    <ClientOnly>
      <div
        class="bg_blur pointer-events-none fixed inset-0 z-10 bg-neutral-500/80 opacity-0 backdrop-blur-5px"
        :class="show_modal ? 'opacity-100 pointer-events-unset' : ''"
        @click.self="closeModal()"
      >
        <div
          class="modal_cart fixed left-50% top-50% z-11 h-fit max-h-80% max-w-1064px w-[calc(100%-2rem)] flex flex-col translate--50% lg:(max-h-1087px)"
        >
          <SvgIcon
            name="close"
            class="absolute right--4px top--2.5rem z-11 h-2rem w-2rem cursor-pointer text-neutral-50 text-neutral-50"
            @click="closeModal()"
          />

          <section
            class="h-100% flex flex-col overflow-y-auto rounded-0.5rem bg-neutral-50 px-1rem py-1.5rem lg:(px-2rem py-2.25rem)"
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
                <tr v-for="item in data_cart" :key="item.id" class="tbody_tr mb-1.5rem">
                  <td class="td_img mr-1rem lg:(min-w-76px)">
                    <img
                      class="h-100% object-cover object-center lg:(h-3.75rem w-3.75rem)"
                      src="@/assets/img/product-1.png"
                      alt="product image"
                    >
                  </td>
                  <td class="td_content">
                    <p class="line-clamp-2">
                      {{ item.title }}
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
                    <p
                      class="flex items-end justify-end text-rose-500 lg:(justify-center)"
                    >
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
                    addThousandPoint(totalPrice(data_cart))
                  }}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ClientOnly>
  </Teleport>

  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <section
      class="group transition-background info_cart flex flex-col cursor-pointer gap-1.5rem rounded-1rem bg-second-400 px-1rem py-1.5rem text-neutral-600 transition-colors hover:(bg-neutral-600 text-neutral-50) lg:(px-1.75rem py-2.5rem)"
      @click="openModal()"
    >
      <SvgIcon name="cart" class="mx-auto h-3.75rem w-3.75rem lg:(h-6.25rem w-6.25rem)" />

      <div class="">
        <p class="mb-0.75rem flex justify-center text-1.5rem">
          購物車（{{ data_cart?.length }}件）
        </p>
        <div
          class="flex items-end justify-center gap-1.5rem rounded-0.25rem bg-neutral-50 p-0.75rem group-hover:(bg-neutral-200)"
        >
          <p class="text-1.25rem text-neutral-600">總金額</p>
          <p class="text-rose-500">
            NT$
            <span class="ml-0.25rem text-2rem line-height-120%">{{
              addThousandPoint(totalPrice(data_cart))
            }}</span>
          </p>
        </div>
      </div>
    </section>

    <section class="box_card info_address">
      <div class="form_title">
        <p class="text-1.25rem lg:(text-1.5rem)">收件人資料</p>

        <label
          class="box_checkbox flex cursor-pointer items-center"
          @change="memberSame()"
        >
          <input
            v-model="same_member"
            type="checkbox"
            name="same_member"
            class="hidden"
          >

          <SvgIcon
            :name="same_member ? 'checkbox_check' : 'checkbox_empty'"
            class="empty lg(w-1.25rem ) mr-0.5rem h-1.125rem h-1.25rem w-1.125rem"
          />

          <p class="text-0.875rem lg:(text-1rem)">與個人資料相同</p>
        </label>
      </div>

      <VeeForm
        id="form_recipient"
        v-slot="{ errors }"
        name="form_recipient"
        class="flex flex-col gap-1rem px-0.75rem lg:(gap-1.5rem)"
        :validation-schema="schema"
        @submit="formSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="flex flex-col gap-1rem lg:(flex-row gap-1.5rem)">
          <label
            class="box_input flex-grow-1"
            :class="{ error: errors?.deliveryUserName }"
          >
            <p class="mb-0.25rem ml-2px">
              姓名
              <sup class="text-rose-500">*</sup>
            </p>

            <VeeField
              v-model="param_post.deliveryUserName"
              name="deliveryUserName"
              type="text"
              placeholder="請輸入姓名"
              class="border border-(2px neutral-200) rounded-0.5rem p-1rem px-0.75rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
              :class="{ 'border-rose-500': errors?.deliveryUserName }"
            />

            <VeeErrorMessage
              name="deliveryUserName"
              class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
            />
          </label>

          <label class="box_input flex-grow-1" :class="{ error: errors?.deliveryPhone }">
            <p class="mb-0.25rem ml-2px">
              手機
              <sup class="text-rose-500">*</sup>
            </p>

            <VeeField
              v-model="param_post.deliveryPhone"
              name="deliveryPhone"
              type="text"
              placeholder="請輸入手機"
              class="border border-(2px neutral-200) rounded-0.5rem p-1rem px-0.75rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
              :class="{ 'border-rose-500': errors?.deliveryPhone }"
              @keypress="numberOnly($event)"
            />

            <VeeErrorMessage
              name="deliveryPhone"
              class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
            />
          </label>
        </div>

        <label class="box_input flex-grow-1" :class="{ error: errors?.Email }">
          <p class="mb-0.25rem ml-2px">
            電子郵件
            <sup class="text-rose-500">*</sup>
          </p>

          <VeeField
            v-model="param_post.Email"
            name="Email"
            type="text"
            placeholder="請輸入電子郵件"
            class="border border-(2px neutral-200) rounded-0.5rem p-1rem px-0.75rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
            :class="{ 'border-rose-500': errors?.Email }"
          />

          <VeeErrorMessage
            name="Email"
            class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
          />
        </label>

        <div class="flex flex-col">
          <p class="mb-0.25rem ml-2px">地址 <sup class="text-rose-500">*</sup></p>

          <div class="mb-1rem flex gap-0.5rem">
            <div class="wrapper_select flex-grow-1">
              <div class="box_select relative flex flex-col">
                <VeeField
                  v-model="param_post.deliveryAddress.county"
                  as="select"
                  name="delivery_county"
                  class="select border border-(2px neutral-200) rounded-0.5rem p-1rem pb-0.75rem pr-2.25rem text-0.875rem placeholder:(text-neutral-400) focus:(outline-neutral-400)"
                  :class="{
                    'text-neutral-400': !param_post.deliveryAddress.county,
                    'border-rose-500': errors?.delivery_county,
                  }"
                  @change="countyChange()"
                >
                  <option value="" selected disabled hidden>縣市</option>
                  <template v-for="item in tw_postal_code" :key="item.name">
                    <option :value="item.name" class="text-neutral-600">
                      {{ item.name }}
                    </option>
                  </template>
                </VeeField>

                <SvgIcon
                  name="arrow_down"
                  class="absolute right-1rem top-45% w-1rem text-neutral-600"
                />
              </div>

              <VeeErrorMessage
                name="delivery_county"
                class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
              />
            </div>

            <div
              class="wrapper_select flex-grow-1"
              :class="{
                'opacity-50 pointer-events-none': !param_post.deliveryAddress.county,
              }"
            >
              <div class="box_select relative flex flex-col">
                <VeeField
                  v-model="param_post.deliveryAddress.district"
                  as="select"
                  name="delivery_district"
                  class="select border border-(2px neutral-200) rounded-0.5rem p-1rem pb-0.75rem pr-2.25rem text-0.875rem placeholder:(text-neutral-400) focus:(outline-neutral-400)"
                  :class="{
                    'text-neutral-400': !param_post.deliveryAddress.district,
                    'border-rose-500': errors?.delivery_district,
                  }"
                >
                  <option value="" selected disabled hidden>鄉鎮市區</option>
                  <template v-for="dist in current_district" :key="dist.zip">
                    <option :value="dist.name" class="text-neutral-600">
                      {{ dist.name }}
                    </option>
                  </template>
                </VeeField>

                <SvgIcon
                  name="arrow_down"
                  class="absolute right-1rem top-45% w-1rem text-neutral-600"
                />
              </div>

              <VeeErrorMessage
                name="delivery_county"
                class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
              />
            </div>
          </div>

          <label
            class="box_input flex-grow-1"
            :class="{ error: errors?.delivery_address }"
          >
            <VeeField
              v-model="param_post.deliveryAddress.address"
              name="delivery_address"
              type="text"
              placeholder="里(村)/路(街)/號/樓(室) (必填)"
              class="border border-(2px neutral-200) rounded-0.5rem p-1rem px-0.75rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
              :class="{ 'border-rose-500': errors?.delivery_address }"
            />

            <VeeErrorMessage
              name="delivery_address"
              class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
            />
          </label>
        </div>
      </VeeForm>
    </section>

    <div
      class="box_btn flex flex-col gap-1.5rem text-1.25rem lg:(flex-row justify-between gap-1rem)"
    >
      <NuxtLink
        :to="{ name: 'shopping-cart' }"
        class="order-2 flex items-center justify-center gap-1rem rounded-0.25rem bg-neutral-50 p-1rem text-neutral-600 lg:(order-1 px-3rem)"
      >
        <SvgIcon name="arrow_left" class="w-0.5rem" />
        返回購物車
      </NuxtLink>

      <button
        type="submit"
        form="form_recipient"
        class="order-1 flex items-center justify-center gap-1rem rounded-0.25rem p-1rem text-neutral-50 lg:(order-2 px-3rem) !bg-neutral-600"
      >
        下一步，結帳付款
        <SvgIcon name="arrow_right" class="w-0.5rem" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.box_input {
  @apply flex flex-col;

  &.error {
    @apply text-rose-500;

    input {
      @apply border-rose-500 caret-rose-500;

      &:focus {
        @apply outline-rose-500;
      }
    }
  }
}

.select {
  appearance: none;
}

.box_card {
  @apply flex flex-col gap-1.25rem px-1rem py-1.5rem bg-neutral-50 rounded-0.5rem;
  @apply lg:(px-1.75rem py-2.5rem gap-2.25rem);
}

.form_title {
  @apply flex justify-between items-center p-1rem text-neutral-600 bg-neutral-200 rounded-0.5rem;
  @apply pb-0.75rem;
}

.wrapper_step1 {
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-areas:
      "address cart"
      "address  payment"
      "button   button";
    grid-template-columns: repeat(1fr, 0.8fr);
    gap: 1.5rem;
  }
}

.info_address {
  @media screen and (min-width: 1024px) {
    grid-area: address;
  }
}

.info_cart {
  @media screen and (min-width: 1024px) {
    grid-area: cart;
  }
}

.info_payment {
  @media screen and (min-width: 1024px) {
    grid-area: payment;
  }
}

.box_btn {
  @media screen and (min-width: 1024px) {
    grid-area: button;
  }
}

/* // modal part -------
.bg_blur {
} */

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
</style>
