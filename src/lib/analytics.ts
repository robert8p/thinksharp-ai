export type AnalyticsEvent =
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'diagnostic_started'
  | 'diagnostic_completed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'mastery_achieved'
  | 'practice_started'
  | 'practice_completed'
  | 'ai_claim_analysed'
  | 'decision_premortem_completed'
  | 'paywall_viewed'
  | 'subscription_started_mock'
  | 'streak_updated'
  | 'review_completed'
  | 'daily_training_started'
  | 'daily_training_completed';

export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  // Replace with Segment, PostHog, Amplitude, or Supabase analytics later.
  // Keeping this console-first makes the MVP observable without external credentials.
  console.log(`[analytics] ${event}`, properties);
}
