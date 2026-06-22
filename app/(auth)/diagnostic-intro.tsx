import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';
import { track } from '@/lib/analytics';

export default function DiagnosticIntroScreen() {
  return (
    <Screen>
      <FunHeader emoji="🗺️" title="First, let’s map your thinking muscles." subtitle="Ten quick questions. No shame. No grades. Just a useful starting point." />
      <Card playful>
        <AppText variant="h3">You’ll practise</AppText>
        <AppText>Logic, bias detection, evidence quality, AI hallucination spotting, causality, assumptions, statistics, and decision framing.</AppText>
      </Card>
      <CoachBubble text="Misses are useful. They tell us exactly what to train next." />
      <Button onPress={() => { track('diagnostic_started'); router.push('/(auth)/diagnostic'); }}>Start 5-minute map</Button>
    </Screen>
  );
}
