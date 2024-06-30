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
</style>
