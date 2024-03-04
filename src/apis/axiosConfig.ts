import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://6d54-125-132-224-129.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;
