<script setup>
const show_cart = () => {
  console.log("show cart");
};

// 選擇滑窗
const show_slide = ref(false);
const openModal = () => {
  document.querySelector("body").classList.add("stopScroll");
  show_slide.value = true;
};

const closeModal = () => {
  document.querySelector("body").classList.remove("stopScroll");
  show_slide.value = false;
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
  <div
    class="wrapper_step1 flex flex-col gap-2rem py-3rem px-0.75rem max-w-1076px mx-auto lg:()"
  >
    <section
      class="info_cart flex flex-col gap-1.5rem bg-second-400 rounded-1rem px-1rem py-1.5rem text-neutral-600 cursor-pointer group hover:(bg-neutral-600 text-neutral-50) transition-background transition-colors"
      @click="show_cart()"
    >
      <SvgIcon name="cart" class="w-3.75rem h-3.75rem mx-auto" />

      <div class="">
        <p class="flex justify-center mb-0.75rem text-1.5rem">購物車（2件）</p>
        <div
          class="flex justify-center items-end gap-1.5rem p-0.75rem bg-neutral-50 rounded-0.25rem group-hover:(bg-neutral-200)"
        >
          <p class="text-1.25rem text-neutral-600">總金額</p>
          <p class="text-rose-500">
            NT$
            <span class="text-2rem line-height-120% ml-0.25rem">{{
              addThousandPoint(1904)
            }}</span>
          </p>
        </div>
      </div>
    </section>

    <section class="box_card info_address">
      <div
        class="form_title flex justify-between items-center p-1rem text-neutral-600 bg-neutral-200 rounded-0.5rem"
      >
        <p class="text-1.25rem">收件人資料</p>

        <label
          class="box_checkbox flex items-center text-0.875rem cursor-pointer"
        >
          <input
            v-model="same_member"
            type="checkbox"
            name="same_member"
            class="hidden"
          />

          <SvgIcon
            :name="same_member ? 'checkbox_check' : 'checkbox_empty'"
            class="empty w-1.125rem h-1.125rem mr-0.5rem"
          />

          <p class="">與個人資料相同</p>
        </label>
      </div>

      <form name="form_recipient" class="px-0.75rem flex flex-col gap-1rem">
        <InputText
          name="recipient"
          placeholder="請輸入姓名"
          required
          input-type="text"
          label-name="姓名"
        />

        <InputText
          name="mobile-phone"
          placeholder="請輸入手機"
          required
          input-type="text"
          label-name="手機"
        />

        <InputText
          name="email"
          placeholder="請輸入電子郵件"
          required
          input-type="email"
          label-name="電子郵件"
        />

        <div class="flex flex-col">
          <p class="ml-2px mb-0.25rem">
            地址 <sup class="text-rose-500">*</sup>
          </p>

          <div class="flex gap-0.5rem mb-1rem">
            <InputSelect
              selectName="select_city"
              v-model="param_post.city"
              class="flex-grow-1"
            >
              <option value="" selected disabled hidden>縣市</option>
              <option value="123" class="text-neutral-600">123</option>
              <option value="223" class="text-neutral-600">223</option>
              <option value="323" class="text-neutral-600">323</option>
            </InputSelect>

            <InputSelect
              selectName="select_town"
              v-model="param_post.town"
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

        <InputSelect
          selectName="select_town"
          v-model="param_post.receipt"
          class="flex-grow-1"
        >
          <option value="" selected disabled hidden>發票類型</option>
          <option value="123" class="text-neutral-600">123</option>
          <option value="223" class="text-neutral-600">223</option>
          <option value="323" class="text-neutral-600">323</option>
        </InputSelect>
      </form>
    </section>

    <section class="box_card info_payment">
      <div
        class="form_title flex justify-between items-center p-1rem text-neutral-600 bg-neutral-200 rounded-0.5rem"
      >
        <p class="text-1.25rem">付款方式</p>
      </div>

      <div class="px-0.75rem flex flex-col gap-1rem text-1.25rem">
        <InputRadio
          radio-name="payment_method"
          v-model="param_post.payment_method"
          >信用卡</InputRadio
        >

        <InputRadio
          radio-name="payment_method"
          v-model="param_post.payment_method"
          >Line Pay</InputRadio
        >

        <InputRadio
          radio-name="payment_method"
          v-model="param_post.payment_method"
          >街口支付</InputRadio
        >
      </div>
    </section>

    <div
      class="box_btn flex flex-col gap-1.5rem text-1.25rem lg:(flex-row justify-between gap-1rem)"
    >
      <NuxtLink
        :to="{ name: 'shopping-cart' }"
        class="flex justify-center items-center gap-1rem p-1rem rounded-0.25rem bg-neutral-50 text-neutral-600"
      >
        <SvgIcon name="arrow_left" class="w-0.5rem" />
        返回購物車
      </NuxtLink>

      <NuxtLink
        :to="{ name: 'checkout-step2' }"
        class="flex justify-center items-center gap-1rem p-1rem rounded-0.25rem bg-neutral-600 text-neutral-50"
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
}

.wrapper_step1 {
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-areas:
      "address cart"
      "address  payment";
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
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
</style>
