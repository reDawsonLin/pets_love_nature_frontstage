<script setup>
const selectValue = defineModel();

defineProps({
  selectName: {
    type: String,
    default: "",
  },
  labelName: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="wrapper_select">
    <p v-if="labelName" class="mb-0.25rem ml-2px">
      {{ labelName }} <sup v-show="required" class="text-rose-500">*</sup>
    </p>

    <div class="box_select relative flex flex-col">
      <select
        :id="selectName"
        v-model="selectValue"
        :name="selectName"
        class="select border border-(2px neutral-200) rounded-0.5rem p-1rem pb-0.75rem pr-2.25rem text-0.875rem placeholder:(text-neutral-400) focus:(outline-neutral-400)"
        :class="{ 'text-neutral-400': !selectValue }"
      >
        <slot />
      </select>

      <SvgIcon
        name="arrow_down"
        class="absolute right-1rem top-45% w-1rem text-neutral-600"
      />
    </div>
  </div>
</template>

<style scoped>
.select {
  appearance: none;
}
</style>
