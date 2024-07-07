<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStoreLogin } from "~/stores/storeLogin";
import Swal from 'sweetalert2'


// route middleware -------
definePageMeta({ middleware: "need-login" });

// 使用 storeLogin
const store_login = useStoreLogin();
const { token, id_customer } = storeToRefs(store_login);

const show_pending = ref(true);


const data = ref({
  customerName: "",
  recipientName: "",
  phone: "",
  deliveryAddress: {
    country: "",
    county: "",
    district: "",
    address: "",
    phone: "",
  },
  email: "",
  image: "",
  accountStatus: 0,
});


const fetchData = async () => {

  try {
    const result = await use$Fetch(
      `/customer/${id_customer.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )

   
    data.value = result.data;
    show_pending.value = false;
    console.log("成功得到會員資訊");
  } catch (e) {
    show_pending.value = false;
    console.log(e.message)
    console.log("err", e);

  }
};

const saveMember = async () => {
  try {
    await postFetchData(data);
    fetchData();
  } catch (e) {
    console.log("err", e);
  }
};

const postFetchData = async (data) => {
  try {

      const response = await use$Fetch(`/customer/${id_customer.value}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(data.value),
      }
    )
    console.log(response);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "儲存成功",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (e) {
    alert("儲存失敗");
    console.log("err", e);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <LoadingPending :show="show_pending" />

  <div class="member mx-auto container md-flex">
    <div class="sidebar w-[100%] flex flex-col grid-justify-start grid-items-center md:mt-[100px] md-w-[30%]">
 
      <SidebarOrder />
    </div>

    <div class="w-[100%] md-w-[70%]">
      <div class="title mb-7.5 mt-[16px] flex items-center justify-center md:mt-[32px]">
        <!-- <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" /> -->
        <h1 class="text-4xl">編輯個人資訊
        </h1>
      </div>
      <div class="mb-7.5 flex grid-justify-center grid-items-center">
        <img class="h-[100px]" src="/assets/img/personPhoto.jpg" alt="">
      </div>
      <div class="flex flex-col grid-justify-center grid-items-center">
        <form class="w-[90%] lg:w-[70%] md:w-[90%] sm:w-[50%]">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="md:mr-[32px]">
              <div class="mb-4">
                <label for="customerName" class="block text-sm text-gray-900 font-medium leading-6">顧客姓名</label>
                <input
id="customerName" v-model="data.customerName" type="text" name="customerName"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="email" class="block text-sm text-gray-900 font-medium leading-6">信箱</label>
                <input
id="email" v-model="data.email" type="text" name="email"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="phone" class="block text-sm text-gray-900 font-medium leading-6">聯絡電話</label>
                <input
id="phone" v-model="data.phone" type="text" name="phone"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>
            </div>
            <div>
              <div class="mb-4">
                <label for="recipient_name" class="block text-sm text-gray-900 font-medium leading-6">收件人</label>
                <input
id="recipient_name" v-model="data.recipientName" type="text" name="recipient_name"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="recipient_phone" class="block text-sm text-gray-900 font-medium leading-6">收件人聯絡電話</label>
                <input
id="recipient_phone" v-model="data.recipientPhone" type="text" name="recipient_phone"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="recipient_location" class="block text-sm text-gray-900 font-medium leading-6">送貨地點</label>
                <input
id="recipient_location" v-model="data.deliveryAddress.country" type="text"
                  name="recipient_location"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="recipient_city" class="block text-sm text-gray-900 font-medium leading-6">城市/縣</label>
                <input
id="recipient_city" v-model="data.deliveryAddress.county" type="text" name="recipient_city"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="recipient_area" class="block text-sm text-gray-900 font-medium leading-6">地區</label>
                <input
id="recipient_area" v-model="data.deliveryAddress.district" type="text" name="recipient_area"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>

              <div class="mb-4">
                <label for="recipient_address" class="block text-sm text-gray-900 font-medium leading-6">地址</label>
                <input
id="recipient_address" v-model="data.deliveryAddress.address" type="text"
                  name="recipient_address"
                  class="block w-full border-0 rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                  placeholder="">
              </div>
            </div>
          </div>
          <div class="mb-4 flex grid-justify-center grid-items-center">
            <a
href="#"
              class="w-[100px] w-full inline-flex justify-center rounded-md bg-[#191919] px-3 py-2 text-sm text-white font-semibold shadow-sm ring-1 ring-gray-300 ring-inset sm:mt-0 hover:bg-[#484848]"
              @click.prevent="saveMember">儲存</a>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
