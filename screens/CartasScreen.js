import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Searchbar, Text, useTheme } from 'react-native-paper';
import { buscarCartas } from '../services/ygoApi';
import CartaCard from '../components/CartaCard';

const POR_PAGINA = 20;

export default function CartasScreen({ navigation }) {
  const { colors } = useTheme();
  const [cartas, setCartas] = useState([]);
  const [texto, setTexto] = useState('');
  const [termo, setTermo] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [fim, setFim] = useState(false);
  const [erro, setErro] = useState(null);

  const offsetRef = useRef(0);
  const pedidoRef = useRef(0);

  const carregarPagina = useCallback(async (nome, reiniciar) => {
    const pedido = ++pedidoRef.current;

    if (reiniciar) {
      setCarregando(true);
      setFim(false);
      offsetRef.current = 0;
    } else {
      setCarregandoMais(true);
    }
    setErro(null);

    try {
      const dados = await buscarCartas(POR_PAGINA, offsetRef.current, nome);

      // Ignora respostas de pedidos antigos (ex.: o usuário buscou outra coisa)
      if (pedido !== pedidoRef.current) return;

      const validas = dados.filter((c) => c.name !== '???');
      offsetRef.current += dados.length;
      setCartas((atual) => (reiniciar ? validas : [...atual, ...validas]));
      if (dados.length < POR_PAGINA) setFim(true);
    } catch (e) {
      if (pedido === pedidoRef.current) setErro(e.message);
    } finally {
      if (pedido === pedidoRef.current) {
        setCarregando(false);
        setCarregandoMais(false);
      }
    }
  }, []);

  useEffect(() => {
    carregarPagina('', true);
  }, [carregarPagina]);

  function buscar() {
    setTermo(texto);
    carregarPagina(texto, true);
  }

  function limpar() {
    setTexto('');
    setTermo('');
    carregarPagina('', true);
  }

  function carregarMais() {
    if (fim || carregando || carregandoMais || erro) return;
    carregarPagina(termo, false);
  }

  function renderConteudo() {
    if (carregando) {
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" />
          <Text style={styles.espaco}>Carregando cartas...</Text>
        </View>
      );
    }

    if (erro) {
      return (
        <View style={styles.centro}>
          <Text style={{ color: colors.error }}>Algo deu errado: {erro}</Text>
          <Button
            mode="contained"
            onPress={() => carregarPagina(termo, true)}
            style={styles.espaco}
          >
            Tentar novamente
          </Button>
        </View>
      );
    }

    if (cartas.length === 0) {
      return (
        <View style={styles.centro}>
          <Text variant="titleMedium">Nenhuma carta encontrada</Text>
          <Text style={styles.vazio}>Tente buscar outro nome.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={cartas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartaCard
            carta={item}
            onPress={() => navigation.navigate('Detalhes', { carta: item })}
          />
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          carregandoMais ? <ActivityIndicator style={styles.rodape} /> : null
        }
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Searchbar
        placeholder="Buscar carta pelo nome"
        value={texto}
        onChangeText={setTexto}
        onSubmitEditing={buscar}
        onIconPress={buscar}
        onClearIconPress={limpar}
        style={styles.busca}
      />
      {renderConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12, paddingHorizontal: 16 },
  busca: { marginBottom: 12 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  espaco: { marginTop: 12 },
  vazio: { marginTop: 4, opacity: 0.7 },
  rodape: { marginVertical: 16 },
});