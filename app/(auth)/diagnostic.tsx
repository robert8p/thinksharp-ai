import { useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { OptionCard } from '@/components/OptionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { diagnosticQuestions, useAppStore } from '@/features/app/store';

export default function DiagnosticScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const completeDiagnostic = useAppStore((state) => state.completeDiagnostic);
  const question = diagnosticQuestions[index];
  const selected = answers[question.id];
  const progress = ((index + 1) / diagnosticQuestions.length) * 100;

  const next = () => {
    if (index < diagnosticQuestions.length - 1) {
      setIndex(index + 1);
      return;
    }
    completeDiagnostic(answers);
    router.replace('/(auth)/diagnostic-results');
  };

  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <AppText variant="small">Question {index + 1} of {diagnosticQuestions.length}</AppText>
        <ProgressBar value={progress} />
      </View>
      <Card>
        <AppText variant="h3">{question.prompt}</AppText>
      </Card>
      {question.options.map((option) => (
        <OptionCard key={option} label={option} selected={selected === option} onPress={() => setAnswers({ ...answers, [question.id]: option })} />
      ))}
      <Button disabled={!selected} onPress={next}>{index === diagnosticQuestions.length - 1 ? 'Show my profile' : 'Next'}</Button>
    </Screen>
  );
}
