<script setup></script>

<template>
  <div class="min-h-100vh flex flex-col">
    <LayoutNavbar />

    <main class="relative flex-grow-1 flex flex-col">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<style scoped></style>
