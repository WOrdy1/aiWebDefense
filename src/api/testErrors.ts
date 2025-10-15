import { ApiError, NetworkError, TimeoutError } from './errors';

const apiErr = new ApiError('Token expired', 401, 'AUTH_INVALID_TOKEN');
const netErr = new NetworkError('No internet');
const timeErr = new TimeoutError('Request timed out');

console.log(apiErr instanceof ApiError); // true
console.log(netErr instanceof NetworkError); // true
console.log(timeErr instanceof TimeoutError); // true
console.log(apiErr instanceof Error); // true
console.log(netErr instanceof Error); // true
