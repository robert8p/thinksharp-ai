import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';
import { questions, useAppStore } from '@/features/app/store';

export default function ReviewQueueScreen() {
  const reviewItems = useAppStore((state) => state.reviewItems);
  const sample = reviewItems.slice(0, 5);
  return (
    <Screen>
      <FunHeader emoji="🔁" title="Review garden" subtitle="Missed concepts come back at the right time so they can stick." />
      <CoachBubble text="Reviews are not punishment. They are how knowledge turns into reflex." emoji="🌿" />
      {sample.length === 0 && <Card playful><AppText>No review items yet. Missed concepts will appear here for spaced practice.</AppText></Card>}
      {sample.map((item) => {
        const question = questions.find((candidate) => candidate.id === item.questionId);
        return <Card key={item.id}><AppText>{question?.prompt ?? 'Review item'}</AppText><AppText variant="small">Due: {new Date(item.dueAt).toLocaleDateString()} · interval {item.intervalDays} day(s)</AppText></Card>;
      })}
      <Button variant="secondary" onPress={() => undefined}>Review completion placeholder</Button>
    </Screen>
  );
}
