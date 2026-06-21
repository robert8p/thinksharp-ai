import { PropsWithChildren } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors, typography } from '@/theme/theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'muted';

interface Props extends PropsWithChildren {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
}

export function AppText({ children, variant = 'body', style }: Props) {
  const base = variant === 'muted' ? typography.body : typography[variant];
  const color = variant === 'muted' || variant === 'small' ? colors.textMuted : colors.text;
  return <Text style={[base, { color }, style]}>{children}</Text>;
}
