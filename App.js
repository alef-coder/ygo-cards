import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { buscarCartas } from './services/ygoApi';

export default function App() {
  const [cartas, setCartas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarCartas(20, 0);
        setCartas(dados);
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
        <ActivityIndicator size="large" />
        <Text>Carregando cartas...</Text>
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
        renderItem={({ item }) => <Text style={styles.nome}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  nome: { fontSize: 16, paddingVertical: 8 },
  erro: { color: 'red', fontSize: 16, padding: 16 },
});