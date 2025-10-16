// src/api/auth.ts
import { apiClient } from './client';
import type { LoginResponse, User } from './types';

// 🔒 Тип пользователя с паролем (используется только при локальном тестировании)
interface LoginUser extends User {
  password: string;
}

/**
 * 🔐 Авторизация пользователя
 * Ищет пользователя в JSON-сервере по email и паролю
 */
export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    // 1️⃣ Загружаем всех пользователей из json-server
    const users = await apiClient.get<LoginUser[]>('/users');

    // 2️⃣ Ищем пользователя с совпадающими email и паролем
    const user = users.find(
      (u: LoginUser) =>
        u.email.toLowerCase() === username.toLowerCase() && String(u.password) === String(password),
    );

    // 3️⃣ Если не найден — ошибка
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // 4️⃣ Создаём mock-токен
    const token = `mock-token-${user.id}`;

    // 5️⃣ Возвращаем объект ответа (без пароля)
    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  } catch (error) {
    console.error('❌ Login failed:', error);
    throw error;
  }
}

/**
 * 👤 Получает текущего пользователя на основе mock-токена
 */
export async function getCurrentUser(token: string): Promise<User> {
  try {
    if (!token) throw new Error('No token provided');

    const id = token.split('-').pop();
    if (!id) throw new Error('Invalid token format');

    // ✅ apiClient уже возвращает чистый объект пользователя
    const user = await apiClient.get<User>(`/users/${id}`);
    return user;
  } catch (error) {
    console.error('⚠️ Failed to load current user:', error);
    throw error;
  }
}
