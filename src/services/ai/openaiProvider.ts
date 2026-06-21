import { env } from '@/lib/env';
import {
  AIChallengeExplanationOutput,
  AIProvider,
  ClaimAnalysisOutput,
  DecisionPremortemFeedbackOutput,
  SocraticFeedbackOutput,
  aiChallengeExplanationSchema,
  claimAnalysisSchema,
  decisionPremortemFeedbackSchema,
  socraticFeedbackSchema
} from '@/services/ai/types';
import { mockAIProvider } from '@/services/ai/mockProvider';

type SchemaName = 'claim_analysis' | 'socratic_feedback' | 'ai_challenge' | 'decision_premortem';

async function callStructured<T>(schemaName: SchemaName, instructions: string, input: string, parse: (value: unknown) => T): Promise<T> {
  if (!env.openAiApiKey) {
    throw new Error('OpenAI API key is not configured.');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.openAiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: env.openAiModel,
      input: [
        {
          role: 'system',
          content: instructions
        },
        {
          role: 'user',
          content: input
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: schemaName,
          strict: true,
          schema: schemaFor(schemaName)
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const text = payload.output_text ?? payload.output?.[0]?.content?.[0]?.text;
  if (!text) throw new Error('OpenAI response did not include JSON text output.');
  return parse(JSON.parse(text));
}

function schemaFor(name: SchemaName) {
  const common = { type: 'object', additionalProperties: false } as const;
  if (name === 'claim_analysis') {
    return {
      ...common,
      required: ['claim', 'assumptions', 'evidenceNeeded', 'possibleWeaknesses', 'betterQuestions', 'confidenceLevel', 'caveat'],
      properties: {
        claim: { type: 'string' },
        assumptions: { type: 'array', items: { type: 'string' } },
        evidenceNeeded: { type: 'array', items: { type: 'string' } },
        possibleWeaknesses: { type: 'array', items: { type: 'string' } },
        betterQuestions: { type: 'array', items: { type: 'string' } },
        confidenceLevel: { type: 'string', enum: ['low', 'medium', 'high'] },
        caveat: { type: 'string' }
      }
    };
  }
  if (name === 'socratic_feedback') {
    return {
      ...common,
      required: ['summary', 'strengths', 'gaps', 'questions', 'nextPractice'],
      properties: {
        summary: { type: 'string' },
        strengths: { type: 'array', items: { type: 'string' } },
        gaps: { type: 'array', items: { type: 'string' } },
        questions: { type: 'array', items: { type: 'string' } },
        nextPractice: { type: 'string' }
      }
    };
  }
  if (name === 'ai_challenge') {
    return {
      ...common,
      required: ['unsupportedClaims', 'missingCaveats', 'weakEvidence', 'overconfidentWording', 'improvedAnswer', 'verificationSteps'],
      properties: {
        unsupportedClaims: { type: 'array', items: { type: 'string' } },
        missingCaveats: { type: 'array', items: { type: 'string' } },
        weakEvidence: { type: 'array', items: { type: 'string' } },
        overconfidentWording: { type: 'array', items: { type: 'string' } },
        improvedAnswer: { type: 'string' },
        verificationSteps: { type: 'array', items: { type: 'string' } }
      }
    };
  }
  return {
    ...common,
    required: ['decision', 'likelyFailureModes', 'mitigations', 'missingInformation', 'nextAction', 'confidenceCalibration', 'caveat'],
    properties: {
      decision: { type: 'string' },
      likelyFailureModes: { type: 'array', items: { type: 'string' } },
      mitigations: { type: 'array', items: { type: 'string' } },
      missingInformation: { type: 'array', items: { type: 'string' } },
      nextAction: { type: 'string' },
      confidenceCalibration: { type: 'string' },
      caveat: { type: 'string' }
    }
  };
}

const thinkingPartnerSystem = 'You are a critical-thinking coach. Help users reason better. Do not act as a truth oracle. Identify assumptions, uncertainty, missing evidence, and better questions. Avoid political persuasion and ideological bias. For legal, medical, financial, safety, or career-impacting topics, include a caveat and encourage credible expert verification. Return only valid JSON matching the schema.';

export const openAIProvider: AIProvider = {
  async analyseClaim(input: string): Promise<ClaimAnalysisOutput> {
    try {
      return await callStructured('claim_analysis', thinkingPartnerSystem, input, (value) => claimAnalysisSchema.parse(value));
    } catch (error) {
      console.warn('Falling back to mock AI claim analysis', error);
      return mockAIProvider.analyseClaim(input);
    }
  },
  async generateSocraticFeedback(input): Promise<SocraticFeedbackOutput> {
    try {
      return await callStructured('socratic_feedback', thinkingPartnerSystem, JSON.stringify(input), (value) => socraticFeedbackSchema.parse(value));
    } catch (error) {
      console.warn('Falling back to mock Socratic feedback', error);
      return mockAIProvider.generateSocraticFeedback(input);
    }
  },
  async explainAIChallenge(input: string): Promise<AIChallengeExplanationOutput> {
    try {
      return await callStructured('ai_challenge', thinkingPartnerSystem, input, (value) => aiChallengeExplanationSchema.parse(value));
    } catch (error) {
      console.warn('Falling back to mock AI challenge explanation', error);
      return mockAIProvider.explainAIChallenge(input);
    }
  },
  async createDecisionPremortem(input: string): Promise<DecisionPremortemFeedbackOutput> {
    try {
      return await callStructured('decision_premortem', thinkingPartnerSystem, input, (value) => decisionPremortemFeedbackSchema.parse(value));
    } catch (error) {
      console.warn('Falling back to mock premortem', error);
      return mockAIProvider.createDecisionPremortem(input);
    }
  }
};
