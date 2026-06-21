import { router } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SkillList } from '@/components/SkillList';
import { lessons, useAppStore, useDailyRecommendation } from '@/features/app/store';
import { getOverallMastery, getLevelTitle } from '@/features/progress/mastery';
import { canUseClaimAnalysis } from '@/features/subscriptions/gating';
import { skillLabels } from '@/utils/format';

export default function HomeScreen() {
  const profile = useAppStore((state) => state.profile);
  const scores = useAppStore((state) => state.skillScores);
  const reviews = useAppStore((state) => state.reviewItems);
  const analysesToday = useAppStore((state) => state.analysesToday);
  const recommendation = useDailyRecommendation();
  const overall = getOverallMastery(scores);
  const nextLesson = lessons.find((lesson) => lesson.id === recommendation.lessonId) ?? lessons[0];
  const claimAllowed = canUseClaimAnalysis({ tier: profile.subscriptionTier, analysesToday });

  return (
    <Screen>
      <View>
        <AppText variant="small">{getLevelTitle(profile.totalXp)}</AppText>
        <AppText variant="h2">Today’s sharpest next move</AppText>
      </View>
      <Card>
        <AppText variant="h3">{recommendation.title}</AppText>
        <AppText variant="muted">{recommendation.reason}</AppText>
        <AppText variant="small">Focus: {skillLabels[recommendation.skillFocus]}</AppText>
        <Button onPress={() => router.push('/practice/daily')}>Start daily training</Button>
      </Card>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText>Overall mastery</AppText>
          <AppText>{overall}%</AppText>
        </View>
        <ProgressBar value={overall} />
        <AppText variant="small">🔥 {profile.streakCount} day streak · {profile.totalXp} XP</AppText>
      </Card>
      <SkillList scores={scores} />
      <Card>
        <AppText variant="h3">Next lesson</AppText>
        <AppText>{nextLesson.title}</AppText>
        <AppText variant="muted">{nextLesson.summary}</AppText>
        <Button variant="secondary" onPress={() => router.push(`/lesson/${nextLesson.id}`)}>Open lesson</Button>
      </Card>
      <View style={{ gap: 10 }}>
        <Button variant="secondary" onPress={() => router.push('/practice/review')}>{reviews.length} due/queued review items</Button>
        <Button variant="secondary" onPress={() => router.push(claimAllowed ? '/ai/claim-analyser' : '/paywall')}>Analyse a claim</Button>
        <Button variant="secondary" onPress={() => router.push('/ai/challenge-ai')}>Challenge AI</Button>
        <Button variant="secondary" onPress={() => router.push('/ai/decision-premortem')}>Decision premortem</Button>
      </View>
      <Card muted>
        <AppText variant="h3">Premium path</AppText>
        <AppText variant="muted">Unlock all modules, unlimited claim analysis, advanced AI challenge mode, and decision coaching.</AppText>
        <Button variant="premium" onPress={() => router.push('/paywall')}>View Premium</Button>
      </Card>
    </Screen>
  );
}
