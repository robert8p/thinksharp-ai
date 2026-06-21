import { modules } from '@/data/seedContent';
import { canAccessModule, canUseClaimAnalysis, canUsePremiumPractice } from '@/features/subscriptions/gating';

describe('premium gating', () => {
  test('free users can access module 1 but not premium modules', () => {
    expect(canAccessModule(modules[0], 'free')).toBe(true);
    expect(canAccessModule(modules[1], 'free')).toBe(false);
    expect(canAccessModule(modules[1], 'premium')).toBe(true);
  });

  test('free claim analysis is limited', () => {
    expect(canUseClaimAnalysis({ tier: 'free', analysesToday: 0, freeDailyLimit: 2 })).toBe(true);
    expect(canUseClaimAnalysis({ tier: 'free', analysesToday: 2, freeDailyLimit: 2 })).toBe(false);
    expect(canUseClaimAnalysis({ tier: 'premium', analysesToday: 100 })).toBe(true);
  });

  test('advanced practice is premium gated', () => {
    expect(canUsePremiumPractice('free', 'premortem')).toBe(false);
    expect(canUsePremiumPractice('premium', 'premortem')).toBe(true);
  });
});
