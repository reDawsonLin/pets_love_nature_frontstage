<script setup>
const inputValue = defineModel();

defineProps({
  radioName: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <label class="box_radio flex cursor-pointer items-center gap-0.5rem">
    <input
      v-model="inputValue"
      type="radio"
      :name="radioName"
      class="h-1.25rem w-1.25rem flex appearance-none items-center justify-center border border-(2px neutral-600) rounded-full before:(h-0.625rem w-0.625rem rounded-full bg-neutral-600 opacity-0 transition-opacity content-empty) checked:before:opacity-100"
    >
    <slot />
  </label>
</template>

<style scoped></style>
