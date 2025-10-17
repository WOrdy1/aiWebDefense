import React from 'react';
import { View, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const AnimatedBackground = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#000000' }, // всегда чёрный
      ]}
    >
      <LottieView
        source={require('../../assets/animations/NetworkBackground.json')}
        autoPlay
        loop
        resizeMode="contain" // 👈 сохраняем пропорции
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // на весь экран
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 0,
  },
  animation: {
    width: width, // 👈 ровно ширина экрана
    height: height, // 👈 ровно высота экрана
    opacity: 0.55, // чуть прозрачнее
  },
});

export default AnimatedBackground;
