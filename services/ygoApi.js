const BASE_URL = 'https://db.ygoprodeck.com/api/v7';

export async function buscarCartas(num = 20, offset = 0) {
  const resposta = await fetch(
    `${BASE_URL}/cardinfo.php?num=${num}&offset=${offset}`
  );

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar cartas`);
  }

  const json = await resposta.json();
  return json.data;
}