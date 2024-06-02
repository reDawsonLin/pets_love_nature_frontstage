<script setup>
const list_step = [
  {
    step: 1,
    step_info: "填寫資料",
  },
  {
    step: 2,
    step_info: "結帳付款",
  },
  {
    step: 3,
    step_info: "完成",
  },
];

const route = useRoute();
const current_step = Number(route.fullPath.split("/").at(-1)?.at(-1));
</script>

<template>
  <section class="flex justify-center items-center px-1.5rem pt-3rem pb-5.5rem">
    <ul class="list_stepper relative flex justify-between w-100%">
      <template v-for="stepper in list_step" :key="stepper.step">
        <li class="stepper flex flex-col items-center gap-0.25rem">
          <p
            class="step_number flex justify-center items-center w-3.5rem h-3.5rem rounded-50% bg-neutral-200 text-neutral-600 text-2rem"
            :class="{ active: current_step === stepper.step }"
          >
            {{ stepper.step }}
          </p>
          <p class="flex flex-grow-1 items-center w-2rem text-neutral-600">
            {{ stepper.step_info }}
          </p>
        </li>
        <hr
          v-if="stepper.step !== 3"
          class="line flex-grow-1 mt-1.75rem h-0.25rem bg-neutral-200"
          :class="{ active: current_step === stepper.step }"
        />
      </template>
    </ul>
  </section>

  
    <NuxtPage :page-key="(route) => route.fullPath" />
</template>

<style scoped>
.step_number {
  &.active {
    @apply bg-neutral-600 text-neutral-50;
  }
}

.line {
  &.active {
    @apply bg-neutral-600;
  }
}

.stepper {
  /* .line {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 50%;
      height: 6px;
      background-color: red;
    }
  } */
}
</style>
