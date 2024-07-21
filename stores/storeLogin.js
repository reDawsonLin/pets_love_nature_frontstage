import { defineStore } from "pinia";

export const useStoreLogin = defineStore("login", () => {
  const token = useCookie("token");
  const id_customer = useCookie("id_customer");
  const setToken = (value) => (token.value = value);

  const login = async (code) => {
    const res = await use$Fetch("/customer/googleSignIn", {
      method: "POST",
      body: { code },
    });

    token.value = res.data.token;
    id_customer.value = res.data.id;
  };

  return { token, id_customer, login, setToken };
});
