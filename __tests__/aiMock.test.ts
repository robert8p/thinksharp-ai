import { mockAIProvider } from '@/services/ai/mockProvider';
import { claimAnalysisSchema, decisionPremortemFeedbackSchema } from '@/services/ai/types';

describe('mock AI provider', () => {
  test('returns valid claim analysis schema', async () => {
    const output = await mockAIProvider.analyseClaim('AI will replace all managers within two years.');
    expect(() => claimAnalysisSchema.parse(output)).not.toThrow();
    expect(output.betterQuestions.length).toBeGreaterThan(0);
  });

  test('returns valid decision premortem schema', async () => {
    const output = await mockAIProvider.createDecisionPremortem('Launch a new premium AI literacy training app in September.');
    expect(() => decisionPremortemFeedbackSchema.parse(output)).not.toThrow();
    expect(output.mitigations.length).toBeGreaterThan(0);
  });
});
