<script setup>
const inputValue = defineModel();

defineProps({
  labelName: {
    type: String,
  },
  inputName: {
    type: String,
  },
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label class="box_input">
    <p v-if="labelName" class="mb-0.25rem ml-2px">
      {{ labelName }} <sup v-show="required" class="text-rose-500">*</sup>
    </p>
    
    <input
      v-model="inputValue"
      :name="inputName"
      :type="inputType"
      :placeholder="placeholder"
      class="border border-(2px neutral-200) rounded-0.5rem p-1rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
    >
  </label>
</template>

<style scoped>
.box_input {
  @apply flex flex-col;

  &.error {
    @apply text-rose-500;

    input {
      @apply border-rose-500 caret-rose-500;

      &:focus {
        @apply outline-rose-500;
      }
    }
  }
}
</style>
