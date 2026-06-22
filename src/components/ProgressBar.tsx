import { StyleSheet, View } from 'react-native';
import { colors, radii } from '@/theme/theme';

export function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 14, borderRadius: radii.pill, backgroundColor: '#DCECD5', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.accent }
});
