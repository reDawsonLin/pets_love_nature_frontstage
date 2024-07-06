// import { useStoreLogin } from "~/stores/login";

// const store_login = useStoreLogin();
// const { token } = storeToRefs(store_login);

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
      // 暫時把快取關掉
      options.initialCache = false;
      options.headers.authorization = `Bearer ${token.value}`;
    },
    onRequestError({ error }) {
      console.log("on request error :>> ", error);
      return 
    },
    onResponse() {
      // Process the response data
      // console.log("on response");
      // console.log("response :>> ", response);
    },
    onResponseError(error) {
      console.log("on response error :>> ", error);
      return error
    },
  });
};

// for pre fetching data -------
export const useApiFetch = (url, options) => {
  // console.log("url :>> ", url);
  // console.log("options :>> ", { options });

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
      // Process the response data
      // console.log("on response");
      // console.log("response :>> ", response);
    },
    onResponseError({ response }) {
      console.log("on response error :>> ", response);
    },
  });
};

//   onRequest({ request, options }) {
//     // Set the request headers
//     options.headers = options.headers || {};
//     // 暫時把快取關掉
//     options.initialCache = false;
//     options.headers.authorization = `Bearer ${token.value}`;
//   },
//   onRequestError({ request, options, error }) {
//     console.log("on request error :>> ", error);
//   },
//   onResponse({ request, response, options }) {
//     // Process the response data
//     // console.log("on response");
//     // console.log("response :>> ", response);
//   },
//   onResponseError({ request, response, options }) {
//     console.log("on response error :>> ", response);
//   },
// });
