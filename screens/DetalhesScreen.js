import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Divider, Text, useTheme } from 'react-native-paper';
import { useFavoritos } from '../context/FavoritosContext';

export default function DetalhesScreen({ route }) {
  const { carta } = route.params;
  const { colors } = useTheme();
  const { ehFavorito, alternarFavorito } = useFavoritos();

  const imagem = carta.card_images?.[0]?.image_url;
  const ehMonstro = carta.atk !== undefined;
  const favorito = ehFavorito(carta.id);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.conteudo}
    >
      <Image source={{ uri: imagem }} style={styles.imagem} resizeMode="contain" />

      <Text variant="headlineSmall" style={styles.centralizado}>
        {carta.name}
      </Text>

      <Button
        mode={favorito ? 'outlined' : 'contained'}
        icon={favorito ? 'heart-off' : 'heart'}
        onPress={() => alternarFavorito(carta)}
      >
        {favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      </Button>

      <View style={styles.chips}>
        <Chip icon="tag">{carta.type}</Chip>
        {!!carta.race && <Chip icon="shape">{carta.race}</Chip>}
        {!!carta.attribute && <Chip icon="flash">{carta.attribute}</Chip>}
        {carta.level !== undefined && <Chip icon="star">Nível {carta.level}</Chip>}
        {!!carta.archetype && <Chip icon="cards">{carta.archetype}</Chip>}
      </View>

      {ehMonstro && (
        <View style={styles.chips}>
          <Chip icon="sword" mode="outlined">ATK {carta.atk}</Chip>
          <Chip icon="shield" mode="outlined">DEF {carta.def ?? '-'}</Chip>
        </View>
      )}

      <Divider />

      <Text variant="titleMedium">Descrição</Text>
      <Text variant="bodyMedium">{carta.desc}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 16, gap: 12 },
  imagem: {
    width: '70%',
    aspectRatio: 421 / 614,
    alignSelf: 'center',
    borderRadius: 8,
  },
  centralizado: { textAlign: 'center' },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
});