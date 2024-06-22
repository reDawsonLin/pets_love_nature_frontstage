<script setup>
const inputValue = defineModel();

defineProps({
  labelName: {
    type: String,
    default: "",
  },
  inputName: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <label class="box_input" :class="{ error: errors?.[inputName] }">
    <p v-if="labelName" class="mb-0.25rem ml-2px">
      {{ labelName }} <sup v-show="required" class="text-rose-500">*</sup>
    </p>

    <VeeField
      v-model="inputValue"
      :name="inputName"
      :type="inputType"
      :placeholder="placeholder"
      class="border border-(2px neutral-200) rounded-0.5rem p-1rem px-0.75rem pb-0.75rem text-0.875rem text-neutral-600 placeholder:(text-neutral-400) focus:(outline-neutral-400)"
      :class="{ 'border-rose-500': errors?.[inputName] }"
    />

    <VeeErrorMessage
      :name="inputName"
      class="ml-0.25rem mt-0.25rem text-0.875rem text-rose-500"
    />
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
