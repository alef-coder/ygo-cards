import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { buscarCartas } from './services/ygoApi';
import CartaCard from './components/CartaCard';

export default function App() {
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
        <Text style={{ color: '#fff' }}>Carregando cartas...</Text>
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
  nome: { fontSize: 16, paddingVertical: 8 },
  erro: { color: 'red', fontSize: 16, padding: 16 },
});