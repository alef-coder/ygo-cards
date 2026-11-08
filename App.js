import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { buscarCartas } from './services/ygoApi';
import CartaCard from './components/CartaCard';
import { tema } from './theme';

function Cartas() {
  const [cartas, setCartas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarCartas(20, 0);
        setCartas(dados.filter((c) => c.name !== '???'));
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.textoClaro}>Carregando cartas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>Algo deu errado: {erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CartaCard carta={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#2d1b4e',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d1b4e',
  },
  textoClaro: { color: '#fff', marginTop: 12 },
  erro: { color: '#ff8a8a', fontSize: 16, padding: 16 },
});

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <Cartas />
    </PaperProvider>
  );
}