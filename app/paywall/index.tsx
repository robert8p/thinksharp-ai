import { useEffect } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';
import { useAppStore } from '@/features/app/store';
import { pricing } from '@/features/subscriptions/gating';
import { track } from '@/lib/analytics';
import { startMockSubscription } from '@/services/subscriptions/subscriptionService';

export default function PaywallScreen() {
  useEffect(() => { track('paywall_viewed'); }, []);
  const setTier = useAppStore((state) => state.setSubscriptionTier);
  return (
    <Screen>
      <FunHeader emoji="⭐" title="Humanity Plus" subtitle="More quests, deeper practice, and unlimited thinking tools." />
      <CoachBubble text="Free users get real value. Plus unlocks the full training path when you want to go further." emoji="🚀" />
      <Card playful>
        <AppText variant="h3">Train beyond the basics</AppText>
        <AppText>Full curriculum, unlimited daily practice, advanced AI challenges, decision premortem coaching, and deeper progress analytics.</AppText>
      </Card>
      <Card><AppText variant="h3">Monthly · {pricing.monthly}</AppText><AppText variant="muted">Flexible monthly access.</AppText></Card>
      <Card><AppText variant="h3">Annual · {pricing.annual}</AppText><AppText variant="muted">Best recurring value.</AppText></Card>
      <Card><AppText variant="h3">Lifetime · {pricing.lifetime}</AppText><AppText variant="muted">Founding supporter access.</AppText></Card>
      <Button variant="premium" onPress={async () => { const state = await startMockSubscription(); setTier(state.tier); router.back(); }}>Start mock Plus</Button>
      <Button variant="secondary" onPress={() => router.back()}>Maybe later</Button>
    </Screen>
  );
}
