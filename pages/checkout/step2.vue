<script setup>
import { useStoreCart } from "~/stores/storeCart";

definePageMeta({ middleware: "need-login" });

const param_post_step1 = useCookie("param_post_step1");

const { data: data_3pay } = await useTokenFetch(`/payment`, {
  method: "POST",
  body: param_post_step1.value,
});
param_post_step1.value = null;

const {
  MerchantID,
  PayGateWay,
  Version,
  ResOrder: { Amt, Email, ItemDesc, MerchantOrderNo, TimeStamp, aesEncrypt, shaEncrypt },
} = data_3pay.value.data;

const param_post_3pay = ref({
  Amt: "",
  Email: "",
  ItemDesc: "",
  MerchantID: "",
  MerchantOrderNo: "",
  NotifyUrl: "https://pets-love-nature-backend-n.onrender.com/api/v1/payment_notify",
  ReturnUrl: "https://petslovenature-frontstage.onrender.com/checkout/step3",
  TimeStamp: "",
  TradeInfo: "",
  TradeSha: "",
  Version: "",
});
const id_order = useCookie("id_order");

// "Order validation failed: orderProductList.0.amount: 購買商品清單amount未填寫, orderProductList.1.amount: 購買商品清單amount未填寫"
// 6670462c99b40923c5ec7b01

dataTrans();
function dataTrans() {
  param_post_3pay.value.MerchantID = MerchantID;
  param_post_3pay.value.Amt = Amt;
  param_post_3pay.value.Email = Email;
  param_post_3pay.value.ItemDesc = ItemDesc;
  param_post_3pay.value.MerchantOrderNo = MerchantOrderNo;
  // param_post_3pay.value.NotifyUrl = NotifyUrl;
  // param_post_3pay.value.ReturnUrl = ReturnUrl;
  param_post_3pay.value.TimeStamp = TimeStamp;
  param_post_3pay.value.TradeInfo = aesEncrypt;
  param_post_3pay.value.TradeSha = shaEncrypt;
  param_post_3pay.value.Version = Version;

  id_order.value = MerchantOrderNo;
}

// ------
// const cart_checkout = useCookie("checkout_cart");

const storeCart = useStoreCart();
const { data_checkoutCart } = storeToRefs(storeCart);

const id_customer = useCookie("id_customer");

if (import.meta.client) {
  let shoppingCart;
  if (data_checkoutCart.value?.length) shoppingCart = data_checkoutCart.value;
  else shoppingCart = JSON.parse(sessionStorage.getItem("checkout_cart"));

  await useTokenFetch(`/shopping_cart`, {
    method: "PATCH",
    body: {
      customerId: id_customer.value,
      shoppingCart: shoppingCart.map((item) => ({
        productSpec: item._id,
        isChoosed: true,
      })),
    },
  });
}

const form_newWeb = ref(null);
onMounted(() => {
  // cart_checkout.value = null;
  sessionStorage.removeItem("checkout_cart");
  form_newWeb.value.submit();
});
</script>

<template>
  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <form
      ref="form_newWeb"
      name="form_newWeb"
      :action="PayGateWay"
      method="post"
      class="form_step2 flex flex-col"
    >
      <template v-for="(value, key) in param_post_3pay" :key="key">
        <input type="text" :name="key" :value="value" />
      </template>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
