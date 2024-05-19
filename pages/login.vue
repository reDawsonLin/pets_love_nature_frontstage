<script setup>
// import { useRouter } from 'vue-router'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  console.log("urlParams :>> ", urlParams);

  const code = urlParams.get("code");
  console.log("code :>> ", code);

  if (code) {
    fetchToken(code);
  }
});

async function fetchToken(code) {
  console.log(code);
  try {
    // const res = await axios.post("http://127.0.0.1:3000/api/v1/user/googleCallback", {
    //   code,
    // });
    // console.log(res.data.token);
    // router.push('/')
  } catch (error) {
    console.error("Error fetching JWT:", error);
  }
}
</script>

<template>
  <!-- <a href="https://pets-love-nature-backend-n.onrender.com/api/v1/user/google">google</a> -->

  <a href="http://pets-love-nature-backend-n.onrender.com/api/v1/customer/google"
    >google new</a
  >

  <!-- <button @click="cli">google登入</button> -->
</template>

<style scoped></style>
