import { create } from 'zustand';
import { aiChallengeQuestions, diagnosticQuestions, lessons, modules, questions } from '@/data/seedContent';
import { scoreDiagnostic } from '@/features/diagnostic/scoring';
import { defaultSkillScores, getOverallMastery, getProfileLevel, isAnswerCorrect, updateSkillScoresFromQuestions, updateSkillScore } from '@/features/progress/mastery';
import { scheduleReview } from '@/features/progress/spacedRepetition';
import { recommendDailyTraining } from '@/features/dailyTraining/recommendation';
import { DiagnosticResult, LessonAttempt, ReviewItem, SkillScores, UserGoal, UserProfile } from '@/types';
import { todayKey } from '@/utils/format';
import { track } from '@/lib/analytics';

interface AppState {
  profile: UserProfile;
  skillScores: SkillScores;
  diagnostic?: DiagnosticResult;
  lessonAttempts: LessonAttempt[];
  reviewItems: ReviewItem[];
  completedDailyKeys: string[];
  analysesToday: number;
  earnedAchievementCodes: string[];
  setGoal: (goal: UserGoal) => void;
  completeOnboarding: () => void;
  completeDiagnostic: (answers: Record<string, string | string[]>) => void;
  completeLesson: (lessonId: string, answers: Record<string, string | string[]>) => number;
  completePractice: (questionIds: string[], answers: Record<string, string | string[]>) => number;
  completeDailyTraining: (score: number, skillFocus?: keyof SkillScores) => void;
  incrementClaimAnalysis: () => void;
  setSubscriptionTier: (tier: UserProfile['subscriptionTier']) => void;
  resetDemo: () => void;
}

const initialProfile: UserProfile = {
  id: 'demo-user',
  email: 'demo@thinksharp.ai',
  displayName: 'Demo Thinker',
  onboardingCompleted: false,
  subscriptionTier: 'free',
  currentLevel: 'Novice',
  totalXp: 0,
  streakCount: 0
};

const initialState = {
  profile: initialProfile,
  skillScores: defaultSkillScores,
  lessonAttempts: [] as LessonAttempt[],
  reviewItems: [] as ReviewItem[],
  completedDailyKeys: [] as string[],
  analysesToday: 0,
  earnedAchievementCodes: [] as string[]
};

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  setGoal: (goal) => set((state) => ({ profile: { ...state.profile, goal } })),

  completeOnboarding: () => {
    track('onboarding_completed');
    set((state) => ({ profile: { ...state.profile, onboardingCompleted: true } }));
  },

  completeDiagnostic: (answers) => {
    const result = scoreDiagnostic(diagnosticQuestions, answers);
    track('diagnostic_completed', { score: result.totalScore, level: result.profileLevel });
    set((state) => ({
      diagnostic: { ...result, createdAt: new Date().toISOString() },
      skillScores: result.skillBreakdown,
      profile: {
        ...state.profile,
        currentLevel: result.profileLevel,
        totalXp: state.profile.totalXp + 100,
        onboardingCompleted: true
      },
      earnedAchievementCodes: Array.from(new Set([...state.earnedAchievementCodes, 'first_diagnostic']))
    }));
  },

  completeLesson: (lessonId, answers) => {
    const lessonQuestions = questions.filter((question) => question.lessonId === lessonId);
    const score = lessonQuestions.length
      ? Math.round((lessonQuestions.filter((question) => isAnswerCorrect(answers[question.id], question.correctAnswer)).length / lessonQuestions.length) * 100)
      : 100;

    const missed = lessonQuestions.filter((question) => !isAnswerCorrect(answers[question.id], question.correctAnswer));
    const now = new Date();
    const newReviews: ReviewItem[] = missed.map((question) => ({
      id: `review-${question.id}-${Date.now()}`,
      questionId: question.id,
      ...scheduleReview(undefined, false, now)
    }));

    track('lesson_completed', { lessonId, score });
    if (score >= (lessons.find((lesson) => lesson.id === lessonId)?.masteryThreshold ?? 85)) {
      track('mastery_achieved', { lessonId, score });
    }

    set((state) => {
      const nextScores = updateSkillScoresFromQuestions(state.skillScores, lessonQuestions, answers);
      const overall = getOverallMastery(nextScores);
      return {
        skillScores: nextScores,
        lessonAttempts: [...state.lessonAttempts, { lessonId, score, answers, completedAt: now.toISOString() }],
        reviewItems: [...state.reviewItems, ...newReviews],
        profile: {
          ...state.profile,
          totalXp: state.profile.totalXp + Math.max(20, Math.round(score / 2)),
          currentLevel: getProfileLevel(overall)
        }
      };
    });

    return score;
  },

  completePractice: (questionIds, answers) => {
    const selectedQuestions = [...questions, ...aiChallengeQuestions, ...diagnosticQuestions].filter((question) => questionIds.includes(question.id));
    const score = selectedQuestions.length
      ? Math.round((selectedQuestions.filter((question) => isAnswerCorrect(answers[question.id], question.correctAnswer)).length / selectedQuestions.length) * 100)
      : 0;
    const now = new Date();
    const missed = selectedQuestions.filter((question) => !isAnswerCorrect(answers[question.id], question.correctAnswer));
    const newReviews: ReviewItem[] = missed.map((question) => ({ id: `review-${question.id}-${Date.now()}`, questionId: question.id, ...scheduleReview(undefined, false, now) }));

    track('practice_completed', { score, questionIds });
    set((state) => ({
      skillScores: updateSkillScoresFromQuestions(state.skillScores, selectedQuestions, answers),
      reviewItems: [...state.reviewItems, ...newReviews],
      profile: { ...state.profile, totalXp: state.profile.totalXp + Math.max(15, Math.round(score / 3)) }
    }));
    return score;
  },

  completeDailyTraining: (score, skillFocus) => {
    const key = todayKey();
    track('daily_training_completed', { score, skillFocus });
    set((state) => {
      const completedToday = state.completedDailyKeys.includes(key);
      const nextScores = skillFocus
        ? { ...state.skillScores, [skillFocus]: updateSkillScore(state.skillScores[skillFocus], score, 2) }
        : state.skillScores;
      return {
        completedDailyKeys: completedToday ? state.completedDailyKeys : [...state.completedDailyKeys, key],
        skillScores: nextScores,
        profile: {
          ...state.profile,
          streakCount: completedToday ? state.profile.streakCount : state.profile.streakCount + 1,
          totalXp: state.profile.totalXp + (completedToday ? 10 : 50),
          lastActiveAt: new Date().toISOString(),
          currentLevel: getProfileLevel(getOverallMastery(nextScores))
        }
      };
    });
  },

  incrementClaimAnalysis: () => set((state) => ({ analysesToday: state.analysesToday + 1 })),
  setSubscriptionTier: (tier) => set((state) => ({ profile: { ...state.profile, subscriptionTier: tier } })),
  resetDemo: () => set({ ...initialState })
}));

export function useDailyRecommendation() {
  const state = useAppStore();
  return recommendDailyTraining({
    scores: state.skillScores,
    reviewItems: state.reviewItems,
    questions,
    lessons,
    completedLessonIds: state.lessonAttempts.map((attempt) => attempt.lessonId),
    goal: state.profile.goal
  });
}

export { modules, lessons, questions, diagnosticQuestions, aiChallengeQuestions };
