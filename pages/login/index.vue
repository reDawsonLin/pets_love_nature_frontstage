<script setup>
// import { useRouter } from 'vue-router'

// import { createResolver } from "nuxt/kit";

// Resolve relative from the current file
// const resolver = createResolver(import.meta.env);
// console.log("resolver :>> ", resolver);

onMounted(() => {
  // const urlParams = new URLSearchParams(window.location.search);
  // console.log("urlParams :>> ", urlParams);
  // const code = urlParams.get("code");
  // console.log("code :>> ", code);
  // if (code) {
  //   fetchToken(code);
  // }

  console.log("process.env", process);
});

// async function fetchToken(code) {
//   console.log(code);
//   try {
//     // const res = await axios.post("http://127.0.0.1:3000/api/v1/user/googleCallback", {
//     //   code,
//     // });
//     // console.log(res.data.token);
//     // router.push('/')
//   } catch (error) {
//     console.error("Error fetching JWT:", error);
//   }
// }

const url_login = computed(() => {
  // console.log("process?.dev :>> ", process?.dev);
  return import.meta.dev
    ? "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/google?env=dev"
    : "https://pets-love-nature-backend-n.onrender.com/api/v1/customer/google?env=pro";
});
</script>

<template>
  <section class="flex flex-grow-1 flex-col items-center justify-center">
    <h4 class="mb-1.5rem">會員登入</h4>

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

      <li class="">
        <NuxtLink
          class="flex gap-1rem border rounded-0.5rem px-1.5rem py-0.75rem opacity-60"
        >
          <SvgIcon name="github" class="h-1.5rem w-1.5rem" />
          <p class="">GitHub 登入</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
