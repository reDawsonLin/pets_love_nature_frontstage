<script setup>
const token = useCookie("token");
const id_customer = useCookie("id_customer");
</script>

<template>
  <LoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ChatRoom v-if="token && id_customer" />
</template>

<style>
@import "@/assets/main.css";

.swal2-confirm {
  @apply !bg-rose-500 !shadow-none;
}

.swal2-deny {
  @apply !bg-neutral-500 !shadow-none;
}
</style>
