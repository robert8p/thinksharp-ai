import { Module } from '@/types';

export type SubscriptionTier = 'free' | 'premium' | 'lifetime';

export const pricing = {
  monthly: '£7.99',
  annual: '£59.99',
  lifetime: '£149.99'
};

export function isPremiumTier(tier: SubscriptionTier): boolean {
  return tier === 'premium' || tier === 'lifetime';
}

export function canAccessModule(module: Module, tier: SubscriptionTier): boolean {
  if (module.status === 'coming_soon') return false;
  if (!module.isPremium) return true;
  return isPremiumTier(tier);
}

export function canUseClaimAnalysis(args: { tier: SubscriptionTier; analysesToday: number; freeDailyLimit?: number }): boolean {
  if (isPremiumTier(args.tier)) return true;
  return args.analysesToday < (args.freeDailyLimit ?? 2);
}

export function canUsePremiumPractice(tier: SubscriptionTier, mode: 'challenge_ai' | 'premortem' | 'advanced'): boolean {
  if (mode === 'challenge_ai') return isPremiumTier(tier);
  if (mode === 'premortem') return isPremiumTier(tier);
  return isPremiumTier(tier);
}
