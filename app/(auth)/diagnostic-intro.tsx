import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { track } from '@/lib/analytics';

export default function DiagnosticIntroScreen() {
  return (
    <Screen>
      <AppText variant="h2">First, map your current thinking profile.</AppText>
      <Card>
        <AppText>The diagnostic has 10 short scenarios across logic, bias detection, evidence quality, AI hallucination spotting, argument structure, causality, statistics, source credibility, assumptions, and decision framing.</AppText>
      </Card>
      <AppText variant="muted">Your result sets a starting level and builds your first training plan. It is a baseline, not a label.</AppText>
      <Button onPress={() => { track('diagnostic_started'); router.push('/(auth)/diagnostic'); }}>Start 5-minute diagnostic</Button>
    </Screen>
  );
}
