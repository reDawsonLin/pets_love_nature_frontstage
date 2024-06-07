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

  return await useFetch(url, {
    baseURL,
    onRequest({ request, options }) {
      console.log("on request");
      console.log("request :>> ", request);
      console.log("options :>> ", options);
      // Set the request headers
      options.headers = options.headers || {};
      // 暫時把快取關掉
      options.initialCache = false;
      options.headers.authorization = `Bearer ${token.value}`;
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log("on request error :>> ", error);
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log("on response");
      console.log("response :>> ", response);
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log("on response error");
      console.log("response :>> ", response);
    },
  });
};
