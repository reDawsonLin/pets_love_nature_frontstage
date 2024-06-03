<script setup>
const selectValue = defineModel();

defineProps({
  selectName: {
    type: String,
  },
  labelName: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="wrapper_select">
    <p v-if="labelName" class="ml-2px mb-0.25rem">
      {{ labelName }} <sup v-show="required" class="text-rose-500">*</sup>
    </p>

    <div class="box_select relative flex flex-col">
      <select
        :id="selectName"
        :name="selectName"
        v-model="selectValue"
        class="select p-1rem pb-0.75rem pr-2.25rem rounded-0.5rem text-0.875rem border-(~ 2px neutral-200) placeholder:(text-neutral-400 ) focus:( outline-neutral-400)"
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
