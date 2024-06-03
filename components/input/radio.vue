<script setup>
const inputValue = defineModel();

defineProps({
  radioName: {
    type: String,
  },
});
</script>

<template>
  <label class="box_radio flex items-center gap-0.5rem">
    <input
      type="radio"
      :name="radioName"
      v-model="inputValue"
      class="flex justify-center items-center w-1.25rem h-1.25rem rounded-full border-(~ 2px neutral-600) appearance-none before:(content-empty w-0.625rem h-0.625rem rounded-full opacity-0 bg-neutral-600 transition-opacity) checked:before:opacity-100"
    />
    <slot />
  </label>
</template>

<style scoped></style>
