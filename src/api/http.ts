import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from './client';

/**
 * Универсальная функция для HTTP-запросов.
 * Может вернуть либо T (data), либо AxiosResponse<T> при fullResponse.
 */
async function request<T, R = T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  data?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  const response = await apiClient.request<T>({
    method,
    url: path,
    ...(method === 'get' || method === 'delete' ? { params: data?.params } : { data }),
    ...config,
  });

  if (config?.fullResponse) {
    // Возвращаем полный ответ
    return response as unknown as R;
  }

  // Возвращаем только полезные данные
  return response.data as unknown as R;
}

/**
 * Обёртки для различных HTTP-методов
 */

export async function apiGet<T, R = T>(
  path: string,
  params?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  return request<T, R>('get', path, { params }, config);
}

export async function apiPost<T, R = T>(
  path: string,
  body?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  return request<T, R>('post', path, body, config);
}

export async function apiPut<T, R = T>(
  path: string,
  body?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  return request<T, R>('put', path, body, config);
}

export async function apiPatch<T, R = T>(
  path: string,
  body?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  return request<T, R>('patch', path, body, config);
}

export async function apiDelete<T, R = T>(
  path: string,
  params?: any,
  config?: AxiosRequestConfig & { fullResponse?: boolean },
): Promise<R> {
  return request<T, R>('delete', path, { params }, config);
}
