import axios from 'axios';
import { BACKEND_URL } from '../config.js';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
