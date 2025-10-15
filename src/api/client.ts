import axios from 'axios';
import Config from 'react-native-config';
import { getAuthToken } from './token';
import { NetworkError, TimeoutError, ApiError, UnexpectedError } from './errors';

let BASE_URL = Config.API_BASE_URL || 'https://api.aiwebdefense.com';
let TIMEOUT_MS = Number(Config.API_TIMEOUT_MS) || 10000; // 10 секунд по умолчанию

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// создаём основной инстанс axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: headers,
});

export { apiClient };

// ==============================
// REQUEST INTERCEPTOR
// ==============================
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    // Добавляем токен, если он установлен
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Добавляем уникальный ID и язык
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

// ==============================
// RESPONSE INTERCEPTOR + RETRY
// ==============================
const MAX_RETRIES = 2;

apiClient.interceptors.response.use(
  (response) => {
    // успешный ответ → вернуть данные
    return response.data;
  },
  async (error) => {
    const config = error.config;

    // ==============================
    // ✅ 1. Обработка отмены запроса (AbortController)
    // ==============================
    if (axios.isCancel?.(error)) {
      console.log('🚫 Request canceled by user');
      throw new UnexpectedError('Request was canceled');
    }

    // ==============================
    // ✅ 2–3. Классификация и Retry
    // ==============================
    if (!config._retryCount) config._retryCount = 0;

    const isTimeout = error.code === 'ECONNABORTED';
    const isNetwork = error.message === 'Network Error';
    const isServerError = error.response && error.response.status >= 500;

    const shouldRetry =
      (isTimeout || isNetwork || isServerError) && config._retryCount < MAX_RETRIES;

    if (shouldRetry) {
      config._retryCount++;
      const delay = 200 * 2 ** (config._retryCount - 1);
      if (__DEV__) console.log(`🔁 Retry #${config._retryCount} after ${delay}ms`);
      await new Promise((res) => setTimeout(res, delay));
      return apiClient.request(config);
    }

    // Если уже исчерпаны попытки — теперь выбрасываем кастомные ошибки
    if (isTimeout) throw new TimeoutError('Request timed out');
    if (isNetwork) throw new NetworkError('No internet connection');

    // ==============================
    // ✅ 4. ApiError
    // ==============================
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || `API Error: ${status}`;
      throw new ApiError(message, status);
    }

    // ==============================
    // ✅ 5. Всё остальное → UnexpectedError
    // ==============================
    throw new UnexpectedError('Unexpected error occurred');
  },
);

console.log('✅ API Client Config:', { BASE_URL, TIMEOUT_MS });
