<script setup></script>

<template>
  <div class="min-h-100vh flex flex-col">
    <LayoutNavbar />

    <main class="flex-grow-1">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<style scoped></style>
