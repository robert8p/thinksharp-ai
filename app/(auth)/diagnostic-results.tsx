import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { SkillList } from '@/components/SkillList';
import { useAppStore } from '@/features/app/store';

export default function DiagnosticResultsScreen() {
  const diagnostic = useAppStore((state) => state.diagnostic);
  const skillScores = useAppStore((state) => state.skillScores);
  return (
    <Screen>
      <AppText variant="h2">Your Thinking Profile</AppText>
      <Card>
        <AppText variant="h1">{diagnostic?.profileLevel ?? 'Developing'}</AppText>
        <AppText variant="muted">Diagnostic score: {diagnostic?.totalScore ?? 0}%</AppText>
        <AppText>Your first plan prioritises active practice, spaced review, and targeted mastery checks.</AppText>
      </Card>
      <SkillList scores={skillScores} />
      <Button onPress={() => router.replace('/(auth)/sign-in')}>Enter ThinkSharp AI</Button>
    </Screen>
  );
}
