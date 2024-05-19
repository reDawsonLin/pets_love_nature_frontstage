// const baseURL = "http://52.249.219.33:132/api/";
// const baseURL = "http://20.168.8.97:132/api/";
// const baseURL = "https://cmstest.westus3.cloudapp.azure.com:132/api/";
const baseURL = "http://pets-love-nature-backend-n.onrender.com/api/v1/";


export const useApiFetch = (url, options) => {
  // console.log("url :>> ", url);
  // console.log("options :>> ", { options });

  return useFetch(url, {
    baseURL,
    ...options,
  });
};
