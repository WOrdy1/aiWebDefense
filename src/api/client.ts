import axios from 'axios';
import Config from 'react-native-config';
import { getAuthToken } from './token';
import { NetworkError, TimeoutError, ApiError, UnexpectedError } from './errors';

let BASE_URL = Config.API_BASE_URL || 'https://api.aiwebdefense.com';
let TIMEOUT_MS = Number(Config.API_TIMEOUT_MS) || 10000; // 10 секунд по умолчанию
//console.log('API Client Config:', { BASE_URL, TIMEOUT_MS });
let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: headers,
});

export { apiClient };

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['X-Request-Id'] = Date.now().toString();
    config.headers['Accept-Language'] = 'en-US';

    if (__DEV__) {
      const hasToken = token ? '✅' : '❌';
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url} (auth: ${hasToken})`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new TimeoutError('Request timed out');
    }
    if (error.message === 'Network Error') {
      throw new NetworkError('No internet connection');
    }
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || `API Error: ${status}`;
      throw new ApiError(message, status);
    }
    throw new UnexpectedError('UnexpectedError');
  },
);

console.log('API Client Config:', { BASE_URL, TIMEOUT_MS });
