<script setup>
import { useStoreLogin } from "~/stores/storeLogin";

const route = useRoute();

const store_login = useStoreLogin();

const { login } = store_login;

if (import.meta.client) {
  const code = route.query.code;
  await login(code);

  navigateTo({ name: "index" });
}
</script>

<template>
  <LoadingPending show />
</template>

<style scoped></style>
