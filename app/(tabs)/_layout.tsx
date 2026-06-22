import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors, radii } from '@/theme/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopColor: colors.border,
        borderTopWidth: 2,
        height: 66,
        paddingBottom: 8,
        paddingTop: 8,
        borderTopLeftRadius: radii.lg,
        borderTopRightRadius: radii.lg
      },
      tabBarActiveTintColor: colors.accentStrong,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: { fontWeight: '800' }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Quest', tabBarIcon: ({ color, size }) => <Ionicons name="compass" color={color} size={size} /> }} />
      <Tabs.Screen name="learn" options={{ title: 'Map', tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} /> }} />
      <Tabs.Screen name="progress" options={{ title: 'Growth', tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Me', tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} /> }} />
    </Tabs>
  );
}
