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
export const useTokenFetch = (url, options) => {
  return $fetch(url, {
    baseURL,
    ...options,
    // onRequest({ request, options }) {
    //   options.headers = options.headers || {};
    //   const token = useCookie("token");
    //   // 設定請求時的 headers
    //   console.log("request :>> ", request);
    //   console.log("options :>> ", options);
    //   // options.headers.Authorization = token.value;
    //   options.headers.Authorization = `Bearer ${token.value}`;
    // },
    // onRequestError({ request, options, error }) {
    //   // 捕捉請求時發生的錯誤
    //   // console.log("request :>> ", request);
    //   // console.log("options :>> ", options);
    //   console.log("error :>> ", error);
    // },
    // onResponse({ request, response, options }) {
    //   // console.log("request :>> ", request);
    //   // console.log("response :>> ", response);
    //   // console.log("options :>> ", options);
    //   // 處理請求回覆資料
    //   return response;
    //   return response._data;
    // },
    // onResponseError({ request, response, options }) {
    //   // 捕捉請求回覆時發生的錯誤
    //   // console.log("request :>> ", request);
    //   // console.log("response :>> ", response);
    //   console.log("options :>> ", options);
    // },
  });
};
