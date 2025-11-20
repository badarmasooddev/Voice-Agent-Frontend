// @third-party
import axios from 'axios';

// @project
import { AUTH_USER_KEY } from '@/config';

const axiosInstance = axios.create({
  baseURL: 'https://teraleads-api.trixlyai.com/api'
  // baseURL: 'http://localhost:3000/api'
});

/***************************  AXIOS MIDDLEWARE  ***************************/

axiosInstance.interceptors.request.use(
  async (config) => {
    const storedValue = localStorage.getItem("auth-user");
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;


    if (parsedValue?.data?.token || parsedValue?.token) {
      config.headers["Authorization"] = `${parsedValue.data.token || parsedValue?.token} `;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/auth/login')) {
      window.location.pathname = '/auth/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosInstance;
