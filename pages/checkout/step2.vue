<script setup>
import { useStoreCart } from "~/stores/storeCart";
import { useStoreCheckout } from "@/stores/storeCheckout";

definePageMeta({ middleware: "need-login" });

const storeCart = useStoreCart();
const { data_checkoutCart } = storeToRefs(storeCart);

const store_checkout = useStoreCheckout();
const { param_post } = storeToRefs(store_checkout);

const id_customer = useCookie("id_customer");
const id_order = useCookie("id_order");
const payGetWay = ref();

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

const form_newWeb = ref(null);

const pending = ref(true);
onMounted(async () => {
  const param_post_step1 = JSON.parse(sessionStorage.getItem("param_post_step1"));
  let param;
  if (param_post_step1) {
    param = param_post_step1;
  } else {
    param = param_post.value;
  }

  const { data } = await useToken$Fetch(`/payment`, {
    method: "POST",
    body: param,
  });

  const {
    MerchantID,
    PayGateWay,
    Version,
    ResOrder: {
      Amt,
      Email,
      ItemDesc,
      MerchantOrderNo,
      TimeStamp,
      aesEncrypt,
      shaEncrypt,
    },
  } = data;

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
    payGetWay.value = PayGateWay;
  }

  let shoppingCart;
  if (data_checkoutCart.value?.length) shoppingCart = data_checkoutCart.value;
  else shoppingCart = JSON.parse(sessionStorage.getItem("checkout_cart"));

  await useToken$Fetch(`/shopping_cart`, {
    method: "PATCH",
    body: {
      customerId: id_customer.value,
      shoppingCart: shoppingCart.map((item) => ({
        productSpec: item._id,
        isChoosed: true,
      })),
    },
  });

  sessionStorage.removeItem("checkout_cart");
  sessionStorage.removeItem("param_post_step1");
  form_newWeb.value.submit();
});

onUnmounted(() => {
  pending.value = false;
});
</script>

<template>
  <LoadingPending :show="pending" />
  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <form
      ref="form_newWeb"
      name="form_newWeb"
      :action="payGetWay"
      method="post"
      class="form_step2 flex flex-col"
    >
      <template v-for="(value, key) in param_post_3pay" :key="key">
        <input type="text" :name="key" :value="value" >
      </template>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
