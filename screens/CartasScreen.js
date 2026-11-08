import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { buscarCartas } from '../services/ygoApi';
import CartaCard from '../components/CartaCard';

export default function CartasScreen({ navigation }) {
  const { colors } = useTheme();
  const [cartas, setCartas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await buscarCartas(20, 0);
      setCartas(dados.filter((c) => c.name !== '???'));
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  if (carregando) {
    return (
      <View style={[styles.centro, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
        <Text style={styles.textoCarregando}>Carregando cartas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centro, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>Algo deu errado: {erro}</Text>
        <Button mode="contained" onPress={carregar} style={styles.botaoErro}>
          Tentar novamente
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartas}
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
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  textoCarregando: { marginTop: 12 },
  botaoErro: { marginTop: 16 },
});