export interface User {
  id: number;
  email: string;
  name: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}
export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}
export interface LoginUser extends User {
  password: string;
}
