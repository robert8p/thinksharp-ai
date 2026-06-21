export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabasePublishableKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
  openAiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? '',
  openAiModel: process.env.EXPO_PUBLIC_OPENAI_MODEL ?? 'gpt-4.1-mini',
  mockPremium: (process.env.EXPO_PUBLIC_MOCK_PREMIUM ?? 'false').toLowerCase() === 'true'
};

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabasePublishableKey);
export const isOpenAiConfigured = Boolean(env.openAiApiKey);
