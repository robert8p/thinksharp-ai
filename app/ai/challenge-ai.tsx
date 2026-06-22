import { useState } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { OptionCard } from '@/components/OptionCard';
import { Screen } from '@/components/Screen';
import { aiChallengeQuestions, useAppStore } from '@/features/app/store';
import { aiProvider, AIChallengeExplanationOutput } from '@/services/ai';

export default function ChallengeAiScreen() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<AIChallengeExplanationOutput>();
  const completePractice = useAppStore((state) => state.completePractice);
  const questions = aiChallengeQuestions.slice(0, 3);
  const submit = async () => {
    const nextScore = completePractice(questions.map((question) => question.id), answers);
    setScore(nextScore);
    setExplanation(await aiProvider.explainAIChallenge(Object.values(answers).join(', ')));
  };
  return (
    <Screen>
      <FunHeader emoji="🤖" title="Challenge the chatbot" subtitle="Spot the flaw in a polished AI-style answer." />
      <CoachBubble text="Fluent is not the same as true. Look for unsupported claims, missing caveats, weak evidence, and overconfidence." emoji="🛡️" />
      {questions.map((question) => <Card key={question.id}><AppText>{question.prompt}</AppText>{question.options.map((option) => <OptionCard key={option} label={option} selected={answers[question.id] === option} onPress={() => setAnswers({ ...answers, [question.id]: option })} />)}</Card>)}
      {score === null ? <Button onPress={submit}>Check my challenge</Button> : <Card playful><AppText variant="h2">{score}%</AppText><AppText>{explanation ? `Better version: ${explanation.improvedAnswer}` : 'Good practice. Keep asking what is supported, missing, or too certain.'}</AppText><Button onPress={() => router.back()}>Back</Button></Card>}
    </Screen>
  );
}
