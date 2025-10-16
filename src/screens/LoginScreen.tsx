import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const { signIn, loading, error, isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setMessage('');
    const success = await signIn(email, password);
    if (success) {
      setMessage(`✅ Вход выполнен. Привет, ${user?.name || 'пользователь'}!`);
    } else {
      setMessage('❌ Ошибка входа. Проверьте email или пароль.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Вход в систему</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Войти</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>⚠️ {error}</Text>}
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      {isAuthenticated && <Text style={styles.success}>👤 Вы вошли как: {user?.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  message: {
    marginTop: 10,
    color: '#333',
  },
  success: {
    marginTop: 15,
    color: 'green',
    fontWeight: '500',
  },
});
