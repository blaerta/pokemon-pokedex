# Projeto Pokedex Pokémon

Bem-vindo ao Projeto Pokedex Pokémon! Esta é uma aplicação web que busca e exibe informações detalhadas sobre os primeiros 151 Pokémon usando a PokeAPI. O projeto inclui recursos como estatísticas de Pokémon, cadeias de evolução, movimentos e mais, com um design responsivo.

## Índice
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Problemas Conhecidos](#problemas-conhecidos)
- [Resolução e Soluções Alternativas](#resolução-e-soluções-alternativas)
- [Plano-Futuro](#plano-futuro)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Agradecimentos](#agradecimentos)

## Funcionalidades
- Exibição de detalhes de Pokémon, incluindo nome, número, tipos, altura, peso, habilidades, estatísticas, movimentos e cadeias de evolução.
- Layout de grade responsivo para a lista de Pokémon, ajustável conforme o tamanho da tela.
- Abas interativas para as seções "Sobre", "Estatísticas Base", "Evolução" e "Movimentos".
- Busca dinâmica de dados da PokeAPI com tratamento de erros.
- Indicação visual de possíveis imprecisões nos dados (ex.: proporções de gênero).

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/pokemon-pokedex.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd pokemon-pokedex
   ```
3. Certifique-se de ter um servidor web ou extensão de servidor ao vivo (ex.: Live Server no VS Code) para servir os arquivos localmente, pois esta é uma aplicação do lado do cliente.
4. Abra `index.html` em um navegador web via o servidor.

## Uso
- Navegue pela lista de Pokémon rolando a página ou clicando em "Carregar Mais" para buscar mais Pokémon (10 por vez).
- Clique em um Pokémon para visualizar seu cartão detalhado, que inclui abas para diferentes categorias de informações.
- Use o botão "Voltar" para retornar à visão da lista.
- Observe o rótulo de aviso ao lado das informações de gênero, caso os dados possam estar imprecisos devido a problemas na API.

## Processo de Desenvolvimento
Este projeto foi desenvolvido com as seguintes etapas:
- **Configuração Inicial**: Criada uma estrutura HTML básica com CSS para uma lista de Pokémon em grade e uma visão detalhada.
- **Integração com API**: Implementado o `poke-api.js` para buscar dados de Pokémon em `https://pokeapi.co/api/v2/` usando a API `fetch` do JavaScript, convertendo respostas JSON em objetos `Pokemon`.
- **Renderização Dinâmica**: Adicionados `main.js` e `pokemon-details.js` para gerenciar o carregamento da lista e a renderização da visão detalhada, com listeners de eventos para interações do usuário.
- **Estilização**: Aplicado o `pokedex.css` para um design responsivo e coloração específica por tipo, usando media queries e flexbox CSS.
- **Depuração**: Resolvidos problemas iterativamente com a busca de dados, cadeias de evolução e informações de gênero usando logs de console e inspeção de rede.

## Problemas Conhecidos
- **Inacurácia nos Dados de Gênero**: A partir de 19 de outubro de 2025, a PokeAPI está retornando valores incorretos para `gender_rate` (ex.: `1` para Bulbasaur em vez de `4`), resultando em proporções de gênero imprecisas (ex.: 87,5% ♂, 12,5% ♀ em vez de 50% ♂, 50% ♀). Um aviso foi adicionado ao UI para alertar os usuários sobre essa questão.

## Resolução e Soluções Alternativas
- **Aviso no UI**: Implementado um rótulo de aviso `[Aviso: Os dados de gênero podem estar imprecisos devido a um problema na API]` exibido ao lado das informações de gênero quando detectada uma possível imprecisão nos dados da PokeAPI.
- **Depuração**: O problema foi identificado como um erro na API, com logs de console e ajustes no código para exibir o aviso em vez de corrigir manualmente os 151 Pokémon, o que seria inviável.
- **Relato à PokeAPI**: Recomenda-se reportar o problema à PokeAPI (https://github.com/PokeAPI/pokeapi) com os detalhes do erro (ex.: URL `https://pokeapi.co/api/v2/pokemon-species/1/`, valor `gender_rate: 1` em vez de `4`, data: 19 de outubro de 2025, 21:08 PM -03).

## Plano-Futuro
- Pretendo fazer esse aplicativo ser o meu principal meio de interação com o universo Pokémon, então, talvez tenhamos mais atualizações no futuro.

## Contribuições
Contribuições são bem-vindas! Por favor, abra uma issue para discutir mudanças ou envie um pull request. Siga estas etapas:
1. Faça fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`.
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie para o repositório: `git push origin feature/nova-funcionalidade`.
5. Abra um pull request.

## Licença
Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos
- Agradecimentos à equipe da PokeAPI por fornecer os dados dos Pokémon.
- Suporte técnico e orientação fornecidos pela IA Grok 3, desenvolvida pela xAI, durante a depuração e resolução de problemas.
- Ao orientador Renan Johannsen da DIO.me, pela orientação no processo de criação desse projeto.
---

### Notas
- Substitua `seu-usuario` no comando `git clone` pelo seu nome de usuário do GitHub.
- :)
