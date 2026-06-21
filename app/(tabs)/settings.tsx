import { Share } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { useAppStore } from '@/features/app/store';
import { getOverallMastery } from '@/features/progress/mastery';
import { startMockSubscription } from '@/services/subscriptions/subscriptionService';

export default function SettingsScreen() {
  const profile = useAppStore((state) => state.profile);
  const scores = useAppStore((state) => state.skillScores);
  const setTier = useAppStore((state) => state.setSubscriptionTier);
  const resetDemo = useAppStore((state) => state.resetDemo);
  const shareDiagnostic = async () => {
    await Share.share({ message: `I scored ${getOverallMastery(scores)}% mastery on ThinkSharp AI — a daily workout for better judgment.` });
  };
  return (
    <Screen>
      <AppText variant="h2">Profile & Trust</AppText>
      <Card>
        <AppText variant="h3">{profile.displayName}</AppText>
        <AppText variant="muted">Tier: {profile.subscriptionTier}</AppText>
        <AppText variant="small">AI tools are reasoning support, not authoritative truth. Do not paste confidential company, legal, medical, financial, or personal data.</AppText>
      </Card>
      <Button variant="secondary" onPress={shareDiagnostic}>Share diagnostic result</Button>
      <Button variant="secondary" onPress={() => router.push('/paywall')}>Manage Premium</Button>
      <Button variant="secondary" onPress={async () => { const result = await startMockSubscription(); setTier(result.tier); }}>Toggle mock premium</Button>
      <Card muted>
        <AppText variant="h3">Privacy controls</AppText>
        <AppText variant="muted">Data export and deletion are prepared as product surfaces. Connect Supabase functions before production release.</AppText>
        <Button variant="ghost" onPress={() => undefined}>Export data placeholder</Button>
        <Button variant="ghost" onPress={() => undefined}>Delete data placeholder</Button>
      </Card>
      <Card muted>
        <AppText variant="h3">Invite loop</AppText>
        <AppText variant="muted">Invite a friend to take the 5-minute thinking test.</AppText>
        <Button variant="ghost" onPress={() => Share.share({ message: 'Try ThinkSharp AI: your daily workout for better judgment.' })}>Invite a friend</Button>
      </Card>
      <Button variant="ghost" onPress={resetDemo}>Reset demo data</Button>
    </Screen>
  );
}
