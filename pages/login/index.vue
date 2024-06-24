<script setup>
const url_login = computed(() => {
  // console.log("process?.dev :>> ", process?.dev);
  return import.meta.dev
    ? "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/google?env=dev"
    : "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/google?env=pro";
});
</script>

<template>
  <section class="flex flex-grow-1 flex-col items-center justify-center">
    <h4 class="mb-1rem">會員登入</h4>

    <ul class="box_login flex flex-col gap-1.25rem">
      <li class="">
        <NuxtLink
          class="flex gap-1rem border rounded-0.5rem px-1.5rem py-0.75rem transition-shadow active:(shadow-none) hover:(shadow-md)"
          :to="url_login"
        >
          <SvgIcon name="google" class="h-1.5rem w-1.5rem" />
          <p class="">Google 登入</p>
        </NuxtLink>
      </li>

      <!-- <li class="">
        <NuxtLink
          class="flex gap-1rem border rounded-0.5rem px-1.5rem py-0.75rem opacity-60"
        >
          <SvgIcon name="github" class="h-1.5rem w-1.5rem" />
          <p class="">GitHub 登入</p>
        </NuxtLink>
      </li> -->
    </ul>
  </section>
</template>

<style scoped></style>
