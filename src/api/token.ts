import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let accessToken: string | null = null;

const AUTH_TOKEN_KEY = 'AUTH_ACCESS_TOKEN';

function setAuthToken(token: string) {
  if (token === null || token.trim() === '') {
    throw new Error('Auth token cannot be empty or null');
  }
  accessToken = token;
}

function getAuthToken() {
  return accessToken;
}
async function clearAuthToken() {
  accessToken = null;
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

async function saveAuthToken(token: string): Promise<void> {
  if (token === null || token.trim() === '') {
    throw new Error('Auth token cannot be empty or null');
  }
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  accessToken = token;
}

async function loadAuthToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    if (token) {
      accessToken = token;
      return token;
    } else {
      accessToken = null;
      return null;
    }
  } catch (error) {
    console.warn('Failed to load auth token:', error);
    accessToken = null;
    return null;
  }
}

export { saveAuthToken, getAuthToken, clearAuthToken, loadAuthToken };
