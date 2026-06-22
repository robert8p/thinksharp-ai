import { Lesson, Question, ReviewItem, SkillArea, SkillScores, UserGoal } from '@/types';
import { isReviewDue } from '@/features/progress/spacedRepetition';

const goalSkillMap: Record<UserGoal, SkillArea> = {
  work_decisions: 'decision_quality',
  misinformation: 'evidence_evaluation',
  challenge_ai: 'ai_literacy',
  debate_reasoning: 'argumentation',
  pressure_clarity: 'bias_detection'
};

export function weakestSkill(scores: SkillScores, goal?: UserGoal): SkillArea {
  const sorted = (Object.entries(scores) as [SkillArea, number][]).sort((a, b) => a[1] - b[1]);
  if (goal) {
    const goalSkill = goalSkillMap[goal];
    const score = scores[goalSkill];
    if (score <= sorted[0][1] + 8) return goalSkill;
  }
  return sorted[0][0];
}

export function recommendDailyTraining(args: {
  scores: SkillScores;
  reviewItems: ReviewItem[];
  questions: Question[];
  lessons: Lesson[];
  completedLessonIds: string[];
  goal?: UserGoal;
  now?: Date;
}) {
  const now = args.now ?? new Date();
  const due = args.reviewItems.find((item) => isReviewDue(item, now));
  if (due) {
    const question = args.questions.find((candidate) => candidate.id === due.questionId);
    return {
      id: `review-${due.id}`,
      title: 'Review a missed concept',
      reason: 'A previous miss is due for spaced review.',
      skillFocus: question?.skillArea ?? weakestSkill(args.scores, args.goal),
      mode: 'review' as const,
      questionId: due.questionId
    };
  }

  const skill = weakestSkill(args.scores, args.goal);
  const lesson = args.lessons.find((candidate) => !args.completedLessonIds.includes(candidate.id) && !candidate.isPremium)
    ?? args.lessons.find((candidate) => !args.completedLessonIds.includes(candidate.id));

  if (skill === 'ai_literacy') {
    return {
      id: 'daily-ai-challenge',
      title: 'Challenge an overconfident AI answer',
      reason: 'AI literacy is your best next training area.',
      skillFocus: skill,
      mode: 'challenge_ai' as const
    };
  }

  return {
    id: lesson ? `lesson-${lesson.id}` : `skill-${skill}`,
    title: lesson ? lesson.title : 'Daily judgment drill',
    reason: lesson ? 'This is the next lesson in your mastery path.' : 'This targets your weakest skill score.',
    skillFocus: skill,
    mode: lesson ? 'lesson' as const : skill === 'bias_detection' ? 'bias' as const : 'fallacy' as const,
    lessonId: lesson?.id
  };
}
