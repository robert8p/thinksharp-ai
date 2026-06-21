import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';

const problems = [
  'AI can sound right while being wrong.',
  'Social feeds reward speed, outrage, and certainty.',
  'Better thinking is now a career and life advantage.'
];

export default function ProblemScreen() {
  return (
    <Screen>
      <AppText variant="h2">The world got noisier. Your judgment needs reps.</AppText>
      {problems.map((problem) => <Card key={problem}><AppText>{problem}</AppText></Card>)}
      <Button onPress={() => router.push('/(auth)/goals')}>Choose my goal</Button>
    </Screen>
  );
}
