<script setup></script>

<template>
  <div class="flex flex-col border border-red-500 h-dvh">
    <LayoutNavbar />

    
    <slot/>

    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped></style>
