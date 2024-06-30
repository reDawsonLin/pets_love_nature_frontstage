<template>
  <div>
    <button type="button" @click="submit">送出</button>
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
// 在这里设置 Socket.IO 的连接选项，包括 headers
const socket = io("https://pets-love-nature-backend-n.onrender.com/", {
  extraHeaders: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3MTk2NDY0NjIsImV4cCI6MTcyMDI1MTI2Mn0.z0rb8vZnoTbiQjJoWLepFJkrI8NM1ZNqoiQ4WaG7LcU", // 在这里添加您的验证 token 或其他 headers
  },
});

// socket.emit("join room", { user_id: choseMember.value });
socket.on("admin message", (data) => {
  console.log(data);
});

//連線監聽
socket.on("connectStatus", (data) => {
  console.log(data);
});

//錯誤監聽
socket.on("errorMsg", (data) => {
  console.log(data);
});

//已讀監聽
socket.on("admin read", (data) => {
  console.log(data);
});

// errorMsg

function submit() {
  console.log(111);
  socket.emit("message", {
    userId: "66436361c2ae643fc43bf18a",
    role: "admin",
    message: "888",
  });
}
</script>

<style lang="scss" scoped></style>
