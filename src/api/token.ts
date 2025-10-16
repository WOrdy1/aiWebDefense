import AsyncStorage from '@react-native-async-storage/async-storage';

let accessToken: string | null = null;

const AUTH_TOKEN_KEY = 'AUTH_ACCESS_TOKEN';

// ✅ Сохранить токен
async function saveAuthToken(token: string): Promise<void> {
  if (!token || token.trim() === '') {
    throw new Error('Auth token cannot be empty or null');
  }
  accessToken = token;
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

// ✅ Загрузить токен
async function loadAuthToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    accessToken = token;
    return token;
  } catch (error) {
    console.warn('Failed to load auth token:', error);
    accessToken = null;
    return null;
  }
}

// ✅ Получить токен из памяти
function getAuthToken(): string | null {
  return accessToken;
}

// ✅ Очистить токен
async function clearAuthToken(): Promise<void> {
  accessToken = null;
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

export { saveAuthToken, getAuthToken, loadAuthToken, clearAuthToken };
