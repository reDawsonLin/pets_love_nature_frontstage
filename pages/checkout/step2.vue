<script setup>
import { useStoreCheckout } from "~/stores/storeCheckout";

const store_checkout = useStoreCheckout();
const { param_post } = storeToRefs(store_checkout);
const {} = store_checkout;

console.log("param_post.value :>> ", param_post.value);

const {
  data: data_3pay,
  pending: pending_3pay,
  error: error_3pay,
  refresh: refresh_3pay,
} = await useTokenFetch(`/createOrder`, {
  method: "POST",
  body: { ...param_post.value },
});

console.log("data_3pay.value :>> ", data_3pay.value);
console.log("error_3pay.value :>> ", error_3pay.value);
</script>

<template>
  <div
    class="wrapper_step1 mx-auto max-w-1076px flex flex-col gap-2rem px-0.75rem py-3rem"
  >
    <h1>step2 loading</h1>
  </div>
</template>

<style lang="scss" scoped></style>
