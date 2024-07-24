import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://server2a.settleup.store/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {

    const url = config.url || '';
    const excludeEndpoints = ['/login', '/auth/login/social/kakao'];
    
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
