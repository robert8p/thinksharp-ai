import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/AppText';
import { colors, radii, spacing } from '@/theme/theme';

export function OptionCard({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <AppText>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSoft,
    borderRadius: radii.md,
    padding: spacing.md
  },
  selected: {
    borderColor: colors.accent,
    backgroundColor: '#113554'
  }
});
