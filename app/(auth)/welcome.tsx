import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { track } from '@/lib/analytics';
import { useAppStore } from '@/features/app/store';

export default function WelcomeScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  return (
    <Screen>
      <AppText variant="h1">Master critical thinking in the age of AI.</AppText>
      <AppText variant="muted">Train your judgment through daily scenarios, AI debates, bias drills, and real-world reasoning challenges.</AppText>
      <Card>
        <AppText variant="h3">A daily workout for better judgment</AppText>
        <AppText variant="muted">Five to ten minutes of active practice. No passive course treadmill. Every session asks you to judge, explain, challenge, or decide.</AppText>
      </Card>
      <Button onPress={() => { track('onboarding_started'); router.push('/(auth)/problem'); }}>Start sharpening</Button>
      <Button variant="ghost" onPress={() => { completeOnboarding(); router.replace('/(tabs)'); }}>Continue in demo mode</Button>
    </Screen>
  );
}
