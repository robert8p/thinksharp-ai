import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { SkillScores } from '@/types';
import { skillLabels } from '@/utils/format';

export function SkillList({ scores }: { scores: SkillScores }) {
  return (
    <View style={{ gap: 10 }}>
      {(Object.keys(scores) as Array<keyof SkillScores>).map((skill) => (
        <Card key={skill} muted>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AppText>{skillLabels[skill]}</AppText>
            <AppText variant="small">{scores[skill]}%</AppText>
          </View>
          <ProgressBar value={scores[skill]} />
        </Card>
      ))}
    </View>
  );
}
