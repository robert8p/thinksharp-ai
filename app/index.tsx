import { Redirect } from 'expo-router';
import { useAppStore } from '@/features/app/store';

export default function Index() {
  const onboardingCompleted = useAppStore((state) => state.profile.onboardingCompleted);
  return <Redirect href={onboardingCompleted ? '/(tabs)' : '/(auth)/welcome'} />;
}
