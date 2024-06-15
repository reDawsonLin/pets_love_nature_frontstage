<script setup>
import { useStoreCheckout } from "~/stores/storeCheckout";

const store_checkout = useStoreCheckout();
const { param_post } = storeToRefs(store_checkout);
const {} = store_checkout;
console.log("param_post.value :>> ", param_post.value);

// const param_post_3pay = ref({
//   Amt: "",
//   Email: "",
//   ItemDesc: "",
//   MerchantID: "",
//   MerchantOrderNo: "",
//   NotifyUrl: "https://pets-love-nature-backend-n.onrender.com/api/v1/payment_notify",
//   ReturnUrl: "https://petslovenature-frontstage.onrender.com/checkout/step3",
//   TimeStamp: "",
//   TradeInfo: "",
//   TradeSha: "",
//   Version: "",
// });
const formData = ref(null);

const form_newWeb = ref(null);
const param_post_step1 = useCookie("param_post_step1");

const {
  data: data_3pay,
  pending: pending_3pay,
  error: error_3pay,
  refresh: refresh_3pay,
} = await useTokenFetch(`/payment`, {
  method: "POST",
  body: param_post_step1.value,
});

console.log("data_3pay.value :>> ", data_3pay.value);

// const {
//   MerchantID,
//   PayGateWay,
//   Version,
//   ResOrder: { Amt, Email, ItemDesc, MerchantOrderNo, TimeStamp, aesEncrypt, shaEncrypt },
// } = data_3pay.value.data;

// console.log("MerchantID :>> ", MerchantID);
dataTrans();
onMounted(async () => {
  console.log("form_newWeb.value :>> ", form_newWeb.value);
  // await postNewWeb();
});

function dataTrans() {
  formData.value = data_3pay.value.data;
  // formData.value.NotifyUrl =
  //   "https://pets-love-nature-backend-n.onrender.com/api/v1/payment_notify";
  // formData.value.ReturnUrl =
  //   "https://petslovenature-frontstage.onrender.com/checkout/step3";

  // param_post_3pay.value.MerchantID = MerchantID;
  // param_post_3pay.value.Amt = Amt;
  // param_post_3pay.value.Email = Email;
  // param_post_3pay.value.ItemDesc = ItemDesc;
  // param_post_3pay.value.MerchantOrderNo = MerchantOrderNo;
  // // param_post_3pay.value.NotifyUrl = NotifyUrl;
  // // param_post_3pay.value.ReturnUrl = ReturnUrl;
  // param_post_3pay.value.TimeStamp = TimeStamp;
  // param_post_3pay.value.TradeInfo = aesEncrypt;
  // param_post_3pay.value.TradeSha = shaEncrypt;
  // param_post_3pay.value.Version = Version;

  // console.log("param_post_3pay.value :>> ", param_post_3pay.value);
  console.log("formData.value :>> ", formData.value);
}

// async function postNewWeb() {
//   try {
//     console.log("form_newWeb.value :>> ", form_newWeb.value);
//     const formData = new FormData(form_newWeb.value);
//     console.log("formData :>> ", formData);

//     const response = await $fetch(PayGateWay, {
//       method: "POST",
//       body: formData,
//     });
//     console.log("response :>> ", response);

//     // const response = await fetch(PayGateWay, {
//     //   method: "POST",
//     //   body: new URLSearchParams(param_post_3pay.value),
//     // });
//     // const data = await response.json();
//     // console.log("data :>> ", data);
//   } catch (error) {
//     console.error("error :>> ", error);
//   }
// }
</script>

<template>
  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <!-- loading effect -->
    <h1>step2 loading</h1>

    <!-- <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
      <input type="text" name="MerchantID" :value="param_post_3pay.MerchantID" />
      <input type="text" name="TradeSha" :value="param_post_3pay.TradeSha" />
      <input type="text" name="TradeInfo" :value="param_post_3pay.TradeInfo" />
      <input type="text" name="TimeStamp" :value="param_post_3pay.TimeStamp" />
      <input type="text" name="Version" :value="param_post_3pay.Version" />
      <input type="text" name="NotifyUrl" :value="param_post_3pay.NotifyUrl" />
      <input type="text" name="ReturnUrl" :value="param_post_3pay.ReturnUrl" />
      <input
        type="text"
        name="MerchantOrderNo"
        :value="param_post_3pay.MerchantOrderNo"
      />
      <input type="text" name="Amt" :value="param_post_3pay.Amt" />
      <input type="text" name="ItemDesc" :value="param_post_3pay.ItemDesc" />
      <input type="email" name="Email" :value="param_post_3pay.Email" />
      <button type="submit" class="border py-1rem px-0.5rem m-2 !bg-coolGray flex">
        送出
      </button>
    </form> -->

    <!-- <form ref="form_newWeb" name="form_newWeb"> -->
    <!-- <form
      ref="form_newWeb"
      name="form_newWeb"
      action="https://ccore.newebpay.com/MPG/mpg_gateway"
      method="post"
    >
      <template v-for="(value, key) in param_post_3pay" :key="key">
        <input type="text" :name="key" :value="value" />
      </template>

      <input type="text" name="MerchantID" :value="param_post_3pay.MerchantID" />
      <input type="text" name="TradeSha" :value="param_post_3pay.TradeSha" />
      <input type="text" name="TradeInfo" :value="param_post_3pay.TradeInfo" />
      <input type="text" name="TimeStamp" :value="param_post_3pay.TimeStamp" />
      <input type="text" name="Version" :value="param_post_3pay.Version" />
      <input type="text" name="NotifyUrl" :value="param_post_3pay.NotifyUrl" />
      <input type="text" name="ReturnUrl" :value="param_post_3pay.ReturnUrl" />
      <input
        type="text"
        name="MerchantOrderNo"
        :value="param_post_3pay.MerchantOrderNo"
      />
      <input type="text" name="Amt" :value="param_post_3pay.Amt" />
      <input type="text" name="ItemDesc" :value="param_post_3pay.ItemDesc" />
      <input type="email" name="Email" :value="param_post_3pay.Email" />

      <button type="submit">Submit</button>
    </form> -->

    <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
      <input type="text" name="MerchantID" :value="formData.MerchantID" />
      <input type="text" name="TradeSha" :value="formData.ResOrder.shaEncrypt" />
      <input type="text" name="TradeInfo" :value="formData.ResOrder.aesEncrypt" />
      <input type="text" name="TimeStamp" :value="formData.ResOrder.TimeStamp" />
      <input type="text" name="Version" :value="formData.Version" />
      <!-- <input type="text" name="NotifyUrl" :value="formData.NotifyUrl" />
      <input type="text" name="ReturnUrl" :value="formData.ReturnUrl" /> -->
      <input
        type="text"
        name="NotifyUrl"
        value="https://pets-love-nature-backend-n.onrender.com/api/v1/payment_notify"
      />
      <input
        type="text"
        name="ReturnUrl"
        value="https://petslovenature-frontstage.onrender.com/checkout/step3"
      />
      <input
        type="text"
        name="MerchantOrderNo"
        :value="formData.ResOrder.MerchantOrderNo"
      />
      <input type="text" name="Amt" :value="formData.ResOrder.Amt" />
      <input type="text" name="ItemDesc" :value="formData.ResOrder.ItemDesc" />
      <input type="email" name="Email" :value="formData.ResOrder.Email" />
      <button type="submit">送出</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
