const BASE_URL = 'https://db.ygoprodeck.com/api/v7';

export async function buscarCartas(num = 20, offset = 0, nome = '') {
  let url = `${BASE_URL}/cardinfo.php?num=${num}&offset=${offset}`;

  if (nome.trim()) {
    url += `&fname=${encodeURIComponent(nome.trim())}`;
  }

  const resposta = await fetch(url);

  // A API responde 400 quando nenhuma carta bate com a busca
  if (resposta.status === 400) {
    return [];
  }

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar cartas`);
  }

  const json = await resposta.json();
  return json.data ?? [];
}