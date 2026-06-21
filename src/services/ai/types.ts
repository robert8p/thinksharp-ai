import { z } from 'zod';

export const claimAnalysisSchema = z.object({
  claim: z.string(),
  assumptions: z.array(z.string()),
  evidenceNeeded: z.array(z.string()),
  possibleWeaknesses: z.array(z.string()),
  betterQuestions: z.array(z.string()),
  confidenceLevel: z.enum(['low', 'medium', 'high']),
  caveat: z.string()
});

export const socraticFeedbackSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  questions: z.array(z.string()),
  nextPractice: z.string()
});

export const aiChallengeExplanationSchema = z.object({
  unsupportedClaims: z.array(z.string()),
  missingCaveats: z.array(z.string()),
  weakEvidence: z.array(z.string()),
  overconfidentWording: z.array(z.string()),
  improvedAnswer: z.string(),
  verificationSteps: z.array(z.string())
});

export const decisionPremortemFeedbackSchema = z.object({
  decision: z.string(),
  likelyFailureModes: z.array(z.string()),
  mitigations: z.array(z.string()),
  missingInformation: z.array(z.string()),
  nextAction: z.string(),
  confidenceCalibration: z.string(),
  caveat: z.string()
});

export type ClaimAnalysisOutput = z.infer<typeof claimAnalysisSchema>;
export type SocraticFeedbackOutput = z.infer<typeof socraticFeedbackSchema>;
export type AIChallengeExplanationOutput = z.infer<typeof aiChallengeExplanationSchema>;
export type DecisionPremortemFeedbackOutput = z.infer<typeof decisionPremortemFeedbackSchema>;

export interface AIProvider {
  analyseClaim(input: string): Promise<ClaimAnalysisOutput>;
  generateSocraticFeedback(input: { userAnswer: string; idealAnswer: string; context: string }): Promise<SocraticFeedbackOutput>;
  explainAIChallenge(input: string): Promise<AIChallengeExplanationOutput>;
  createDecisionPremortem(input: string): Promise<DecisionPremortemFeedbackOutput>;
}
