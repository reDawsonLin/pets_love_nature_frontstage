<script setup>
const teammate = [
  {
    id: 1,
    name_tc: "林德勝",
    name_en: "Dawson",
    email: "redawson357@gmail.com",
    url_gitHub: "https://github.com/reDawsonLin",
    url_avatar:
      "https://storage.googleapis.com/petstore-3a2e1.appspot.com/images/3a9c298a-89fc-4b95-abb0-c16034a1b890.jpg?GoogleAccessId=firebase-adminsdk-p5zjq%40petstore-3a2e1.iam.gserviceaccount.com&Expires=16756675200&Signature=Pp6yUhz9Ef7OgsRbmg9MYzwYBU7TxVTnmpE4URdDyX8dCVjowC1hC32Fno40%2FDFRzz7Vh02GPAMr73%2BMLe4Jy6qgygxVQ8nZUclN3C35Vc%2Bwbp1GnyvSUDIFDbr7hQC57d4mIraMoRikf3JSX95lUZE7N3h%2FOHWHUFelHhsTrB82W1DF3vFzbnxBd%2F4%2BMbA0CmJbqVfu3Y3swvaQVxC0p6rWUKlY%2F9o3peb%2FbX%2FATT7hhbkO3Fho4ZgdQecP8VRw7UYvANEJHxut18KjHbTBam058lyIwvtcTZNtA4%2Flmn8mtpLHKYyrHQCOhtUoAKDfQw5N3EHuezIaJP3ixgVj8w%3D%3D",
    work_front: {
      stage_front: [
        "首頁",
        "結帳流程頁面",
        "訂單相關頁面",
        "第三方登入",
        "聊聊",
        "關於我們",
      ],
      stage_back: [],
    },
    work_back: [],
    subtitle: "小組長 前端",
  },
  {
    id: 2,
    name_tc: "劉宜明",
    name_en: "Howard",
    email: "immigrant524@gmail.com",
    url_gitHub: "https://github.com/snail524",
    url_avatar:
      "https://storage.googleapis.com/petstore-3a2e1.appspot.com/images/22306a21-1611-46b6-ba3d-f8112fa9e51a.jpg?GoogleAccessId=firebase-adminsdk-p5zjq%40petstore-3a2e1.iam.gserviceaccount.com&Expires=16756675200&Signature=Lgm6MylagTMuUOUkGhDZrSKDBqKueLgUIOQnDyOgAXP1JL0NCXlaYwn5RX5HNUWM2eQhe82Cl0l9vnXcv9ybXbLI3Oe9n2IP3ORkm9FxoozUr1xiLM29lTo3w%2BTJkel8PpR6o5r%2BqkAtob3PtQSpUGR2ZZDjuyx7SGDIaJsJFU325TR%2BbI0VVipmD3fNP0ho1MQbsGcd%2FLo8ve137Hru3De0ex5EAALCaZYFTbKtbtgyGLtLY8LNsYhMnFrAfppPalwDILLF%2F1gX3mnYZLN6Mg9N6lCELePfR2C2fpm%2FjojWpoKYZKGDNThH1KpWc8CFJLQoPRSnkveIVo2EJvOJoA%3D%3D",
    work_front: {
      stage_front: ["商品相關頁面", "會員資訊頁面"],
      stage_back: ["商品相關頁面"],
    },
    work_back: [],
    subtitle: "前端",
  },
  {
    id: 3,
    name_tc: "張勝傑",
    name_en: "Frose",
    email: "solotanga2485@gmail.com",
    url_gitHub: "https://github.com/FroseWong",
    url_avatar:
      "https://storage.googleapis.com/petstore-3a2e1.appspot.com/images/535f120c-9c6a-4801-8289-d7b498b3ed83.png?GoogleAccessId=firebase-adminsdk-p5zjq%40petstore-3a2e1.iam.gserviceaccount.com&Expires=16756675200&Signature=VbVlNxBeAMJC9PjOceH9arkjsOYxCqPBcPi2VOOyHmYoRLZS1uVKwpai5tz%2BeS7cLBT7t9p3GgAao94r43AC%2BCBCJnpmEfKZNXzYTB%2B20Ge2CLdUnPZSLIZwSrc1rI8GFBgmmUkSuHElxYtJmbkkdO%2BHQdpvJLmlAw9teOh6D5agwQZZeYPYZAMBhLtVQvsrRhgOdDTQ5qEqjHg86FilNPhf67NYwlm%2Bv1tT73Fjq8NQPkCz%2BCP3tKrnJReJ3VXtS5puDx68aHqFM6A2no6bNb0QoIGCVxGBvFqiLtKwbe6OkqXp4xWmb%2F3%2BB7v%2FLIog7g8Kb8DYeDzuaEGuqA9%2BHQ%3D%3D",
    work_front: {
      stage_front: ["購物車相關", "常見問題"],
      stage_back: ["訂單管理", "消費者管理", "Banner管理", "聊聊"],
    },
    work_back: ["購物車相關", "Banner", "消費者相關"],
    subtitle: "前端＋後端",
  },
  {
    id: 4,
    name_tc: "曾文瑀",
    name_en: "Yuri",
    email: "yurit630@gmail.com",
    url_gitHub: "https://github.com/YuriT147852",
    url_avatar:
      "https://storage.googleapis.com/petstore-3a2e1.appspot.com/images/ee65b8b0-b059-4d98-8821-43522469b879.png?GoogleAccessId=firebase-adminsdk-p5zjq%40petstore-3a2e1.iam.gserviceaccount.com&Expires=16756675200&Signature=AIvmGHN5hjFZb0aSnAy0etwQh5sfuY3F9auJrcy1wKCFG6oE%2FabSQAvzTnJFmjUy0M7ERgWmBsbmOznG7KxN3urV26T43n%2BviBCxZtNf2Hd4fvkDJLAf5m9SZPC8eqTDRG4J0gngfOcjAisJNNPBHhp9aBXZOUCd8tvju4jLjhnZKJkNx%2BsgjZff8rFbp%2FWKThCb0HiZT7rZAm3trd3PYLcma4UzNL%2F4aiZ38%2FfSI64%2FH%2FS52rRnrcaJrxEC9H48j%2BF9MDBMfYG%2BAmamHse6HQuNrC6FwDU1V%2FGPg%2F1eXTWHkDGOkLUV%2B58UgDVCXI%2FGbTgDMNq9Zi3AGR%2FUsvKo%2FQ%3D%3D",
    work_front: null,
    work_back: ["會員相關", "商品相關", "評價相關"],
    subtitle: "後端",
  },
  {
    id: 5,
    name_tc: "詹益韶",
    name_en: "",
    email: "d22495521@gmail.com",
    url_gitHub: "https://github.com/22495521",
    url_avatar:
      "https://storage.googleapis.com/petstore-3a2e1.appspot.com/images/db17b67a-29a7-4ef5-bd85-a05251f4af64.png?GoogleAccessId=firebase-adminsdk-p5zjq%40petstore-3a2e1.iam.gserviceaccount.com&Expires=16756675200&Signature=A7FaqHAg3QIrRKc93H%2BPefBjgSiaYAD3Tx%2FqwHRv%2Bq8HcaR5pIWPdnwiJ14bgTRC54b%2BSIAdB0DNnGNHPgEW9%2FdxZz12Xrqp6sM1VGPAtbxo8Pst87Pgge0jWUYMc%2Bnrb7BN41Wl4XwsIoDjTnpYO4Xa72o9Qrj1RL3p%2B3MvPLJIwytgoTE5q1UrOJmtlLkaQyOmj9jqzu8OvvU4aJlbWrs2v18R5mR2lTbzd2oyPsCRQVzPxj%2BD9z7NDc6%2FxDC%2ByvYLh4CslCIeLcB9CyJq2vJVFKTqfHKFp%2BuyEJqOL4uUGW3c8Y%2BrHtE1ojLWiVSW6HMmtMF8EVUxoD%2BcW4COtw%3D%3D",
    work_front: null,
    work_back: ["第三方登入", "第三方支付", "訂單相關", "聊聊相關"],
    subtitle: "後端",
  },
];
</script>

<template>
  <div class="wrapper flex flex-col items-center px-1rem pt-3rem pb-5rem bg-second-200">
    <h1 class="title_h1 flex justify-center lg:()">關於我們</h1>
    <p class="text-1.25rem mb-1.5rem">專案貢獻者</p>

    <ul class="wrapper_teammate lg:(max-w-1440px)">
      <template v-for="mate in teammate" :key="mate.id">
        <li
          class="rounded-1rem py-2rem px-1.75rem bg-second-400/[.3] flex flex-col items-center gap-1.5rem lg:()"
        >
          <div class="box_img w-55% aspect-square rounded-full overflow-hidden">
            <img
              class="w-100% h-100% object-center object-cover"
              :src="mate.url_avatar"
              alt="avatar"
            />
          </div>

          <div class="box_info w-100% flex flex-col grow-1 text-1.125rem">
            <p class="text-1.5rem mb-0.25rem">
              {{ mate.name_tc }} {{ mate.name_en }} /
              {{ mate.subtitle }}
            </p>

            <div v-if="mate.work_front" class="">
              <p class="text-1.25rem mb-0.25rem">專案貢獻：</p>

              <div v-if="mate.work_front.stage_front?.length" class="box_list_work">
                <ul class="list_work">
                  <p class="font-700">前台：</p>
                  <li v-for="item in mate.work_front.stage_front" :key="item" class="">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="mate.work_front.stage_back?.length" class="box_list_work">
                <ul class="list_work">
                  <p class="font-700">後台：</p>
                  <li v-for="item in mate.work_front.stage_back" :key="item" class="">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="mate.work_back?.length" class="box_list_work mt-0.5rem">
              <ul class="list_work">
                <p class="">後端 API：</p>
                <li v-for="item in mate.work_back" :key="item" class="">
                  {{ item }}
                </li>
              </ul>
            </div>

            <p class="mt-auto pt-1rem">聯絡email：{{ mate.email }}</p>
            <NuxtLink
              :to="mate.url_gitHub"
              class="transition-colors hover:(text-rose-800)"
            >
              GitHub：{{ mate.url_gitHub }}
            </NuxtLink>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.title_h1 {
  font-size: clamp(1.75rem, 7vw, 2.5rem);

  @media screen and (min-width: 1024px) {
    /* grid-area: title; */
  }
}

.wrapper_teammate {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.box_list_work {
  @apply flex flex-wrap;
}

.list_work {
  @apply flex flex-wrap;

  > li {
    &:not(:first-of-type) {
      &::before {
        content: "、";
      }
    }
  }
}
</style>
