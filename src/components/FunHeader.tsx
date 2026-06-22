import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { colors, radii, spacing } from '@/theme/theme';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  emoji?: string;
}

export function FunHeader({ eyebrow, title, subtitle, emoji = '🧠' }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.mascot}><AppText style={styles.emoji}>{emoji}</AppText></View>
      {eyebrow && <AppText variant="small" style={styles.eyebrow}>{eyebrow}</AppText>}
      <AppText variant="h1" style={styles.title}>{title}</AppText>
      {subtitle && <AppText variant="muted" style={styles.subtitle}>{subtitle}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  mascot: {
    width: 68,
    height: 68,
    borderRadius: radii.xl,
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
    borderWidth: 2,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: { fontSize: 34 },
  eyebrow: { color: colors.accentStrong, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { color: colors.text },
  subtitle: { color: colors.textMuted }
});
