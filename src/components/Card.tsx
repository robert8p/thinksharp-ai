import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/theme/theme';

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  muted?: boolean;
}

export function Card({ children, style, muted }: Props) {
  return <View style={[styles.card, muted && styles.muted, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm
  },
  muted: {
    backgroundColor: colors.cardMuted
  }
});
