import { Share } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
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
    await Share.share({ message: `I scored ${getOverallMastery(scores)}% mastery on Humanity — a friendly daily workout for better judgment.` });
  };
  return (
    <Screen>
      <FunHeader emoji="🙂" title="Profile & trust" subtitle="Keep the app helpful, safe, and transparent." />
      <Card>
        <AppText variant="h3">{profile.displayName}</AppText>
        <AppText variant="muted">Tier: {profile.subscriptionTier}</AppText>
        <AppText variant="small">AI tools are reasoning support, not authoritative truth. Do not paste confidential company, legal, medical, financial, or personal data.</AppText>
      </Card>
      <CoachBubble text="Humanity should help you think, not tell you what to believe." emoji="🛡️" />
      <Button variant="secondary" onPress={shareDiagnostic}>Share my thinking score</Button>
      <Button variant="secondary" onPress={() => router.push('/paywall')}>Manage Humanity Plus</Button>
      <Button variant="secondary" onPress={async () => { const result = await startMockSubscription(); setTier(result.tier); }}>Toggle mock Plus</Button>
      <Card muted>
        <AppText variant="h3">Privacy controls</AppText>
        <AppText variant="muted">Data export and deletion are prepared as product surfaces. Connect Supabase functions before production release.</AppText>
        <Button variant="ghost" onPress={() => undefined}>Export data placeholder</Button>
        <Button variant="ghost" onPress={() => undefined}>Delete data placeholder</Button>
      </Card>
      <Card muted>
        <AppText variant="h3">Invite loop</AppText>
        <AppText variant="muted">Invite a friend to take the 5-minute thinking test.</AppText>
        <Button variant="ghost" onPress={() => Share.share({ message: 'Try Humanity: a friendly daily workout for better judgment.' })}>Invite a friend</Button>
      </Card>
      <Button variant="ghost" onPress={resetDemo}>Reset demo data</Button>
    </Screen>
  );
}
