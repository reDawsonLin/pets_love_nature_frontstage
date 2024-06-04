<script setup>
const show_cart = () => {
  console.log("show cart");
};

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

const dummy_cart = ref([
  {
    id: 1,
    imgUrl: "",
    productName: "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
    price: 450,
    amount: 1,
  },
  {
    id: 2,
    imgUrl: "",
    productName: "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
    price: 450,
    amount: 2,
  },
  {
    id: 3,
    imgUrl: "",
    productName: "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
    price: 450,
    amount: 3,
  },
  {
    id: 4,
    imgUrl: "",
    productName: "控味健康肉棒-寵物的健康小吃控味健康肉棒-寵物的健康小吃",
    price: 450,
    amount: 4,
  },
]);

const totalPrice = (cart) => {
  let result = null;

  cart.forEach((item) => {
    result += item.price * item.amount;
  });
  return result;
};

// -------
const same_member = ref(false);
const param_post = ref({
  name: "",
  phoneNumber: "",
  email: "",
  city: "",
  town: "",
  address: "",
  receipt: "",
  payment_method: "",
});
</script>

<template>
  <div class="bg_blur bg-neutral-500/80 fixed inset-0 z-10 backdrop-blur-5px" />

  <div
    class="modal_cart fixed top-50% left-50% z-11 translate--50% max-h-1087px h-80% w-[calc(100%-2rem)] max-w-1064px"
  >
    <SvgIcon
      name="close"
      class="absolute right--4px top--2.5rem z-11 text-neutral-50 w-2rem h-2rem text-neutral-50"
    />

    <section
      class="bg-neutral-50 overflow-y-auto h-100% py-1.5rem px-1rem rounded-0.5rem flex flex-col"
    >
      <p
        class="hidden bg-neutral-200 text-neutral-600 text-1.25rem p-0.5rem rounded-0.5rem"
      >
        商品
      </p>

      <table>
        <thead>
          <tr class="thead_tr">
            <th
              class="rounded-0.25rem text-1.25rem lg:(text-1rem rounded-l-0.25rem w-35%)"
            >
              商品
            </th>
            <th class="hidden">單價</th>
            <th class="hidden">數量</th>
            <th class="hidden lg:(rounded-r-0.25rem)">總計</th>
          </tr>
        </thead>

        <tbody class="">
          <tr v-for="item in dummy_cart" :key="item.id" class="tbody_tr">
            <td class="px-1rem py-4.5rem">
              <div class="box_td flex items-center gap-1rem">
                <img
                  class="w-3.75rem h-3.75rem object-cover object-center"
                  src="@/assets/img/product-1.png"
                  alt="product image"
                />
                <p class="line-clamp-2">
                  {{ item.productName }}
                </p>
              </div>
            </td>
            <td class="text-center">
              <p class="">
                NT$
                <span class="ml-0.25rem text-1.5rem line-height-120%">{{
                  addThousandPoint(item.price)
                }}</span>
              </p>
            </td>
            <td class="text-1.5rem text-center">{{ item.amount }}</td>
            <td class="text-center">
              <p class="text-rose-500">
                NT$
                <span class="ml-0.25rem text-1.5rem line-height-120%">{{
                  addThousandPoint(item.price * item.amount)
                }}</span>
              </p>
            </td>
          </tr>
        </tbody>

        <tfoot></tfoot>
      </table>

      <!-- <ul class="mb-1.5rem">
      <li class="flex flex-col gap-1.5rem py-1rem px-0.5rem">
        <div class="flex"></div>
  
        <div class="flex items-end justify-end gap-0.25rem pr-0.5rem">
          <p class="text-neutral-600">總計</p>
          <p class="text-rose-500">
            NT$
            <span class="ml-0.25rem text-1.5rem line-height-120%">{{
              addThousandPoint(450)
            }}</span>
          </p>
        </div>
      </li>
    </ul> -->

      <div
        class="flex items-end justify-center gap-1rem rounded-0.5rem p-1.5rem border border-neutral-200"
      >
        <p class="text-1.25rem text-neutral-600">總金額</p>
        <p class="text-rose-500">
          NT$
          <span class="ml-0.25rem text-1.5rem line-height-120%">{{
            addThousandPoint(totalPrice(dummy_cart))
          }}</span>
        </p>
      </div>
    </section>
  </div>

  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <section
      class="group info_cart transition-background flex flex-col cursor-pointer gap-1.5rem rounded-1rem bg-second-400 px-1rem py-1.5rem text-neutral-600 transition-colors hover:(bg-neutral-600 text-neutral-50) lg:(px-1.75rem py-2.5rem)"
      @click="show_cart()"
    >
      <SvgIcon
        name="cart"
        class="mx-auto h-3.75rem w-3.75rem lg:(h-6.25rem w-6.25rem)"
      />

      <div class="">
        <p class="mb-0.75rem flex justify-center text-1.5rem">購物車（2件）</p>
        <div
          class="flex items-end justify-center gap-1.5rem rounded-0.25rem bg-neutral-50 p-0.75rem group-hover:(bg-neutral-200)"
        >
          <p class="text-1.25rem text-neutral-600">總金額</p>
          <p class="text-rose-500">
            NT$
            <span class="ml-0.25rem text-2rem line-height-120%">{{
              addThousandPoint(1904)
            }}</span>
          </p>
        </div>
      </div>
    </section>

    <section class="box_card info_address">
      <div class="form_title">
        <p class="text-1.25rem lg:(text-1.5rem)">收件人資料</p>

        <label class="box_checkbox flex cursor-pointer items-center">
          <input
            v-model="same_member"
            type="checkbox"
            name="same_member"
            class="hidden"
          />

          <SvgIcon
            :name="same_member ? 'checkbox_check' : 'checkbox_empty'"
            class="empty lg(w-1.25rem ) mr-0.5rem h-1.125rem h-1.25rem w-1.125rem"
          />

          <p class="text-0.875rem lg:(text-1rem)">與個人資料相同</p>
        </label>
      </div>

      <form
        name="form_recipient"
        class="flex flex-col gap-1rem px-0.75rem lg:(gap-1.5rem)"
      >
        <div class="flex flex-col gap-1rem lg:(flex-row gap-1.5rem)">
          <InputText
            name="recipient"
            placeholder="請輸入姓名"
            required
            input-type="text"
            label-name="姓名"
            class="flex-grow-1"
          />

          <InputText
            name="mobile-phone"
            placeholder="請輸入手機"
            required
            input-type="text"
            label-name="手機"
            class="flex-grow-1"
          />
        </div>

        <InputText
          name="email"
          placeholder="請輸入電子郵件"
          required
          input-type="email"
          label-name="電子郵件"
        />

        <div class="flex flex-col">
          <p class="mb-0.25rem ml-2px">
            地址 <sup class="text-rose-500">*</sup>
          </p>

          <div class="mb-1rem flex gap-0.5rem">
            <InputSelect
              v-model="param_post.city"
              select-name="select_city"
              class="flex-grow-1"
            >
              <option value="" selected disabled hidden>縣市</option>
              <option value="123" class="text-neutral-600">123</option>
              <option value="223" class="text-neutral-600">223</option>
              <option value="323" class="text-neutral-600">323</option>
            </InputSelect>

            <InputSelect
              v-model="param_post.town"
              select-name="select_town"
              class="flex-grow-1"
            >
              <option value="" selected disabled hidden>鄉鎮市區</option>
              <option value="123" class="text-neutral-600">123</option>
              <option value="223" class="text-neutral-600">223</option>
              <option value="323" class="text-neutral-600">323</option>
            </InputSelect>
          </div>

          <InputText
            name="mobile-phone"
            placeholder="里(村)/路(街)/號/樓(室) (必填)"
            input-type="text"
          />
        </div>

        <div class="box_select flex flex-col">
          <p class="mb-0.25rem ml-2px">
            發票<sup class="text-rose-500">*</sup>
          </p>

          <InputSelect
            v-model="param_post.receipt"
            select-name="select_town"
            class="flex-grow-1"
          >
            <option value="" selected disabled hidden>發票類型</option>
            <option value="123" class="text-neutral-600">123</option>
            <option value="223" class="text-neutral-600">223</option>
            <option value="323" class="text-neutral-600">323</option>
          </InputSelect>
        </div>
      </form>
    </section>

    <!-- <section class="box_card info_payment">
      <div class="form_title">
        <p class="text-1.25rem lg:(text-1.5rem)">付款方式</p>
      </div>

      <div class="flex flex-col gap-1rem px-0.75rem text-1.25rem lg:(gap-1.5rem)">
        <InputRadio v-model="param_post.payment_method" radio-name="payment_method"
          >信用卡</InputRadio
        >

        <InputRadio v-model="param_post.payment_method" radio-name="payment_method"
          >Line Pay</InputRadio
        >

        <InputRadio v-model="param_post.payment_method" radio-name="payment_method"
          >街口支付</InputRadio
        >
      </div>
    </section> -->

    <div
      class="box_btn flex flex-col gap-1.5rem text-1.25rem lg:(flex-row justify-between gap-1rem)"
    >
      <NuxtLink
        :to="{ name: 'shopping-cart' }"
        class="flex items-center justify-center gap-1rem rounded-0.25rem bg-neutral-50 p-1rem text-neutral-600 lg:(px-3rem)"
      >
        <SvgIcon name="arrow_left" class="w-0.5rem" />
        返回購物車
      </NuxtLink>

      <NuxtLink
        :to="{ name: 'checkout-step2' }"
        class="flex items-center justify-center gap-1rem rounded-0.25rem bg-neutral-600 p-1rem text-neutral-50 lg:(px-3rem)"
      >
        下一步，結帳付款
        <SvgIcon name="arrow_right" class="w-0.5rem" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
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

.thead_tr {
  @apply text-neutral-600 bg-neutral-200;

  @media screen and (min-width: 1024px) {
    @apply bg-second-400;

    /* display: grid;
    grid-template-areas:
      "address cart"
      "address  payment"
      "button   button";
    grid-template-columns: repeat(1fr, 0.8fr);
    gap: 1.5rem; */
  }

  > th {
    @apply font-400 pt-1rem pb-0.625rem;
  }
}

.tbody_tr {
  display: grid;
}
</style>
