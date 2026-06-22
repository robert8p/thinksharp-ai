import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/theme/theme';

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  muted?: boolean;
  playful?: boolean;
}

export function Card({ children, style, muted, playful }: Props) {
  return <View style={[styles.card, muted && styles.muted, playful && styles.playful, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  muted: {
    backgroundColor: colors.cardMuted,
    borderColor: '#CDE5F7'
  },
  playful: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent
  }
});
