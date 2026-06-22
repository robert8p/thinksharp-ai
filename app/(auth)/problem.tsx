import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';

const problems = [
  { emoji: '🤖', text: 'AI can sound clever while being wrong.' },
  { emoji: '🔥', text: 'Feeds reward speed, outrage, and certainty.' },
  { emoji: '🛡️', text: 'Scams, deepfakes, and bad advice are getting more polished.' },
  { emoji: '🌱', text: 'Better thinking is trainable. You just need reps.' }
];

export default function ProblemScreen() {
  return (
    <Screen>
      <FunHeader emoji="🔎" title="The world is noisy. Your judgment can get stronger." subtitle="Humanity turns serious thinking skills into small, friendly practice rounds." />
      {problems.map((problem) => <Card key={problem.text}><AppText>{problem.emoji}  {problem.text}</AppText></Card>)}
      <CoachBubble text="You don’t need to be a philosopher. You just need to practise pausing, checking, and asking better questions." emoji="🙂" />
      <Button onPress={() => router.push('/(auth)/goals')}>Choose my training goal</Button>
    </Screen>
  );
}
