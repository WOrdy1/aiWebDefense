import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import AnimatedBackground from '../components/AnimatedBackground';

export default function LoginScreen() {
  const { signIn, loading, error, isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#000' }]} edges={['top', 'bottom']}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.wrapper}>
        <AnimatedBackground />

        <View
          style={[
            styles.formWrapper,
            {
              backgroundColor: isDarkMode ? 'rgba(25, 25, 25, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            },
          ]}
        >
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#2a0dd2ff' }]}>
            🔐 Вход в систему
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#333' : '#ddd',
              },
            ]}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#333' : '#ddd',
              },
            ]}
            placeholder="Пароль"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Войти</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.error}>⚠️ {error}</Text>}
          {message !== '' && (
            <Text style={[styles.message, { color: isDarkMode ? '#ccc' : '#333' }]}>{message}</Text>
          )}
          {isAuthenticated && <Text style={styles.success}>👤 Вы вошли как: {user?.name}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '85%',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
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
  },
  success: {
    marginTop: 15,
    color: 'green',
    fontWeight: '500',
  },
});
