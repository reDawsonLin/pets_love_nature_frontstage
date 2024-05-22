<script setup>
import { useStoreLogin } from "~/stores/storeLogin";

const route = useRoute();

const store_login = useStoreLogin();
const { id_customer, token } = storeToRefs(store_login);
const { login } = store_login;

onMounted(async () => {
  if (route?.query?.code) {
    const code = route.query.code;
    await login(code);

    navigateTo({ name: "index" });
  }
});

// const fetchOrder = async () => {
//   const res = await $fetch(
//     `https://pets-love-nature-backend-n.onrender.com/api/v1/orders/664a9f62a9409ee957d3a646`,
//     {
//       headers: { Authorization: `Bearer ${token.value}` },
//     }
//   );
//   // console.log("res :>> ", res);

//   // const res = await $fetch(
//   //   "https://pets-love-nature-backend-n.onrender.com/api/v1/product"
//   // );

//   // $fetch("/api/contact", {
//   //   method: "POST",
//   //   body: { hello: "world " },
//   // });
//   console.log("res :>> ", res);
// };
</script>

<template>
  <div>
    <h1>Loading... Google Login Checking</h1>
  </div>
</template>

<style lang="scss" scoped></style>
