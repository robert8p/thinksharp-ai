import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { FunHeader } from '@/components/FunHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SkillList } from '@/components/SkillList';
import { StatPill } from '@/components/StatPill';
import { achievements } from '@/data/seedContent';
import { useAppStore } from '@/features/app/store';
import { getOverallMastery, getLevelTitle } from '@/features/progress/mastery';

export default function ProgressScreen() {
  const profile = useAppStore((state) => state.profile);
  const scores = useAppStore((state) => state.skillScores);
  const attempts = useAppStore((state) => state.lessonAttempts);
  const earned = useAppStore((state) => state.earnedAchievementCodes);
  const overall = getOverallMastery(scores);
  return (
    <Screen>
      <FunHeader emoji="📈" title="Growth garden" subtitle="Your progress is measured by practice, not passive reading." />
      <Card playful>
        <AppText variant="h1">{overall}%</AppText>
        <AppText>{getLevelTitle(profile.totalXp)}</AppText>
        <ProgressBar value={overall} />
      </Card>
      <StatPill emoji="🧩" value={attempts.length} label="lesson attempts" />
      <SkillList scores={scores} />
      <AppText variant="h3">Badges</AppText>
      {achievements.map((achievement) => (
        <Card key={achievement.code} muted={!earned.includes(achievement.code)}>
          <AppText>{earned.includes(achievement.code) ? '🏅 ' : '○ '}{achievement.title}</AppText>
          <AppText variant="muted">{achievement.description}</AppText>
        </Card>
      ))}
    </Screen>
  );
}
