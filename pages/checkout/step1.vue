<script setup>
const show_cart = () => {
  console.log("show cart");
};

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
    class="relative flex flex-col gap-2rem py-3rem px-0.75rem bg-second-200 border border-red"
  >
    <SvgIcon
      name="wave-checkout"
      class="absolute bottom-100% left-50% translate-x--50%"
    />

    <!-- <section
      class="flex flex-col gap-1.5rem bg-second-400 rounded-1rem px-1rem py-1.5rem text-neutral-600 cursor-pointer group hover:(bg-neutral-600 text-neutral-50) transition-background transition-colors"
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
    </section> -->
    <section class="box_card">
      <div
        class="form_title flex justify-between items-center p-1rem text-neutral-600 bg-neutral-200 rounded-0.5rem"
      >
        <p class="text-1.25rem">收件人資料</p>

        <label class="box_checkbox flex items-center text-0.875rem cursor-pointer">
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

          與個人資料相同
        </label>
      </div>

      <form name="form_recipient" class="px-1rem flex flex-col gap-1.5rem">
        <!-- <label class="box_input" :class="{ error: false }">
          <p class="ml-2px  mb-0.25rem">姓名 <sup v-show="true" class="text-rose-500">*</sup></p>
          <input
            class="p-1rem pb-0.75rem rounded-0.5rem text-0.875rem text-neutral-600 border-(~ 2px neutral-200) placeholder:(text-neutral-400 ) focus:( outline-neutral-400)"
            type="text"
            placeholder="請輸入姓名"
          />
        </label> -->

        <InputText name="recipient" placeholder="請輸入姓名" required input-type="text" label-name="姓名"/>

        <InputText name="mobile-phone" placeholder="請輸入手機" required input-type="text" label-name="手機"/>

        <InputText name="email" placeholder="請輸入電子郵件" required input-type="email" label-name="電子郵件"/>






      </form>
    </section>

    <section class=""></section>
    <section class=""></section>
  </div>
</template>

<style scoped>
.box_card {
  @apply flex flex-col gap-1rem px-1rem py-1.5rem bg-neutral-50 rounded-0.5rem;
}


</style>
