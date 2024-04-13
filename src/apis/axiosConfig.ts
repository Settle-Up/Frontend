import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.34.147.95:8080/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {
    const url = config.url || '';

    const excludeEndpoints = ['/login', '/auth/kakao/callback'];
    
    if (!excludeEndpoints.includes(url)) {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (config.params) {
        for (const key in config.params) {
          if (config.params.hasOwnProperty(key) && config.params[key] != null) {
            config.params[key] = encodeURIComponent(config.params[key]);
          }
        }
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
