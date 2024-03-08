import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e24f-114-202-117-12.ngrok-free.app/",
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
