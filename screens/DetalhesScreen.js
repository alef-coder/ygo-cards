import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function DetalhesScreen({ route }) {
  const { carta } = route.params;
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineSmall">{carta.name}</Text>
      <Text variant="bodyMedium">{carta.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
});