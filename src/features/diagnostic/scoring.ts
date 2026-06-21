import { Question, SkillArea, SkillScores } from '@/types';
import { calculateQuestionScore, defaultSkillScores, getProfileLevel, updateSkillScoresFromQuestions } from '@/features/progress/mastery';

export function scoreDiagnostic(questions: Question[], answers: Record<string, string | string[]>): {
  totalScore: number;
  skillBreakdown: SkillScores;
  profileLevel: ReturnType<typeof getProfileLevel>;
  recommendedPath: string[];
} {
  const totalScore = calculateQuestionScore(questions, answers);
  const skillBreakdown = updateSkillScoresFromQuestions(defaultSkillScores, questions, answers);
  const weakest = (Object.entries(skillBreakdown) as [SkillArea, number][])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([skill]) => skill);
  const recommendedPath = weakest.includes('logic') || weakest.includes('argumentation')
    ? ['m1-foundations', 'm2-fallacies']
    : weakest.includes('bias_detection')
      ? ['m1-foundations', 'm3-biases']
      : ['m1-foundations', 'm5-ai-era'];

  return {
    totalScore,
    skillBreakdown,
    profileLevel: getProfileLevel(totalScore),
    recommendedPath
  };
}
