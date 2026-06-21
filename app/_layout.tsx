import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.bg }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson' }} />
        <Stack.Screen name="practice/daily" options={{ title: 'Daily Training' }} />
        <Stack.Screen name="practice/review" options={{ title: 'Review Queue' }} />
        <Stack.Screen name="practice/fallacy" options={{ title: 'Fallacy Spotter' }} />
        <Stack.Screen name="practice/bias" options={{ title: 'Bias Detector' }} />
        <Stack.Screen name="ai/claim-analyser" options={{ title: 'Analyse a Claim' }} />
        <Stack.Screen name="ai/challenge-ai" options={{ title: 'Challenge AI' }} />
        <Stack.Screen name="ai/decision-premortem" options={{ title: 'Decision Premortem' }} />
        <Stack.Screen name="paywall/index" options={{ title: 'ThinkSharp Premium', presentation: 'modal' }} />
      </Stack>
    </>
  );
}
