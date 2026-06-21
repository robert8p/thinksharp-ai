import { useState } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { OptionCard } from '@/components/OptionCard';
import { Screen } from '@/components/Screen';
import { biasDrills } from '@/data/seedContent';
import { useAppStore } from '@/features/app/store';
import { isAnswerCorrect } from '@/features/progress/mastery';
import { colors } from '@/theme/theme';

export default function BiasDetectorScreen() {
  const question = biasDrills[0];
  const [answer, setAnswer] = useState<string>();
  const [score, setScore] = useState<number | null>(null);
  const completePractice = useAppStore((state) => state.completePractice);
  return (
    <Screen>
      <AppText variant="h2">Bias Detector</AppText>
      <Card><AppText>{question.prompt}</AppText></Card>
      {question.options.map((option) => <OptionCard key={option} label={option} selected={answer === option} onPress={() => setAnswer(option)} />)}
      {score === null ? <Button disabled={!answer} onPress={() => setScore(completePractice([question.id], { [question.id]: answer ?? '' }))}>Submit</Button> : (
        <Card>
          <AppText variant="h2">{score}%</AppText>
          <AppText style={{ color: isAnswerCorrect(answer, question.correctAnswer) ? colors.success : colors.warning }}>{question.explanation}</AppText>
          <AppText variant="muted">Corrective strategy: ask what evidence would change your mind.</AppText>
          <Button onPress={() => router.back()}>Done</Button>
        </Card>
      )}
    </Screen>
  );
}
