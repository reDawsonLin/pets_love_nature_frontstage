<script setup></script>
<template>
  <!--  外層 div RWD 參考 -->
  <!--  <div class="w-[100%] flex flex-col grid-justify-start grid-items-center md:mt-[100px] md-w-[30%]">  -->
  <ul class="w-[100%] flex flex-row justify-center text-center md-w-[80%] md:flex-col">
    <li class="m-2">
      <NuxtLink :to="{ name: 'member' }" class="block p-2 hover:bg-[#fdd8bf]"
        >個人資訊</NuxtLink
      >
    </li>
    <li class="m-2">
      <!-- <a href="#" class="block p-2 hover:bg-[#fdd8bf]">訂單資訊</a> -->
      <NuxtLink :to="{ name: 'order-list' }" class="block p-2 hover:bg-[#fdd8bf]"
        >訂單資訊</NuxtLink
      >
    </li>
    <!-- <li class="pointer-events-none m-2 opacity-50">
      <NuxtLink :to="{ name: 'member' }" class="block p-2 hover:bg-[#fdd8bf]"
        >收藏收品</NuxtLink
      >
    </li>
    <li class="pointer-events-none m-2 opacity-50">
      <NuxtLink :to="{ name: 'member' }" class="block p-2 hover:bg-[#fdd8bf]"
        >聊聊紀錄</NuxtLink
      >
    </li> -->
  </ul>
</template>
