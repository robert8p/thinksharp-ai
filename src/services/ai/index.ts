import { isOpenAiConfigured } from '@/lib/env';
import { mockAIProvider } from '@/services/ai/mockProvider';
import { openAIProvider } from '@/services/ai/openaiProvider';

export const aiProvider = isOpenAiConfigured ? openAIProvider : mockAIProvider;
export * from './types';
