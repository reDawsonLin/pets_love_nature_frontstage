<script setup>
// import { useRouter } from 'vue-router'

onMounted(() => {
  // const urlParams = new URLSearchParams(window.location.search);
  // console.log("urlParams :>> ", urlParams);
  // const code = urlParams.get("code");
  // console.log("code :>> ", code);
  // if (code) {
  //   fetchToken(code);
  // }
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
</script>

<template>
  <section
    class="flex flex-grow-1 flex-col items-center justify-center border border-red-7"
  >
    <h4 class="mb-1.5rem">會員登入</h4>

    <ul class="box_login flex flex-col gap-1.25rem">
      <li class="">
        <NuxtLink
          class="flex gap-1rem border rounded-0.5rem px-1.5rem py-0.75rem transition-shadow active:(shadow-none) hover:(shadow-md)"
          to="https://pets-love-nature-backend-n.onrender.com/api/v1/customer/google"
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
