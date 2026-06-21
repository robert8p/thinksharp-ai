import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { lessons, modules, useAppStore } from '@/features/app/store';
import { canAccessModule } from '@/features/subscriptions/gating';

export default function LearnScreen() {
  const tier = useAppStore((state) => state.profile.subscriptionTier);
  const attempts = useAppStore((state) => state.lessonAttempts);
  return (
    <Screen>
      <AppText variant="h2">Curriculum</AppText>
      {modules.map((module) => {
        const moduleLessons = lessons.filter((lesson) => lesson.moduleId === module.id);
        const completed = moduleLessons.filter((lesson) => attempts.some((attempt) => attempt.lessonId === lesson.id && attempt.score >= lesson.masteryThreshold)).length;
        const access = canAccessModule(module, tier);
        return (
          <Card key={module.id} muted={!access}>
            <AppText variant="h3">{module.title}</AppText>
            <AppText variant="muted">{module.description}</AppText>
            <ProgressBar value={moduleLessons.length ? (completed / moduleLessons.length) * 100 : 0} />
            <AppText variant="small">{module.status === 'premium_preview' ? 'Premium preview / coming soon' : `${completed}/${moduleLessons.length} mastered`}</AppText>
            {moduleLessons.map((lesson) => (
              <Button key={lesson.id} variant="secondary" onPress={() => router.push(access ? `/lesson/${lesson.id}` : '/paywall')}>{access ? lesson.title : `🔒 ${lesson.title}`}</Button>
            ))}
          </Card>
        );
      })}
    </Screen>
  );
}
