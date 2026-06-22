import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { SkillList } from '@/components/SkillList';
import { useAppStore } from '@/features/app/store';

export default function DiagnosticResultsScreen() {
  const diagnostic = useAppStore((state) => state.diagnostic);
  const skillScores = useAppStore((state) => state.skillScores);
  return (
    <Screen>
      <FunHeader emoji="🏅" title="Your Thinking Profile" subtitle="This is your starting map, not a fixed identity." />
      <Card playful>
        <AppText variant="h1">{diagnostic?.profileLevel ?? 'Developing'}</AppText>
        <AppText>Diagnostic score: {diagnostic?.totalScore ?? 0}%</AppText>
        <AppText variant="muted">Humanity has built your first training path around practice, review, and visible improvement.</AppText>
      </Card>
      <SkillList scores={skillScores} />
      <CoachBubble text="Your next best move is already waiting on the home screen." emoji="🚀" />
      <Button onPress={() => router.replace('/(auth)/sign-in')}>Enter Humanity</Button>
    </Screen>
  );
}
