import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { useAppStore, useDailyRecommendation } from '@/features/app/store';
import { skillLabels } from '@/utils/format';
import { track } from '@/lib/analytics';

export default function DailyTrainingScreen() {
  const recommendation = useDailyRecommendation();
  const completeDailyTraining = useAppStore((state) => state.completeDailyTraining);
  const start = () => {
    track('daily_training_started', { mode: recommendation.mode, skill: recommendation.skillFocus });
    if (recommendation.mode === 'lesson' && recommendation.lessonId) router.push(`/lesson/${recommendation.lessonId}`);
    else if (recommendation.mode === 'review') router.push('/practice/review');
    else if (recommendation.mode === 'challenge_ai') router.push('/ai/challenge-ai');
    else if (recommendation.mode === 'bias') router.push('/practice/bias');
    else router.push('/practice/fallacy');
  };
  return (
    <Screen>
      <AppText variant="h2">Daily Training</AppText>
      <Card>
        <AppText variant="h3">{recommendation.title}</AppText>
        <AppText variant="muted">{recommendation.reason}</AppText>
        <AppText>Focus: {skillLabels[recommendation.skillFocus]}</AppText>
      </Card>
      <Button onPress={start}>Begin focused rep</Button>
      <Button variant="secondary" onPress={() => { completeDailyTraining(80, recommendation.skillFocus); router.replace('/(tabs)'); }}>Mark demo session complete</Button>
      <Card muted>
        <AppText variant="h3">Transfer prompt</AppText>
        <AppText>Where might this show up in your work or life today?</AppText>
      </Card>
    </Screen>
  );
}
