export type SkillArea =
  | 'logic'
  | 'bias_detection'
  | 'evidence_evaluation'
  | 'ai_literacy'
  | 'decision_quality'
  | 'argumentation';

export type SkillScores = Record<SkillArea, number>;

export type UserGoal =
  | 'work_decisions'
  | 'misinformation'
  | 'challenge_ai'
  | 'debate_reasoning'
  | 'pressure_clarity';

export type ProfileLevel = 'Novice' | 'Developing' | 'Sharp' | 'Advanced';

export type ModuleStatus = 'active' | 'locked' | 'coming_soon' | 'premium_preview';

export type QuestionType =
  | 'multiple_choice'
  | 'multi_select'
  | 'free_text'
  | 'ordering';

export interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  isPremium: boolean;
  status: ModuleStatus;
}

export interface LessonContentBlock {
  heading: string;
  body: string;
  example?: string;
  aiAgeWhy?: string;
  reflectionPrompt?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  content: LessonContentBlock[];
  orderIndex: number;
  masteryThreshold: number;
  estimatedMinutes: number;
  isPremium: boolean;
  required: boolean;
}

export interface Question {
  id: string;
  lessonId?: string;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
  skillArea: SkillArea;
  difficulty: 1 | 2 | 3 | 4 | 5;
  concept: string;
}

export interface LessonAttempt {
  lessonId: string;
  score: number;
  completedAt: string;
  answers: Record<string, string | string[]>;
}

export interface ReviewItem {
  id: string;
  questionId: string;
  dueAt: string;
  intervalDays: number;
  lastResult: 'correct' | 'incorrect';
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
}

export interface DiagnosticResult {
  totalScore: number;
  profileLevel: ProfileLevel;
  skillBreakdown: SkillScores;
  recommendedPath: string[];
  createdAt: string;
}

export interface DailyTrainingRecommendation {
  id: string;
  title: string;
  reason: string;
  skillFocus: SkillArea;
  mode: 'review' | 'lesson' | 'fallacy' | 'bias' | 'challenge_ai' | 'premortem';
  lessonId?: string;
  questionId?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  onboardingCompleted: boolean;
  subscriptionTier: 'free' | 'premium' | 'lifetime';
  currentLevel: ProfileLevel;
  totalXp: number;
  streakCount: number;
  lastActiveAt?: string;
  goal?: UserGoal;
}
