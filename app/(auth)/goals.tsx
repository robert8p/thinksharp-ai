import { useState } from 'react';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { OptionCard } from '@/components/OptionCard';
import { Screen } from '@/components/Screen';
import { useAppStore } from '@/features/app/store';
import { UserGoal } from '@/types';

const goals: Array<{ id: UserGoal; label: string }> = [
  { id: 'work_decisions', label: 'Make better decisions at work' },
  { id: 'misinformation', label: 'Avoid misinformation' },
  { id: 'challenge_ai', label: 'Challenge AI outputs' },
  { id: 'debate_reasoning', label: 'Improve debate and reasoning' },
  { id: 'pressure_clarity', label: 'Think more clearly under pressure' }
];

export default function GoalsScreen() {
  const [selected, setSelected] = useState<UserGoal>('work_decisions');
  const setGoal = useAppStore((state) => state.setGoal);
  return (
    <Screen>
      <AppText variant="h2">What should ThinkSharp AI optimise for?</AppText>
      {goals.map((goal) => <OptionCard key={goal.id} label={goal.label} selected={selected === goal.id} onPress={() => setSelected(goal.id)} />)}
      <Button onPress={() => { setGoal(selected); router.push('/(auth)/diagnostic-intro'); }}>Continue</Button>
    </Screen>
  );
}
