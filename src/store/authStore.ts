import { create } from 'zustand';
import { saveAuthToken, loadAuthToken, clearAuthToken } from '../api/token';
import { login, getCurrentUser } from '../api/auth';
import type { User } from '../api/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  hydrateAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // 🔐 Вход
  signIn: async (username, password) => {
    try {
      set({ loading: true, error: null });
      const { token, user } = await login(username, password);
      await saveAuthToken(token);
      set({ user, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return false;
    }
  },

  // 🚪 Выход
  signOut: async () => {
    await clearAuthToken();
    set({ user: null, isAuthenticated: false });
  },

  // ♻️ Автовход при старте
  hydrateAuth: async () => {
    set({ loading: true });

    try {
      const token = await loadAuthToken();

      if (!token) {
        // ❌ токена нет → пользователь не авторизован
        set({ isAuthenticated: false, user: null, loading: false });
        return;
      }

      // ✅ токен найден → получаем пользователя
      const user = await getCurrentUser(token);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      console.warn('hydrateAuth failed:', error);
      await clearAuthToken();
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));
