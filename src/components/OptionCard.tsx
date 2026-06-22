import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { colors, radii, spacing } from '@/theme/theme';

export function OptionCard({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <View style={[styles.dot, selected && styles.dotSelected]} />
      <AppText style={selected ? styles.selectedText : undefined}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center'
  },
  selected: {
    borderColor: colors.accentStrong,
    backgroundColor: colors.accentSoft
  },
  selectedText: {
    color: colors.text
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white
  },
  dotSelected: {
    borderColor: colors.accentStrong,
    backgroundColor: colors.accent
  }
});
