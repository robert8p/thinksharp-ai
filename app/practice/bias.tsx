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

export default function BiasDetectorScreen() {
  const biasQuestions = questions.filter((question) => question.skillArea === 'bias_detection').slice(0, 3);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const completePractice = useAppStore((state) => state.completePractice);
  const submit = () => setScore(completePractice(biasQuestions.map((question) => question.id), answers));
  return (
    <Screen>
      <FunHeader emoji="🧠" title="Bias Detector" subtitle="Notice the mental shortcut, then choose a better move." />
      <CoachBubble text="Biases are normal. The skill is catching them early enough to adjust." emoji="🌱" />
      {biasQuestions.map((question) => (
        <Card key={question.id}>
          <AppText>{question.prompt}</AppText>
          {question.options.map((option) => <OptionCard key={option} label={option} selected={answers[question.id] === option} onPress={() => setAnswers({ ...answers, [question.id]: option })} />)}
        </Card>
      ))}
      {score === null ? <Button onPress={submit}>Reveal feedback</Button> : <Card playful><AppText variant="h2">{score}%</AppText><AppText>{score >= 85 ? 'Nice catch. Your bias radar is warming up.' : 'That is exactly what practice is for.'}</AppText><Button onPress={() => router.back()}>Back</Button></Card>}
    </Screen>
  );
}
