import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { useFavoritos } from '../context/FavoritosContext';
import CartaCard from '../components/CartaCard';

export default function FavoritosScreen({ navigation }) {
  const { colors } = useTheme();
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <View style={[styles.centro, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={64}
          color={colors.onSurfaceVariant}
        />
        <Text variant="titleMedium" style={styles.texto}>
          Nenhum favorito ainda
        </Text>
        <Text variant="bodyMedium" style={styles.subtexto}>
          Toque no coração de uma carta para salvá-la aqui.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartaCard
            carta={item}
            onPress={() => navigation.navigate('Detalhes', { carta: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12, paddingHorizontal: 16 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  texto: { marginTop: 12 },
  subtexto: { marginTop: 4, opacity: 0.7, textAlign: 'center' },
});