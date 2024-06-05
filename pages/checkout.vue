<script setup>
// route middleware -------
// definePageMeta({ middleware: "need-login" });

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
  <section class="flex items-center justify-center px-1.5rem pb-5.5rem pt-3rem">
    <ul class="list_stepper relative w-100% flex justify-between lg:(max-w-856px)">
      <template v-for="stepper in list_step" :key="stepper.step">
        <li class="stepper flex flex-col items-center gap-0.25rem lg:(gap-0.5rem)">
          <p
            class="step_number h-3.5rem w-3.5rem flex items-center justify-center rounded-50% bg-neutral-200 text-2rem text-neutral-600 lg:(h-4.25rem w-4.25rem)"
            :class="{ active: current_step === stepper.step }"
          >
            {{ stepper.step }}
          </p>
          <p
            class="w-2rem flex flex-grow-1 items-center text-neutral-600 lg:(w-auto text-1.5rem)"
          >
            {{ stepper.step_info }}
          </p>
        </li>
        <hr
          v-if="stepper.step !== 3"
          class="line mt-1.75rem h-0.25rem flex-grow-1 bg-neutral-200 lg:(z--1 mx--1rem mt-2.125rem)"
          :class="{ active: current_step === stepper.step }"
        >
      </template>
    </ul>
  </section>

  <div class="relative flex-grow-1 bg-second-200">
    <SvgIcon
      name="wave-checkout"
      class="absolute bottom-100% left-50% translate-x--50%"
    />

    <NuxtPage :page-key="(route) => route.fullPath" />
  </div>
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
