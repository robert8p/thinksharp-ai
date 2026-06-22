import { router } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { FunHeader } from '@/components/FunHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SkillList } from '@/components/SkillList';
import { StatPill } from '@/components/StatPill';
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
      <FunHeader eyebrow={getLevelTitle(profile.totalXp)} emoji="🌍" title="Ready for today’s quest?" subtitle="One small rep. One sharper judgment." />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        <StatPill emoji="🔥" value={profile.streakCount} label="day streak" />
        <StatPill emoji="⚡" value={profile.totalXp} label="XP" />
        <StatPill emoji="🎯" value={`${overall}%`} label="mastery" />
      </View>
      <Card playful>
        <AppText variant="small">TODAY’S BRAIN REP</AppText>
        <AppText variant="h2">{recommendation.title}</AppText>
        <AppText>{recommendation.reason}</AppText>
        <AppText variant="small">Focus: {skillLabels[recommendation.skillFocus]}</AppText>
        <Button onPress={() => router.push('/practice/daily')}>Start 5-minute quest</Button>
      </Card>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText>Overall mastery</AppText>
          <AppText>{overall}%</AppText>
        </View>
        <ProgressBar value={overall} />
        <AppText variant="small">Keep it playful: practise, get feedback, repeat.</AppText>
      </Card>
      <CoachBubble text="A good thinker is not someone who never misses. A good thinker notices the miss and updates." emoji="🧠" />
      <SkillList scores={scores} />
      <Card>
        <AppText variant="h3">Next lesson</AppText>
        <AppText>{nextLesson.title}</AppText>
        <AppText variant="muted">{nextLesson.summary}</AppText>
        <Button variant="sky" onPress={() => router.push(`/lesson/${nextLesson.id}`)}>Open lesson</Button>
      </Card>
      <View style={{ gap: 10 }}>
        <Button variant="secondary" onPress={() => router.push('/practice/review')}>🧩 {reviews.length} review items</Button>
        <Button variant="secondary" onPress={() => router.push(claimAllowed ? '/ai/claim-analyser' : '/paywall')}>🔎 Analyse a claim</Button>
        <Button variant="secondary" onPress={() => router.push('/ai/challenge-ai')}>🤖 Challenge AI</Button>
        <Button variant="secondary" onPress={() => router.push('/ai/decision-premortem')}>🛡️ Decision premortem</Button>
      </View>
      <Card muted>
        <AppText variant="h3">Humanity Plus</AppText>
        <AppText variant="muted">More quests, full modules, unlimited claim analysis, and deeper coaching.</AppText>
        <Button variant="premium" onPress={() => router.push('/paywall')}>See Plus</Button>
      </Card>
    </Screen>
  );
}
