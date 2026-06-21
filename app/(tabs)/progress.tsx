import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { SkillList } from '@/components/SkillList';
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
      <AppText variant="h2">Progress</AppText>
      <Card>
        <AppText variant="h1">{overall}%</AppText>
        <AppText>{getLevelTitle(profile.totalXp)}</AppText>
        <ProgressBar value={overall} />
        <AppText variant="small">{attempts.length} lesson attempts · {profile.totalXp} XP · {profile.streakCount} day streak</AppText>
      </Card>
      <SkillList scores={scores} />
      <AppText variant="h3">Achievements</AppText>
      {achievements.map((achievement) => (
        <Card key={achievement.code} muted={!earned.includes(achievement.code)}>
          <AppText>{earned.includes(achievement.code) ? '✓ ' : '○ '}{achievement.title}</AppText>
          <AppText variant="muted">{achievement.description}</AppText>
        </Card>
      ))}
    </Screen>
  );
}
