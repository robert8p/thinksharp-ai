import { useState } from 'react';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { OptionCard } from '@/components/OptionCard';
import { Screen } from '@/components/Screen';
import { aiChallengeQuestions, useAppStore } from '@/features/app/store';
import { isPremiumTier } from '@/features/subscriptions/gating';
import { aiProvider, AIChallengeExplanationOutput } from '@/services/ai';
import { router } from 'expo-router';

export default function ChallengeAIScreen() {
  const question = aiChallengeQuestions[0];
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<AIChallengeExplanationOutput>();
  const [loading, setLoading] = useState(false);
  const tier = useAppStore((state) => state.profile.subscriptionTier);
  const completePractice = useAppStore((state) => state.completePractice);
  const toggle = (option: string) => setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const submit = async () => {
    if (!isPremiumTier(tier)) { router.push('/paywall'); return; }
    setLoading(true);
    try {
      completePractice([question.id], { [question.id]: selected });
      setFeedback(await aiProvider.explainAIChallenge(question.prompt));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Screen>
      <AppText variant="h2">Challenge AI</AppText>
      <Card><AppText>{question.prompt}</AppText></Card>
      {question.options.map((option) => <OptionCard key={option} label={option} selected={selected.includes(option)} onPress={() => toggle(option)} />)}
      <Button loading={loading} onPress={submit}>Submit challenge</Button>
      {feedback && <Card>
        <AppText variant="h3">Expert feedback</AppText>
        <AppText>Unsupported: {feedback.unsupportedClaims.join(' ')}</AppText>
        <AppText>Missing caveats: {feedback.missingCaveats.join(' ')}</AppText>
        <AppText>Verification: {feedback.verificationSteps.join(' → ')}</AppText>
      </Card>}
    </Screen>
  );
}
