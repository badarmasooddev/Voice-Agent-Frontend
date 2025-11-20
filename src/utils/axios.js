// @third-party
import axios from 'axios';

// @project
import { AUTH_USER_KEY } from '@/config';

const axiosServices = axios.create({
  baseURL: (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001')
});

/***************************  AXIOS MIDDLEWARE  ***************************/

axiosServices.interceptors.request.use(
  async (config) => {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem("auth-user") : null;
    const parsedValue = storedValue && JSON.parse(storedValue);

    if (parsedValue?.access_token || parsedValue?.token) {
      config.headers['Authorization'] = `Bearer ${parsedValue.access_token || parsedValue.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 && !window.location.href.includes('/auth/login')) {
//       window.location.pathname = '/auth/login';
//     }
//     return Promise.reject((error.response && error.response.data) || 'Wrong Services');
//   }
// );

export default axiosServices;
