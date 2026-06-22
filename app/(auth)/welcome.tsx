import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';
import { track } from '@/lib/analytics';
import { useAppStore } from '@/features/app/store';

export default function WelcomeScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  return (
    <Screen>
      <FunHeader
        eyebrow="Humanity"
        emoji="🌍"
        title="Think better, one tiny quest at a time."
        subtitle="A friendly daily workout for judgment, AI literacy, evidence checks, and calmer decisions."
      />
      <CoachBubble text="No lectures. No expert jargon. I’ll give you short challenges, instant feedback, and a clear next step." />
      <Card playful>
        <AppText variant="h3">Today’s promise</AppText>
        <AppText>Spend 5–10 minutes. Spot one trap. Practise one better question. Leave a little sharper.</AppText>
      </Card>
      <Button onPress={() => { track('onboarding_started'); router.push('/(auth)/problem'); }}>Start my first quest</Button>
      <Button variant="secondary" onPress={() => { completeOnboarding(); router.replace('/(tabs)'); }}>Try demo mode</Button>
    </Screen>
  );
}
