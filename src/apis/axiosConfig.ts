import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://2d11-125-132-224-129.ngrok-free.app/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const excludeEndpoints = ["/auth/kakao/callback"];
    if (!excludeEndpoints.includes(config.url!)) {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("*************ACCESS TOKEN***************", accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
