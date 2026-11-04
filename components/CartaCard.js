import { Image, StyleSheet, Text, View } from 'react-native';

export default function CartaCard({ carta }) {
  const imagem = carta.card_images?.[0]?.image_url_small;
  const ehMonstro = carta.atk !== undefined;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{carta.name}</Text>
        <Text style={styles.tipo}>{carta.type}</Text>
        {ehMonstro && (
          <Text style={styles.stats}>
            ATK {carta.atk} / DEF {carta.def ?? '-'}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  imagem: { width: 60, height: 88, borderRadius: 4 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  nome: { fontSize: 16, fontWeight: 'bold' },
  tipo: { fontSize: 13, color: '#666', marginTop: 4 },
  stats: { fontSize: 13, marginTop: 4 },
});