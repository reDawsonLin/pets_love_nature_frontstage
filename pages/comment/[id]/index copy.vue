<script setup>
const hoverStarIndex = ref(0);

const startIndex = ref(0);

const hoverStar = (index) => {
  hoverStarIndex.value = index;
};
</script>

<template>
  <div class="evaluate mx-auto container md-flex">
    <div
      class="sidebar w-[100%] flex flex-col grid-justify-start grid-items-center md:mt-[100px] md-w-[30%]"
    >
      <ul
        class="w-[100%] flex flex-row justify-center b border-1px b-solid text-start md-w-[80%] md:flex-col"
      >
        <li class="border-b-1px b-b-solid">
          <a href="#" class="block p-2 hover:bg-[#fdd8bf]">待評價訂單</a>
        </li>
        <li class="m-2">
          <!-- <span class="block p-2">訂單編號:
                    </span> -->
          <a href="#" class="block p-2 hover:bg-[#fdd8bf]">訂單編號</a>
          <a href="#" class="block p-2 hover:bg-[#fdd8bf]">20240615001</a>
          <a href="#" class="block p-2 hover:bg-[#fdd8bf]">20240616002</a>
        </li>
      </ul>
    </div>
		
    <div class="w-[100%] md-w-[70%]">
      <div class="title mb-7.5 mt-[16px] flex items-center justify-center md:mt-[32px]">
        <!-- <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" /> -->
        <h1 class="text-2xl">給予評價</h1>
      </div>
      <form>
        <table class="mb-[32px] w-[100%] table-fixed">
          <thead>
            <tr>
              <th>商品資料</th>
              <th>評分</th>
              <th>內容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>控味健康肉棒 - 寵物的健康小吃</td>
              <td>
                <div v-if="startIndex == 0" class="flex justify-center flex-items-center">
                  <img
                    v-for="index in hoverStarIndex"
                    :key="index"
                    src="/assets/img/icon/icon-star.svg"
                    alt=""
                    @mouseover="hoverStar(index)"
                    @click="startIndex = index"
                  >
                  <img
                    v-for="index in 5 - hoverStarIndex"
                    :key="index"
                    src="/assets/img/icon/icon-star-hollow.svg"
                    alt=""
                    @mouseover="hoverStar(index + hoverStarIndex)"
                    @click="startIndex = index + hoverStarIndex"
                  >

                  <!-- <img src="/assets/img/icon/icon-star-hollow.svg" alt="">
                                    <img src="/assets/img/icon/icon-star-hollow.svg" alt="">
                                    <img src="/assets/img/icon/icon-star-hollow.svg" alt="">
                                    <img src="/assets/img/icon/icon-star-hollow.svg" alt="">
                                    <img src="/assets/img/icon/icon-star-hollow.svg" alt=""> -->
                </div>
                <div v-else class="flex justify-center flex-items-center">
                  <img
                    v-for="index in startIndex"
                    :key="index"
                    src="/assets/img/icon/icon-star.svg"
                    alt="Star"
                    @click="startIndex = index"
                  >
                  <img
                    v-for="index in 5 - startIndex"
                    :key="index"
                    src="/assets/img/icon/icon-star-hollow.svg"
                    alt=""
                    @click="startIndex = index + startIndex"
                  >
                </div>
              </td>
              <td>
                <textarea
                  id="message"
                  rows="4"
                  class="block w-full border border-gray-300 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400"
                  placeholder="(選填)請跟我們分享你的評價!"
                />
              </td>
            </tr>
            <tr>
              <td>GOODIES耐咬型潔</td>
              <td>
                <div class="flex justify-center flex-items-center">
                  <img src="/assets/img/icon/icon-star.svg" alt="" >
                  <img src="/assets/img/icon/icon-star.svg" alt="" >
                  <img src="/assets/img/icon/icon-star-hollow.svg" alt="" >
                </div>
              </td>
              <td>
                <textarea
                  id="message"
                  rows="4"
                  class="block w-full border border-gray-300 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 dark:text-white focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400"
                  placeholder="(選填)請跟我們分享你的評價!"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mb-4 flex grid-justify-end grid-items-center">
          <a
            href="#"
            class="w-[100px] w-full inline-flex justify-center rounded-md bg-[#191919] px-3 py-2 text-sm text-white font-semibold shadow-sm ring-1 ring-gray-300 ring-inset sm:mt-0 hover:bg-[#484848]"
            @click.prevent="saveMember"
            >發佈</a
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 2px solid #690461;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50% !important;
    text-align: left !important;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "商品資料";
    color: #525252;
  }
  td:nth-of-type(2):before {
    content: "評分";
    color: #525252;
  }
  td:nth-of-type(3):before {
    content: "內容";
    color: #525252;
  }
}
</style>
