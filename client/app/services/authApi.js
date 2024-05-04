import axios from 'axios';
import { API_BASE_URL } from '../utils/constants/api.constants';
import { getTokenFromLocalStorage } from './auth/token.services';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const get = (url, params) => authApi.get(url, { params });
export const post = (url, data) => authApi.post(url, data);
export const put = (url, data) => authApi.put(url, data);
export const remove = (url) => authApi.delete(url);

export default authApi;