import { env } from '@/lib/env';
import { track } from '@/lib/analytics';
import { SubscriptionTier } from '@/features/subscriptions/gating';

export interface SubscriptionState {
  tier: SubscriptionTier;
  isPremium: boolean;
  source: 'mock' | 'revenuecat';
}

export async function getSubscriptionState(currentTier: SubscriptionTier): Promise<SubscriptionState> {
  if (env.mockPremium) {
    return { tier: 'premium', isPremium: true, source: 'mock' };
  }
  return { tier: currentTier, isPremium: currentTier !== 'free', source: 'mock' };
}

export async function startMockSubscription(): Promise<SubscriptionState> {
  track('subscription_started_mock');
  return { tier: 'premium', isPremium: true, source: 'mock' };
}

export async function restorePurchases(): Promise<SubscriptionState> {
  return { tier: env.mockPremium ? 'premium' : 'free', isPremium: env.mockPremium, source: 'mock' };
}
