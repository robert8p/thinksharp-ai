import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme/theme';

interface Props extends PropsWithChildren {
  scroll?: boolean;
}

export function Screen({ children, scroll = true }: Props) {
  if (!scroll) {
    return <SafeAreaView style={styles.safe}><View style={styles.body}>{children}</View></SafeAreaView>;
  }
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: spacing.md, gap: spacing.md },
  scroll: { padding: spacing.md, gap: spacing.md, paddingBottom: 120 }
});
