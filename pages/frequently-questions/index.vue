<script setup>
const qaDataArr = ref([
  {
    question: "產品保存期限是多久？",
    answer: "保存期限為一年。"
  },
  {
    question: "產品包裝是什麼樣的？",
    answer: "外包裝使用夾鏈袋，內附乾燥劑。"
  },
  {
    question: "產品是否含有添加劑？",
    answer: "我們的產品完全不含任何添加劑。"
  },
  {
    question: "產品適合什麼樣的寵物？",
    answer: "適合所有狗貓寵物食用。"
  },
  {
    question: "是否有提供國際運送？",
    answer: "目前只提供台灣本地運送。"
  },
  {
    question: "如何訂購產品？",
    answer: "可以通過我們的IG（mr.d.pets）或FB（德老爺店鋪）聯繫訂購。"
  },
  {
    question: "是否有提供試吃包？",
    answer: "目前沒有提供試吃包。"
  },
  {
    question: "產品的主要成分是什麼？",
    answer: "主要成分是100%大自然萃取的肉品。"
  },
  {
    question: "如何儲存產品？",
    answer: "請存放在陰涼乾燥處，避免陽光直射。"
  },
  {
    question: "產品有什麼特殊的營養價值？",
    answer: "我們的產品富含高品質的蛋白質和營養成分，沒有任何填充物。"
  },
  {
    question: "是否有提供退換貨服務？",
    answer: "若產品有質量問題，請在收到後7天內聯繫我們進行退換貨。"
  },
  {
    question: "如何預防包裹詐騙？",
    answer: "建議使用信用卡付款或轉帳付款，並再三確認訂單系統通知。"
  },
  {
    question: "小編回覆時間是什麼時候？",
    answer: "小編的回覆時間為9:00至小編愛睏為止。"
  },
  {
    question: "產品的產地是在哪裡？",
    answer: "我們的產品全程在台灣加工和製作。"
  },
  {
    question: "是否可以批量訂購？",
    answer: "可以，歡迎批量訂購並享有特別優惠，請聯繫我們了解詳情。"
  }
]);
</script>

<template>
  <div class="frequently_questions">
    <div class="mid_space mx-auto mb-30 w-11/12 pt-20 text-center">
      <h1 class="h1_title">常見問題</h1>
      <h3 class="sup_title mb-30">Q&A</h3>
      <div class="question_answer_div ml-30 flex flex-col items-center">
        <div
          v-for="(eachQa, i) in qaDataArr"
          :key="eachQa.question"
          class="each_qa relative mb-10 w-100 flex flex-col items-center"
        >
          <div
            class="indev_num absolute left-0 top-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl"
          >
            {{ i + 1 }}.
          </div>
          <div class="question mb-3 w-80 flex items-center">
            <div class="icon mr-5 min-w8 w8">
              <font-awesome-icon
                class="fa-solid fa-q text-lg"
                :icon="['fas', 'q']"
              />
            </div>
            <div class="text text-left">
              {{ eachQa.question }}
            </div>
          </div>
          <div class="answer w-80 flex items-center">
            <div class="icon mr-5 min-w-8 w8">
              <font-awesome-icon
                class="fa-solid fa-a text-lg"
                :icon="['fas', 'a']"
              />
            </div>
            <div class="text text-left">{{ eachQa.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frequently_questions {
}
</style>
