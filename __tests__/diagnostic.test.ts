import { diagnosticQuestions } from '@/data/seedContent';
import { scoreDiagnostic } from '@/features/diagnostic/scoring';

describe('diagnostic scoring', () => {
  test('perfect diagnostic scores advanced', () => {
    const answers = Object.fromEntries(diagnosticQuestions.map((question) => [question.id, question.correctAnswer]));
    const result = scoreDiagnostic(diagnosticQuestions, answers);
    expect(result.totalScore).toBe(100);
    expect(result.profileLevel).toBe('Advanced');
    expect(result.recommendedPath.length).toBeGreaterThan(0);
  });
});
