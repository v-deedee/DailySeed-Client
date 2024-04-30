import axios from 'axios';
import { API_BASE_URL } from '../utils/constants/api.constants';

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url, params) => publicApi.get(url, { params });
export const post = (url, data) => publicApi.post(url, data);
export const put = (url, data) => publicApi.put(url, data);
export const remove = (url) => publicApi.delete(url);

export default publicApi;