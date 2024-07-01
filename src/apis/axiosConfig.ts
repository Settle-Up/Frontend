import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://7af7-125-132-224-129.ngrok-free.app/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['ngrok-skip-browser-warning'] = 'true'; // should get rid of this later 

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
