import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, hydrateAuth, loading } = useAuthStore();

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Авторизация' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
