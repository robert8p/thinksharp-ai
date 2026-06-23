import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { FunHeader } from '@/components/FunHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { lessons, modules, questions, useAppStore } from '@/features/app/store';
import { getLessonStepCountLabel } from '@/features/curriculum/lessonSteps';
import { canAccessModule } from '@/features/subscriptions/gating';

export default function LearnScreen() {
  const tier = useAppStore((state) => state.profile.subscriptionTier);
  const attempts = useAppStore((state) => state.lessonAttempts);
  return (
    <Screen>
      <FunHeader emoji="🗺️" title="Your learning map" subtitle="Follow tiny quests: one idea, one check, instant feedback, then mastery." />
      {modules.map((module) => {
        const moduleLessons = lessons.filter((lesson) => lesson.moduleId === module.id);
        const completed = moduleLessons.filter((lesson) => attempts.some((attempt) => attempt.lessonId === lesson.id && attempt.score >= lesson.masteryThreshold)).length;
        const access = canAccessModule(module, tier);
        const moduleProgress = moduleLessons.length ? (completed / moduleLessons.length) * 100 : 0;
        return (
          <Card key={module.id} muted={!access} playful={access && module.orderIndex === 1}>
            <AppText variant="small">WORLD {module.orderIndex}</AppText>
            <AppText variant="h3">{access ? '🌱 ' : '🔒 '}{module.title}</AppText>
            <AppText variant="muted">{module.description}</AppText>
            <ProgressBar value={moduleProgress} />
            <AppText variant="small">{module.status === 'premium_preview' ? 'Plus preview / coming soon' : `${completed}/${moduleLessons.length} mastered`}</AppText>
            {moduleLessons.map((lesson, index) => {
              const lessonQuestions = questions.filter((question) => question.lessonId === lesson.id);
              const mastered = attempts.some((attempt) => attempt.lessonId === lesson.id && attempt.score >= lesson.masteryThreshold);
              return (
                <Button key={lesson.id} variant={mastered ? 'sky' : index === 0 && access ? 'primary' : 'secondary'} onPress={() => router.push(access ? `/lesson/${lesson.id}` : '/paywall')}>
                  {access ? `${mastered ? '✅' : '⭐'} Quest ${index + 1}: ${lesson.title} · ${getLessonStepCountLabel(lesson, lessonQuestions)}` : `🔒 ${lesson.title}`}
                </Button>
              );
            })}
          </Card>
        );
      })}
    </Screen>
  );
}
