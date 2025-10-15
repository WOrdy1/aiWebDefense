import axios from 'axios';
export { setAuthToken, getAuthToken, clearAuthToken };

let accessToken: string | null = null;

function setAuthToken(token: string) {
  if (token === null || token.trim() === '') {
    throw new Error('Auth token cannot be empty or null');
  }
  accessToken = token;
}

function getAuthToken() {
  return accessToken;
}
function clearAuthToken() {
  accessToken = null;
}
