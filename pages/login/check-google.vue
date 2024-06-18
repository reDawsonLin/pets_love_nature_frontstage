<script setup>
import { useStoreLogin } from "~/stores/storeLogin";

const route = useRoute();

const store_login = useStoreLogin();
// const { id_customer, token } = storeToRefs(store_login);
const { login } = store_login;

if (import.meta.client) {
  const code = route.query.code;
  await login(code);

  console.log("code :>> ", code);
  // navigateTo({ name: "index" });
}

// onMounted(async () => {
//   if (route?.query?.code) {
//     const code = route.query.code;
//     await login(code);

//     // navigateTo({ name: "index" });
//   }
// });

const code = ref();
if (import.meta.client) {
  code.value = route.query.code;
}

// const token = useCookie("token");
// const id_customer = useCookie("id_customer");

// const { data, error } = await use$Fetch("/customer/googleSignIn", {
//   method: "POST",
//   body: { code },
// });

// console.log("data.value :>> ", data.value);
// console.log("error.value :>> ", error.value);

// token.value = data.value.token;
// id_customer.value = data.value.id;

// const login = async (code) => {
//   console.log("in login function");

//   const res = await use$Fetch("/customer/googleSignIn", {
//     method: "POST",
//     body: { code },
//   });

//   console.log("res :>> ", res);

//   token.value = res.data.token;
//   id_customer.value = res.data.id;
// };

onUnmounted(() => {});

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
    <LoadingPending />

    <h1>Loading... Google Login Checking</h1>
  </div>
</template>

<style lang="scss" scoped></style>
