# YGO Cards

App mobile feito com **React Native + Expo** que consome a API pública
[YGOPRODeck](https://ygoprodeck.com/api-guide/) e exibe cartas de Yu-Gi-Oh!.

## Funcionalidades

- Lista de cartas consumida da API, com imagem, nome, tipo e ATK/DEF
- Rolagem infinita: carrega mais cartas ao chegar no fim da lista
- Busca de cartas pelo nome
- Tela de detalhes com imagem grande, atributos e descrição da carta
- Favoritos salvos localmente no celular (continuam após fechar o app)
- Tratamento de carregamento, erro (com botão "Tentar novamente") e busca vazia

## Requisitos da atividade

| Requisito | Como foi atendido |
|---|---|
| Consumir API e exibir em tela | YGOPRODeck API (`services/ygoApi.js`) |
| Navegação entre telas | React Navigation: abas (Cartas e Favoritos) + stack para a tela de Detalhes |
| React Native Paper | Tema roxo personalizado, `Card`, `Chip`, `Searchbar`, `Button`, `IconButton` |
| AsyncStorage | Lista de favoritos salva no celular (`context/FavoritosContext.js`) |

## Tecnologias

- React Native
- Expo
- React Navigation (native-stack e bottom-tabs)
- React Native Paper
- AsyncStorage
- API: https://db.ygoprodeck.com/api/v7

## Estrutura do projeto
├── components/ # CartaCard
├── context/ # FavoritosContext (AsyncStorage)
├── screens/ # CartasScreen, FavoritosScreen, DetalhesScreen
├── services/ # ygoApi (chamadas à API)
├── theme.js # tema roxo do Paper
└── App.js # Providers e navegação


## Como rodar

1. Instale as dependências: `npm install`
2. Inicie o projeto: `npx expo start --go`
3. Escaneie o QR code com o app Expo Go

## Prints
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/81054dce-fdde-4d83-91f3-07f8d6c6dde6" />

<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/adc9f876-7db0-40ae-a5cc-9de4b620e383" />

<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/cc91c484-4708-4d5c-8787-639104d67ed5" />

