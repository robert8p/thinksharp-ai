import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { colors, radii, spacing } from '@/theme/theme';

export function CoachBubble({ text, name = 'Humanity Coach', emoji = '🌱' }: { text: string; name?: string; emoji?: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.face}><AppText style={styles.emoji}>{emoji}</AppText></View>
      <View style={styles.bubble}>
        <AppText variant="small" style={styles.name}>{name}</AppText>
        <AppText>{text}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  face: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.skySoft,
    borderColor: colors.sky,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: { fontSize: 22 },
  bubble: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs
  },
  name: { color: colors.sky }
});
