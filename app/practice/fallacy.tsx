import { useState } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { OptionCard } from '@/components/OptionCard';
import { Screen } from '@/components/Screen';
import { questions, useAppStore } from '@/features/app/store';

export default function FallacySpotterScreen() {
  const fallacyQuestions = questions.filter((question) => question.skillArea === 'logic').slice(0, 3);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const completePractice = useAppStore((state) => state.completePractice);
  const submit = () => setScore(completePractice(fallacyQuestions.map((question) => question.id), answers));
  return (
    <Screen>
      <FunHeader emoji="🕵️" title="Fallacy Spotter" subtitle="Find the argument trap before it finds you." />
      <CoachBubble text="You are not trying to win an argument. You are trying to see the structure clearly." />
      {fallacyQuestions.map((question) => (
        <Card key={question.id}>
          <AppText>{question.prompt}</AppText>
          {question.options.map((option) => <OptionCard key={option} label={option} selected={answers[question.id] === option} onPress={() => setAnswers({ ...answers, [question.id]: option })} />)}
        </Card>
      ))}
      {score === null ? <Button onPress={submit}>Check my answers</Button> : <Card playful><AppText variant="h2">{score}%</AppText><AppText>{score >= 85 ? 'Badge energy. You spotted the trap.' : 'Useful miss. These items are now review fuel.'}</AppText><Button onPress={() => router.back()}>Back</Button></Card>}
    </Screen>
  );
}
