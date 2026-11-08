import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@ygo-cards:favoritos';
const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Ao abrir o app: lê os favoritos salvos no celular
  useEffect(() => {
    async function carregar() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE);
        if (salvo) setFavoritos(JSON.parse(salvo));
      } catch (e) {
        console.warn('Erro ao ler favoritos:', e);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  // Sempre que a lista muda: grava no celular
  useEffect(() => {
    if (!carregado) return;
    AsyncStorage.setItem(CHAVE, JSON.stringify(favoritos)).catch((e) =>
      console.warn('Erro ao salvar favoritos:', e)
    );
  }, [favoritos, carregado]);

  function ehFavorito(id) {
    return favoritos.some((c) => c.id === id);
  }

  function alternarFavorito(carta) {
    setFavoritos((atual) =>
      atual.some((c) => c.id === carta.id)
        ? atual.filter((c) => c.id !== carta.id)
        : [...atual, carta]
    );
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, ehFavorito, alternarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}