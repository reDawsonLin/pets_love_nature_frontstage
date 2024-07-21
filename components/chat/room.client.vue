<script setup>
import { io } from "socket.io-client";

const token = useCookie("token");
const id_customer = useCookie("id_customer");
const socket = io("https://pets-love-nature-backend-n.onrender.com/", {
  extraHeaders: {
    Authorization: `Bearer ${token.value}`,
  },
});

const list_chat = ref(null);
const list_message = ref([]);
onMounted(async () => {
  socket.emit("join room", { customerId: id_customer.value, role: "client" });

  const { data } = await use$Fetch(`chat/getChatHistory/${id_customer.value}`);
  list_message.value = data[0].messageList;
  await nextTick();
  chatScrollToBottom();
});

function chatScrollToBottom() {
  list_chat.value.scrollTop = list_chat.value.scrollHeight;
}
const showChatRoom = ref(false);
async function chatRoomToggle(status) {
  if (!status) {
    if (showChatRoom.value) {
      showChatRoom.value = false;
    } else {
      showChatRoom.value = true;
      await nextTick();
      chatScrollToBottom();
    }

    return;
  }

  if (status) {
    showChatRoom.value = true;
    await nextTick();
    chatScrollToBottom();
  } else {
    showChatRoom.value = false;
  }
}

socket.on("message", async (message) => {
  list_message.value.push(message);

  await nextTick();
  chatScrollToBottom();
});

//連線監聽
socket.on("connectStatus", (data) => {
  // console.log("connectStatus", data);
});

//錯誤監聽
socket.on("errorMsg", (data) => {
  console.log("error msg", data);
});

//已讀監聽
socket.on("admin read", (data) => {
  // console.log("admin read", data);
});

// const isConnected = ref(false);
// const transport = ref("N/A");

// if (socket.connected) {
//   onConnect();
// }

// function onConnect() {
//   isConnected.value = true;
//   transport.value = socket.io.engine.transport.name;

//   socket.io.engine.on("upgrade", (rawTransport) => {
//     transport.value = rawTransport.name;
//   });
// }

// function onDisconnect() {
//   isConnected.value = false;
//   transport.value = "N/A";
// }

// socket.on("connect", onConnect);
// socket.on("disconnect", onDisconnect);

// onBeforeUnmount(() => {
//   socket.off("connect", onConnect);
//   socket.off("disconnect", onDisconnect);
// });
// ----------------------------
const chatMessage = ref("");
const chatKeydown = (event) => {
  const key = event.key;
  if (key === "Enter") sendMessage();
};

const sendMessage = async () => {
  if (!chatMessage.value || !chatMessage.value.trim()) {
    // console.log("empty message");
    return;
  }

  // console.log("send message");

  socket.emit("message", {
    customerId: id_customer.value,
    role: "client",
    message: chatMessage.value,
  });

  list_message.value.push({
    role: "client",
    message: chatMessage.value,
    createdAt: new Date(),
  });

  await nextTick();
  chatMessage.value = "";
  chatScrollToBottom();
};

// ----------------------------

// const chatCount = ref(10);
const { y: windowScroll } = useWindowScroll();
// const showChat = computed(() => {
//   const targetPoint = document?.body.scrollHeight - window?.innerHeight - 300;

//   if (windowScroll.value > targetPoint) return true;
//   else return false;
// });
// const { width: window_width } = useWindowSize();
</script>

<template>
  <div
    class="fixed bottom-3rem right-0.75rem z-10 flex flex-col items-end gap-1rem opacity-0 transition-opacity md:(right-3vw)"
    :class="{ 'opacity-100': windowScroll >= 0 }"
  >
    <section
      v-show="showChatRoom"
      class="char_room max-w-80vw w-375px flex flex-col rounded-0.5rem bg-neutral-50 shadow-lg"
    >
      <header
        class="flex justify-between rounded-t-0.5rem bg-rose-500 px-0.75rem py-1rem text-neutral-50"
      >
        <div class="box flex gap-0.5rem">
          <SvgIcon name="logo_light" class="aspect-32/30 w-1.5rem" />
          <SvgIcon name="brand_name" class="aspect-120/27 w-6.25rem" />
        </div>

        <SvgIcon
          name="minus"
          class="w-2rem cursor-pointer"
          @click="chatRoomToggle(false)"
        />
      </header>

      <div
        ref="list_chat"
        class="list_chat h-300px flex flex-col gap-2rem overflow-y-auto p-0.75rem"
      >
        <template v-for="(item, index) in list_message" :key="index">
          <div class="chat w-80%" :class="item.role === 'client' ? 'client' : 'admin'">
            <p class="message rounded-0.5rem p-0.75rem">
              {{ item.message }}
            </p>
            <p class="time mt-0.25rem px-0.25rem text-0.75rem text-neutral-400">
              {{ $dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") }}
            </p>
          </div>
        </template>
      </div>

      <label
        class="box_input m-1rem w-[100%-2rem] flex gap-0.5rem border border-2px border-neutral-200 rounded-0.5rem p-0.5rem"
      >
        <input
          v-model="chatMessage"
          class="w-100% bg-transparent outline-none"
          @keydown="chatKeydown($event)"
        >

        <SvgIcon
          name="submit"
          class="w-1.5rem cursor-pointer active:(opacity-90) hover:(opacity-70)"
          @click="sendMessage()"
        />
      </label>
    </section>

    <div
      class="chat_icon relative h-3.5rem w-3.5rem flex cursor-pointer items-center justify-center rounded-50% bg-rose-500"
      @click="chatRoomToggle()"
    >
      <SvgIcon v-if="showChatRoom" name="close" class="h-2rem w-2rem text-white" />
      <SvgIcon v-else name="chat" class="h-2rem w-2rem text-white" />

      <!-- <span
        v-show="!showChatRoom"
        class="absolute right--0.25rem top--0.25rem h-1.25rem w-1.25rem flex items-center justify-center border border-2px border-white rounded-50% bg-rose-500 text-0.75rem text-white"
        >{{ chatCount > 9 ? "9+" : chatCount }}
      </span> -->
    </div>
  </div>

  <!-- <div
    class="fixed bottom-2rem right-2rem w-10rem h-10rem bg-neutral-100 border border-red-5"
  >
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>

    <p>{{ id_customer }}</p>

    <input type="text" v-model="chatMessage" />

    <button type="button" @click="sendMessage()">submit</button>
  </div> -->
</template>

<style scoped>
.list_chat {
  .chat {
    &.client {
      @apply self-end;

      .message {
        @apply bg-rose-500 text-neutral-50;
      }

      .time {
        @apply text-end;
      }
    }

    &.admin {
      .message {
        @apply bg-neutral-200 text-neutral-800;
      }
    }
  }
}
</style>
