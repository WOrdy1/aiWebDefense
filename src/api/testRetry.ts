import { apiGet } from './http';

export async function testRetry() {
  try {
    console.log('🚀 Sending test request...');
    const data = await apiGet('/test'); // специально неверный путь
    console.log('✅ Success:', data);
  } catch (err: any) {
    console.log('❌ Error:', err.name, err.message);
  }
}
