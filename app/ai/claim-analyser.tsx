import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { z } from 'zod';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { useAppStore } from '@/features/app/store';
import { canUseClaimAnalysis } from '@/features/subscriptions/gating';
import { track } from '@/lib/analytics';
import { aiProvider, ClaimAnalysisOutput } from '@/services/ai';
import { colors, radii, spacing } from '@/theme/theme';

const schema = z.object({ claim: z.string().min(8, 'Enter a claim with enough detail to analyse.') });
type FormValues = z.infer<typeof schema>;

export default function ClaimAnalyserScreen() {
  const [result, setResult] = useState<ClaimAnalysisOutput>();
  const [loading, setLoading] = useState(false);
  const profile = useAppStore((state) => state.profile);
  const analysesToday = useAppStore((state) => state.analysesToday);
  const increment = useAppStore((state) => state.incrementClaimAnalysis);
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { claim: '' } });
  const allowed = canUseClaimAnalysis({ tier: profile.subscriptionTier, analysesToday });

  const submit = async ({ claim }: FormValues) => {
    if (!allowed) { router.push('/paywall'); return; }
    setLoading(true);
    try {
      const analysis = await aiProvider.analyseClaim(claim);
      setResult(analysis);
      increment();
      track('ai_claim_analysed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <AppText variant="h2">Claim Analyser</AppText>
      <Card muted><AppText variant="small">This is a thinking aid, not a truth oracle. Do not paste confidential company, legal, medical, financial, or personal data.</AppText></Card>
      <Controller control={control} name="claim" render={({ field }) => <TextInput multiline placeholder="Paste a claim or argument..." placeholderTextColor={colors.textMuted} value={field.value} onChangeText={field.onChange} style={styles.input} />} />
      {errors.claim && <AppText variant="small">{errors.claim.message}</AppText>}
      <Button loading={loading} onPress={handleSubmit(submit)}>Analyse claim</Button>
      {result && <Card>
        <AppText variant="h3">Structured analysis</AppText>
        <AppText>Claim: {result.claim}</AppText>
        <AppText variant="h3">Assumptions</AppText>
        {result.assumptions.map((item) => <AppText key={item}>• {item}</AppText>)}
        <AppText variant="h3">Evidence needed</AppText>
        {result.evidenceNeeded.map((item) => <AppText key={item}>• {item}</AppText>)}
        <AppText variant="h3">Better questions</AppText>
        {result.betterQuestions.map((item) => <AppText key={item}>• {item}</AppText>)}
        <AppText variant="small">Confidence: {result.confidenceLevel}. {result.caveat}</AppText>
      </Card>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { minHeight: 150, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.md, textAlignVertical: 'top', backgroundColor: colors.bgSoft }
});
