import { Lesson, LessonAttempt, ProfileLevel, Question, SkillArea, SkillScores } from '@/types';

export const defaultSkillScores: SkillScores = {
  logic: 35,
  bias_detection: 35,
  evidence_evaluation: 35,
  ai_literacy: 35,
  decision_quality: 35,
  argumentation: 35
};

export function normaliseAnswer(answer: string | string[]): string[] {
  return Array.isArray(answer) ? [...answer].sort() : [answer];
}

export function isAnswerCorrect(answer: string | string[] | undefined, correctAnswer: string | string[]): boolean {
  if (answer === undefined) return false;
  const a = normaliseAnswer(answer);
  const c = normaliseAnswer(correctAnswer);
  return a.length === c.length && a.every((value, index) => value === c[index]);
}

export function calculateQuestionScore(questions: Question[], answers: Record<string, string | string[]>): number {
  if (questions.length === 0) return 0;
  const correct = questions.filter((question) => isAnswerCorrect(answers[question.id], question.correctAnswer)).length;
  return Math.round((correct / questions.length) * 100);
}

export function isLessonMastered(lesson: Lesson, attempt?: LessonAttempt): boolean {
  return Boolean(attempt && attempt.score >= lesson.masteryThreshold);
}

export function isModuleMastered(requiredLessons: Lesson[], attempts: LessonAttempt[], assessmentScore: number, threshold = 85): boolean {
  if (requiredLessons.length === 0) return false;
  const masteredLessons = requiredLessons.every((lesson) => {
    const bestAttempt = attempts
      .filter((attempt) => attempt.lessonId === lesson.id)
      .sort((a, b) => b.score - a.score)[0];
    return isLessonMastered(lesson, bestAttempt);
  });
  return masteredLessons && assessmentScore >= threshold;
}

export function updateSkillScore(current: number, resultScore: number, difficulty: number): number {
  const weight = Math.min(0.34, 0.14 + difficulty * 0.04);
  const next = current * (1 - weight) + resultScore * weight;
  return Math.max(0, Math.min(100, Math.round(next)));
}

export function updateSkillScoresFromQuestions(
  current: SkillScores,
  questions: Question[],
  answers: Record<string, string | string[]>
): SkillScores {
  const next = { ...current };
  const grouped = questions.reduce<Record<SkillArea, Question[]>>((acc, question) => {
    acc[question.skillArea] = [...(acc[question.skillArea] ?? []), question];
    return acc;
  }, {} as Record<SkillArea, Question[]>);

  (Object.keys(grouped) as SkillArea[]).forEach((skill) => {
    const skillQuestions = grouped[skill];
    const result = calculateQuestionScore(skillQuestions, answers);
    const avgDifficulty = skillQuestions.reduce((sum, question) => sum + question.difficulty, 0) / skillQuestions.length;
    next[skill] = updateSkillScore(next[skill], result, avgDifficulty);
  });

  return next;
}

export function getOverallMastery(scores: SkillScores): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
}

export function getProfileLevel(totalScore: number): ProfileLevel {
  if (totalScore >= 85) return 'Advanced';
  if (totalScore >= 70) return 'Sharp';
  if (totalScore >= 50) return 'Developing';
  return 'Novice';
}

export function getLevelTitle(totalXp: number): string {
  if (totalXp >= 6500) return 'Master Reasoner';
  if (totalXp >= 4200) return 'Clear Thinker';
  if (totalXp >= 2600) return 'AI Skeptic';
  if (totalXp >= 1500) return 'Logic Operator';
  if (totalXp >= 800) return 'Bias Breaker';
  if (totalXp >= 250) return 'Signal Seeker';
  return 'Untrained Thinker';
}
