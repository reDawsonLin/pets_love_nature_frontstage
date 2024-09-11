const baseURL = "https://pets-love-nature-backend-n.onrender.com/api/v1";

// for client side function fetching ----
export const use$Fetch = (url, options) => {
  return $fetch(url, {
    baseURL,
    ...options,
  });
};

export const useToken$Fetch = async (url, options) => {
  const token = useCookie("token");
  if (!token.value) console.log("cookie 無 token");

  return await $fetch(url, {
    baseURL,
    ...options,
    onRequest({ options }) {
      // Set the request headers
      options.headers = options.headers || {};

      // options.initialCache = false;
      options.headers.authorization = `Bearer ${token.value}`;
    },
    onRequestError({ error }) {
      console.log("on request error :>> ", error);
      return;
    },
    onResponse() {},
    onResponseError(error) {
      console.log("on response error :>> ", error);
      return error;
    },
  });
};

// for pre fetching data -------
export const useApiFetch = (url, options) => {
  return useFetch(url, {
    baseURL,
    ...options,
  });
};

// for need token data -------
export const useTokenFetch = async (url, options) => {
  const token = useCookie("token");
  if (!token.value) return "cookie 無 token";

  return await useFetch(url, {
    baseURL,
    ...options,
    onRequest({ options }) {
      // Set the request headers
      options.headers = options.headers || {};
      // 暫時把快取關掉
      options.initialCache = false;
      options.headers.authorization = `Bearer ${token.value}`;
    },
    onRequestError({ error }) {
      console.log("on request error :>> ", error);
    },
    onResponse() {
    },
    onResponseError({ response }) {
      console.log("on response error :>> ", response);
    },
  });
};
