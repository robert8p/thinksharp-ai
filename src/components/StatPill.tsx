import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { colors, radii, spacing } from '@/theme/theme';

export function StatPill({ label, value, emoji }: { label: string; value: string | number; emoji: string }) {
  return (
    <View style={styles.pill}>
      <AppText style={styles.emoji}>{emoji}</AppText>
      <View>
        <AppText variant="h3">{value}</AppText>
        <AppText variant="small">{label}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minWidth: 96,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderRadius: radii.lg,
    padding: spacing.sm,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center'
  },
  emoji: { fontSize: 22 }
});
