import { useEffect } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
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
      <AppText variant="h2">ThinkSharp Premium</AppText>
      <Card>
        <AppText variant="h3">Train beyond the basics</AppText>
        <AppText>Full curriculum, unlimited daily practice, advanced AI challenges, decision premortem coaching, and deeper progress analytics.</AppText>
      </Card>
      <Card><AppText variant="h3">Monthly · {pricing.monthly}</AppText><AppText variant="muted">Flexible monthly access.</AppText></Card>
      <Card><AppText variant="h3">Annual · {pricing.annual}</AppText><AppText variant="muted">Best recurring value.</AppText></Card>
      <Card><AppText variant="h3">Lifetime · {pricing.lifetime}</AppText><AppText variant="muted">Founding supporter access.</AppText></Card>
      <Button variant="premium" onPress={async () => { const state = await startMockSubscription(); setTier(state.tier); router.back(); }}>Start mock Premium</Button>
      <Button variant="ghost" onPress={() => router.back()}>Maybe later</Button>
    </Screen>
  );
}
