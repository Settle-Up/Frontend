import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://3.34.147.95:8080/",
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const excludeEndpoints = ["/auth/kakao/callback"];
    if (!excludeEndpoints.includes(config.url!)) {
      const accessToken = sessionStorage.getItem("accessToken");
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
