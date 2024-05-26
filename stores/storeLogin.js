import { defineStore } from "pinia";

export const useStoreLogin = defineStore(
  "login",
  () => {
    const isLogin = ref(false);
    const token = useCookie("token");
    const id_customer = useCookie("id_customer");
    const setToken = (value) => (token.value = value);

    const login = async (code) => {
      console.log("in login function");

      const res = await use$Fetch("/customer/googleSignIn", {
        method: "POST",
        body: { code },
      });

      console.log("res :>> ", res);

      token.value = res.data.token;
      id_customer.value = res.data.id;
    };

    return { isLogin, token, id_customer, login, setToken };
  }
  // {
  //   persist: {
  //     storage: process.client ? sessionStorage : null,
  //   },
  // }
);
