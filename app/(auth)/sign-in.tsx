import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { z } from 'zod';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { colors, radii, spacing } from '@/theme/theme';
import { useAppStore } from '@/features/app/store';
import { signUpWithEmail } from '@/features/auth/authService';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormValues = z.infer<typeof schema>;

export default function SignInScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });
  const submit = async (values: FormValues) => {
    const result = await signUpWithEmail(values.email, values.password);
    if (!result.ok) {
      console.warn(result.error);
      return;
    }
    completeOnboarding();
    router.replace('/(tabs)');
  };
  return (
    <Screen>
      <AppText variant="h2">Create your account</AppText>
      <AppText variant="muted">Supabase auth is wired for production. Demo mode works without keys.</AppText>
      <Card>
        <Controller control={control} name="email" render={({ field }) => <TextInput placeholder="Email" placeholderTextColor={colors.textMuted} autoCapitalize="none" value={field.value} onChangeText={field.onChange} style={styles.input} />} />
        {errors.email && <AppText variant="small">Enter a valid email.</AppText>}
        <Controller control={control} name="password" render={({ field }) => <TextInput placeholder="Password" placeholderTextColor={colors.textMuted} secureTextEntry value={field.value} onChangeText={field.onChange} style={styles.input} />} />
        {errors.password && <AppText variant="small">Password must be at least 8 characters.</AppText>}
      </Card>
      <Button onPress={handleSubmit(submit)}>Create demo account</Button>
      <Button variant="ghost" onPress={() => { completeOnboarding(); router.replace('/(tabs)'); }}>Skip for demo</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm }
});
