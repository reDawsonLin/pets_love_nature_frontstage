import { defineStore } from "pinia";
import { useLocalStorage, useStorage, useStorageAsync } from "@vueuse/core";

export const useStoreLogin = defineStore("useStoreLogin", () => {
  const login = async (code) => {
    const res = await use$Fetch("customer/googleSignIn", {
      method: "POST",
      body: { code },
    });

    console.log("res :>> ", res);

    // sessionStorage.setItem("pets-token", res.data.token);
    // localStorage.setItem("pets-token", res.data.token);
    // token.value = useLocalStorage("pets-token");

    localStorage.setItem("pets-token", res.data.token);
    // const test = useStorage("pets-token", res.data.token);
    // const test = useStorage("pets-token", res.data.token);

    // console.log("test :>> ", test.value);

    // token.value = test.value;
  };

  // const token = computed(() => {
  //   // const store = useStorage("pets-token");
  //   // console.log('store :>> ', store.value);
  // });
  // const token = ref();
  // const token = useStorage('pets-token');
  const token = computed(() => {
    // const store = useStorage("pets-token");
    // console.log("store :>> ", store.value);
    // return store.value;
  });

  return { token, login };
});
