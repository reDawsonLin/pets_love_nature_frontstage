<script setup>
import { useStoreLogin } from "~/stores/storeLogin";
import { useStoreCart } from "~/stores/storeCart";

const route = useRoute();

const store_cart = useStoreCart();
const { addCart } = store_cart;

const store_login = useStoreLogin();
const { login } = store_login;

if (import.meta.client) {
  const code = route.query.code;
  await login(code);

  // merged cart ---
  await cartTrans();

  navigateTo({ name: "index" });
}

async function cartTrans() {
  const cart = JSON.parse(sessionStorage.getItem("shoppingCartNoLogin"));
  if (!cart) return;

  const unLoginCart = cart.shoppingCart.map((item) => ({
    productSpec: item.productSpec,
    quantity: item.quantity,
  }));

  await addCart(unLoginCart, 0);
}
</script>

<template>
  <LoadingPending show />
</template>

<style scoped></style>
