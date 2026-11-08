import { Image, StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { useFavoritos } from '../context/FavoritosContext';

export default function CartaCard({ carta, onPress }) {
  const { colors } = useTheme();
  const { ehFavorito, alternarFavorito } = useFavoritos();

  const imagem = carta.card_images?.[0]?.image_url_small;
  const ehMonstro = carta.atk !== undefined;
  const favorito = ehFavorito(carta.id);

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.linha}>
        <Image source={{ uri: imagem }} style={styles.imagem} />
        <View style={styles.info}>
          <Text variant="titleMedium">{carta.name}</Text>
          <Text variant="bodySmall" style={styles.tipo}>
            {carta.type}
          </Text>
          {ehMonstro && (
            <View style={styles.chips}>
              <Chip compact icon="sword">
                ATK {carta.atk}
              </Chip>
              <Chip compact icon="shield">
                DEF {carta.def ?? '-'}
              </Chip>
            </View>
          )}
        </View>
        <IconButton
          icon={favorito ? 'heart' : 'heart-outline'}
          iconColor={favorito ? '#ff6b9d' : colors.onSurfaceVariant}
          onPress={() => alternarFavorito(carta)}
          style={styles.coracao}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  linha: { flexDirection: 'row', padding: 12 },
  imagem: { width: 60, height: 88, borderRadius: 4 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center', gap: 4 },
  tipo: { opacity: 0.7 },
  chips: { flexDirection: 'row', gap: 8, marginTop: 4 },
  coracao: { margin: 0, alignSelf: 'flex-start' },
});