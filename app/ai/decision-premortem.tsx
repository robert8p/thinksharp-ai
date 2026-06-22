import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { z } from 'zod';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { Screen } from '@/components/Screen';
import { useAppStore } from '@/features/app/store';
import { isPremiumTier } from '@/features/subscriptions/gating';
import { track } from '@/lib/analytics';
import { aiProvider, DecisionPremortemFeedbackOutput } from '@/services/ai';
import { colors, radii, spacing } from '@/theme/theme';

const schema = z.object({ decision: z.string().min(12) });
type FormValues = z.infer<typeof schema>;

export default function DecisionPremortemScreen() {
  const [result, setResult] = useState<DecisionPremortemFeedbackOutput>();
  const [loading, setLoading] = useState(false);
  const tier = useAppStore((state) => state.profile.subscriptionTier);
  const completeDaily = useAppStore((state) => state.completeDailyTraining);
  const { control, handleSubmit } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { decision: '' } });
  const submit = async ({ decision }: FormValues) => {
    if (!isPremiumTier(tier)) { router.push('/paywall'); return; }
    setLoading(true);
    try {
      const premortem = await aiProvider.createDecisionPremortem(decision);
      setResult(premortem);
      completeDaily(85, 'decision_quality');
      track('decision_premortem_completed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Screen>
      <FunHeader emoji="🛡️" title="Decision premortem" subtitle="Imagine the decision failed, then make it stronger before you act." />
      <CoachBubble text="This is for clearer thinking, not professional advice. Keep high-stakes decisions with the right experts." />
      <Card muted><AppText variant="small">Decision-support only. Do not paste confidential or high-risk personal data.</AppText></Card>
      <Controller control={control} name="decision" render={({ field }) => <TextInput multiline placeholder="Describe the decision, desired outcome, and constraints..." placeholderTextColor={colors.textMuted} value={field.value} onChangeText={field.onChange} style={styles.input} />} />
      <Button loading={loading} onPress={handleSubmit(submit)}>Run premortem</Button>
      {result && <Card playful>
        <AppText variant="h3">Likely failure causes</AppText>
        {result.likelyFailureModes.map((item) => <AppText key={item}>• {item}</AppText>)}
        <AppText variant="h3">Mitigations</AppText>
        {result.mitigations.map((item) => <AppText key={item}>• {item}</AppText>)}
        <AppText variant="h3">Next action</AppText>
        <AppText>{result.nextAction}</AppText>
        <AppText variant="small">{result.caveat}</AppText>
      </Card>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 170, color: colors.text, borderColor: colors.border, borderWidth: 2, borderBottomWidth: 5, borderRadius: radii.lg, padding: spacing.md, textAlignVertical: 'top', backgroundColor: colors.white }
});
