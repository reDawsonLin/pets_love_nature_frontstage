import { defineStore } from "pinia";
import { useLocalStorage, useStorage } from "@vueuse/core";

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

    // localStorage.setItem("pets-token", "res.data.token");

    const test = useStorage(
      "pets-token",
      res.data.token,
      localStorage,
      { mergeDefaults: true } // <--
    );
    console.log("test :>> ", test);
  };

  // const token = useLocalStorage("pets-token");
  const token = ref();

  return { token, login };
});
