import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuthStore } from './src/store/authStore';
import LoginScreen from './src/screens/LoginScreen';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  const isDarkMode = false;
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  // Zustand store
  const { hydrateAuth, isAuthenticated, loading, user, signOut } = useAuthStore();

  // 🎬 Анимация появления контента
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Восстанавливаем токен при запуске
  useEffect(() => {
    hydrateAuth();
  }, []);

  // При изменении auth-состояния плавно показываем экран
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isAuthenticated, loading]);

  console.log('🧩 ENV TEST:', Config.API_BASE_URL);
  console.log('👤 Auth state:', { isAuthenticated, loading, user });

  // 🔄 Пока идёт загрузка
  if (loading) {
    return (
      <SafeAreaView style={[styles.center, backgroundStyle]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </SafeAreaView>
    );
  }

  // ⚙️ Основной контент: если вошёл → домашний экран
  const ScreenContent = isAuthenticated ? (
    <View style={styles.center}>
      <Text style={styles.title}>👋 Привет, {user?.name || 'пользователь'}!</Text>
      <Text style={styles.subtitle}>Вы успешно вошли в систему.</Text>

      {/* 🔘 Кнопка выхода */}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <LoginScreen />
  );

  // 💫 Оборачиваем всё в fade-анимацию
  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        {ScreenContent}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
