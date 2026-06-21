import {
  AIChallengeExplanationOutput,
  AIProvider,
  ClaimAnalysisOutput,
  DecisionPremortemFeedbackOutput,
  SocraticFeedbackOutput
} from '@/services/ai/types';

function extractClaim(input: string): string {
  return input.trim().replace(/\s+/g, ' ').slice(0, 240) || 'No claim provided';
}

export const mockAIProvider: AIProvider = {
  async analyseClaim(input: string): Promise<ClaimAnalysisOutput> {
    const claim = extractClaim(input);
    return {
      claim,
      assumptions: [
        'The wording of the claim matches the underlying evidence.',
        'The source has enough context and incentives are not distorting the conclusion.',
        'The evidence, if any, transfers to the situation where the claim will be used.'
      ],
      evidenceNeeded: [
        'Primary source or original data behind the claim.',
        'Methodology, sample size, timeframe, and comparison group.',
        'Credible counter-evidence or alternative explanations.'
      ],
      possibleWeaknesses: [
        'The claim may overstate certainty.',
        'Important caveats may be missing.',
        'Correlation may be presented as causation.'
      ],
      betterQuestions: [
        'What would change my mind about this?',
        'Who benefits if I believe or share this claim?',
        'What is the strongest opposing explanation?'
      ],
      confidenceLevel: 'medium',
      caveat: 'This is a thinking aid, not a truth oracle. Verify important claims with credible primary sources.'
    };
  },

  async generateSocraticFeedback(input): Promise<SocraticFeedbackOutput> {
    return {
      summary: 'Your answer shows a starting judgment. The next step is to make the evidence standard explicit.',
      strengths: ['You engaged with the claim rather than accepting it passively.'],
      gaps: ['You could separate assumption, evidence, and conclusion more clearly.'],
      questions: [
        'What evidence would make your answer stronger?',
        'Which assumption is doing the most work?',
        'How might a reasonable critic respond?'
      ],
      nextPractice: `Compare your answer against this target: ${input.idealAnswer}`
    };
  },

  async explainAIChallenge(input: string): Promise<AIChallengeExplanationOutput> {
    return {
      unsupportedClaims: ['The answer makes at least one claim without a traceable source or evidence standard.'],
      missingCaveats: ['It does not state uncertainty, context limits, or conditions where the conclusion may not hold.'],
      weakEvidence: ['The answer relies on plausible language more than verifiable support.'],
      overconfidentWording: ['Words such as “definitely”, “proves”, or exact statistics without source should trigger caution.'],
      improvedAnswer: `A more careful version would say: “Based on the information provided, ${extractClaim(input)} may be plausible, but I would verify sources, assumptions, and alternative explanations before relying on it.”`,
      verificationSteps: ['Find the primary source.', 'Check whether evidence supports the exact claim.', 'Look for credible contrary evidence.']
    };
  },

  async createDecisionPremortem(input: string): Promise<DecisionPremortemFeedbackOutput> {
    return {
      decision: extractClaim(input),
      likelyFailureModes: [
        'The decision is based on incomplete information.',
        'Key stakeholders do not adopt the change.',
        'Costs, risks, or second-order effects are underestimated.'
      ],
      mitigations: [
        'Run a small reversible test before full commitment.',
        'Define kill criteria and success metrics upfront.',
        'Ask a critical reviewer to challenge the assumptions.'
      ],
      missingInformation: ['Decision deadline', 'Reversibility', 'Opportunity cost', 'Downside risk tolerance'],
      nextAction: 'Write a one-page decision note with assumptions, risks, options, and what evidence would change the choice.',
      confidenceCalibration: 'Use a confidence range, not a single feeling. High confidence requires strong evidence and tested assumptions.',
      caveat: 'This is decision-support, not professional legal, financial, medical, or employment advice.'
    };
  }
};
