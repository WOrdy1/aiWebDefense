// api/errors.ts
// Custom error classes for handling different types of API errors
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
export class ApiError extends Error {
  statusCode: number; // число — HTTP-код
  code?: string; // строка, например AUTH_INVALID_TOKEN

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);

    this.statusCode = statusCode;
    this.code = code;
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnexpectedError';
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}
