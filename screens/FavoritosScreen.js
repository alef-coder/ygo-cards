import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function FavoritosScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.centro, { backgroundColor: colors.background }]}>
      <Text variant="titleMedium">Favoritos (em breve)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});