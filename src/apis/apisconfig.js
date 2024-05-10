import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://34.87.131.230:8005/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, DELETE, PATCH, OPTIONS";
    config.headers["Content-Type"] = "application/json";
    const access_token = localStorage.getItem("isLogin");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
      config.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
