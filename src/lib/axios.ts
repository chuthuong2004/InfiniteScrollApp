import axios from 'axios';
import {BASE_URL} from 'configs';

// ** Key chain
const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
  adapter: ['xhr', 'http', 'https'],
});

// ** Interceptor request
axiosClient.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

// ** Interceptor response
axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    return Promise.reject(error);
  },
);
export default axiosClient;
