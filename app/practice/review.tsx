import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { questions, useAppStore } from '@/features/app/store';

export default function ReviewQueueScreen() {
  const reviews = useAppStore((state) => state.reviewItems);
  const completeDailyTraining = useAppStore((state) => state.completeDailyTraining);
  return (
    <Screen>
      <AppText variant="h2">Review Queue</AppText>
      {reviews.length === 0 ? (
        <Card><AppText>No review items yet. Missed concepts will appear here for spaced sharpening.</AppText></Card>
      ) : reviews.map((review) => {
        const question = questions.find((item) => item.id === review.questionId);
        return (
          <Card key={review.id}>
            <AppText>{question?.concept ?? review.questionId}</AppText>
            <AppText variant="muted">Due: {new Date(review.dueAt).toLocaleDateString()} · Last result: {review.lastResult}</AppText>
          </Card>
        );
      })}
      <Button onPress={() => { completeDailyTraining(85); router.replace('/(tabs)'); }}>Complete review demo</Button>
    </Screen>
  );
}
