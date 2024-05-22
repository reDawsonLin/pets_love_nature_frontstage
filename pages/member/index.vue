<script setup>
import { ref, onMounted  } from 'vue';

const data = ref({
    customerName: '',
    "recipientName": "",
    "phone": "",
    "deliveryAddress": {
      "country": "",
      "county": "",
      "district": "",
      "address": "",
      "phone": "",
    },
    "email": "",
    "image": "",
    "accountStatus": 0
})

const id = reactive('123');

const fetchData = async() => {
    try {
        const response = await fetch(`https://pets-love-nature-backend-n.onrender.com/api/v1/customer/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.json();
        data.value = result.data;
        console.log('成功得到會員資訊' );
    }
    catch(e){
        console.log('err' , e);
    }
}

const saveMember = async() =>{
    try{
        const result = await postFetchData(data);
        fetchData();
    }
    catch(e){
        console.log('err' ,e);
    }
}

const postFetchData = async(data) =>{
    try{
        debugger
        const response = await fetch(`https://pets-love-nature-backend-n.onrender.com/api/v1/customer/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                    data.value
                ),
            });
        console.log(response);
        alert("儲存成功");
    }
    catch(e){
        alert("儲存失敗");
        console.log('err' ,e);
    }
}

onMounted(()=>{
    fetchData();
})


</script>

<template>
    <div class="member">
        <div p="t-3.75rem" class="title flex items-center justify-center mb-7.5">
            <!-- <img class="mr-4" src="/assets/img/shopping_cart.png" alt="" /> -->
            <h1 class="text-4xl">編輯個人資訊</h1>
        </div>
        <div class="flex grid-justify-center grid-items-center mb-7.5">
            <img class="h-[100px]" src="/assets/img/personPhoto.jpg" alt="">
        </div>
        <div class="flex grid-justify-center grid-items-center flex-col">
            <form >
                <div class="mb-4">
                    <label for="customerName" class="block text-sm font-medium leading-6 text-gray-900">顧客姓名</label>
                    <input type="text" name="customerName" id="customerName" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.customerName">
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">信箱</label>
                    <input type="text" name="email" id="email" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.email">
                </div>

                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">聯絡電話</label>
                    <input type="text" name="phone" id="phone" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.phone">
                </div>

                <div class="mb-4">
                    <label for="recipient_name" class="block text-sm font-medium leading-6 text-gray-900">收件人</label>
                    <input type="text" name="recipient_name" id="recipient_name" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.recipientName">
                </div>

                <div class="mb-4">
                    <label for="recipient_phone" class="block text-sm font-medium leading-6 text-gray-900">收件人聯絡電話</label>
                    <input type="text" name="recipient_phone" id="recipient_phone" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.recipientPhone">
                </div>

                <div class="mb-4">
                    <label for="recipient_location" class="block text-sm font-medium leading-6 text-gray-900">送貨地點</label>
                    <input type="text" name="recipient_location" id="recipient_location" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.deliveryAddress.country">
                </div>

                <div class="mb-4">
                    <label for="recipient_city" class="block text-sm font-medium leading-6 text-gray-900">城市/縣</label>
                    <input type="text" name="recipient_city" id="recipient_city" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.deliveryAddress.county">
                </div>

                <div class="mb-4">
                    <label for="recipient_area" class="block text-sm font-medium leading-6 text-gray-900">地區</label>
                    <input type="text" name="recipient_area" id="recipient_area" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.deliveryAddress.district">
                </div>

                <div class="mb-4">
                    <label for="recipient_address" class="block text-sm font-medium leading-6 text-gray-900">地址</label>
                    <input type="text" name="recipient_address" id="recipient_address" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="" v-model="data.deliveryAddress.address">
                </div>

                <div class="flex mb-4  grid-justify-center grid-items-center">
                    <a href="#" class="inline-flex mr-1 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">取消</a>
                    <a href="#" class="inline-flex  w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click.prevent="saveMember">儲存</a>
                </div>
            </form>

        </div>

        <!--    RWD時在做 並包成元件
        <div class="sidebar flex grid-justify-center grid-items-center flex-col">
            <ul class="bg-red w-[80%] text-center">
                <li class="m-2">
                    <a href="#">個人資訊</a>
                </li>
                <li class="m-2">
                    <a href="#">訂單資訊</a>
                </li>
                <li class="m-2">
                    <a href="#">收藏商品</a>
                </li>
                <li class="m-2">
                    <a href="#">聊聊紀錄</a>
                </li>
            </ul>
        </div> -->
    </div>
</template>
