import { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { AppText } from '@/components/AppText';

interface Props extends PropsWithChildren {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'premium';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({ children, onPress, variant = 'primary', disabled, loading, style }: Props) {
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [styles.base, styles[variant], (pressed || disabled) && styles.pressed, style]}
      accessibilityRole="button"
    >
      {loading ? <ActivityIndicator /> : <AppText style={styles.text}>{children}</AppText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 52
  },
  primary: { backgroundColor: colors.accentStrong, borderColor: colors.accentStrong },
  secondary: { backgroundColor: colors.cardMuted, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent', borderColor: colors.border },
  premium: { backgroundColor: colors.premium, borderColor: colors.premium },
  pressed: { opacity: 0.68 },
  text: { ...typography.body, fontWeight: '800', color: colors.white }
});
