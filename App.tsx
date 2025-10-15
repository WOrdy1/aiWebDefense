import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';

// 👇 Импорт тестов API
import { apiGet } from './src/api/http'; // твоя универсальная функция
// (по желанию) import { testRetry } from './src/api/testRetry';
// (по желанию) import { testCancel } from './src/api/testCancel';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 🧠 Тест API-клиента при старте
  useEffect(() => {
    const testApi = async () => {
      console.log('🚀 Testing API Client...');
      try {
        // --- 1️⃣ Тест Retry ---
        await apiGet('/invalid-endpoint'); // вызовет NetworkError + Retry
        // --- 2️⃣ Пример запроса к dev-серверу ---
        // const data = await apiGet('/users/me');
        // console.log('✅ API Response:', data);
      } catch (error: any) {
        console.log('❌ API Error:', error.name, error.message);
      }

      // --- 3️⃣ Пример отмены запроса ---
      // const controller = new AbortController();
      // setTimeout(() => controller.abort(), 500);
      // try {
      //   await apiGet('/delay/5', {}, { signal: controller.signal });
      // } catch (err: any) {
      //   console.log('🚫 Canceled:', err.name, err.message);
      // }
    };

    testApi();
  }, []);

  console.log('🧩 ENV TEST:', Config.API_BASE_URL);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: isDarkMode ? Colors.white : Colors.black,
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              🌍 API_BASE_URL: {Config.API_BASE_URL ?? '❌ not set'}
            </Text>
          </View>

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
            back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
