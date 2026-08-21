## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Vocabulário de efeitos de rolagem

Antes de pedir uma variação de um destes efeitos para um par novo de seções,
basta nomear a técnica — as perguntas abaixo já têm resposta. A matemática de
cada `--variável` mora no arquivo citado; aqui só o necessário para não
confundir uma técnica com outra.

### Abertura — entra na lateral, presa, sai em parallax
Referência: `src/components/Abertura.astro`.

- **Pin:** sim — o quadro (`.abertura__quadro`) trava com `position: sticky`
  enquanto duas seções se revezam por cima dele.
- **Quem fica parada / quem anda:** a primeira seção (hoje o Hero) fica
  parada, coberta; a segunda (hoje o manifesto) entra deslizando da direita
  por cima dela. Depois as duas soltam juntas: a seção **seguinte na
  página** (fora do componente) sobe por cima da que entrou, que a acompanha
  devagar num parallax vertical (`--ritmo`, `Abertura.astro:74`).
- **Parâmetros a fixar antes de codar:** qual seção é "a de baixo, presa" e
  qual é "a de cima, que desliza"; `--entrada`/`--espera`/`--saida`
  (`Abertura.astro:52-64`) se uma tela cada não servir; `--ritmo`
  (`Abertura.astro:74`, hoje 0.3).
- **Contrato externo:** quem vem depois no HTML precisa da classe
  `.is-sobre-abertura` (`src/styles/global.css:168`) para pintar por cima do
  quadro na saída — hoje aplicada pelo próprio script, não é opcional.
- **Isso NÃO é** Revelação (abaixo): aqui há pino e as duas seções moram no
  MESMO componente porque uma precisa travar a rolagem; lá não há pino e as
  duas seções são independentes.
- Protótipo abandonado (CSS `animation-timeline: scroll()` nativo, sem JS):
  `src/pages/pv-px.astro` — histórico, não é a implementação atual.

### Revelação (em camadas) — sem pino, velocidades diferentes
Referência: `src/components/Revelacao.astro`. Ver também a memória
`reveal-em-camadas`.

- **Pin:** não — a ilusão de profundidade vem só da diferença de velocidade
  entre as duas camadas, nada trava a rolagem.
- **Quem fica parada / quem anda:** NENHUMA fica parada. A `tampa` (slot
  `tampa`) rola normal, 1:1. O `fundo` (slot `fundo`) rola mais devagar e é
  descoberto por baixo da borda da tampa.
- **Parâmetros a fixar antes de codar:** qual seção é `tampa` (sai de cena)
  e qual é `fundo` (aparece por baixo); `--profundidade`
  (`Revelacao.astro:61`, teto 1) se o padrão não servir — mais baixo
  aproxima as velocidades e o efeito lê como respiro, não como camada.
- **Isso NÃO é** Abertura: aqui não há `position: sticky`/pino em lugar
  nenhum, e as seções chegam como slots de fora, sem saber uma da outra.
- **Regra que já corrigiu uma entrega** (memória `reveal-em-camadas`): a
  seção nova fica parada embaixo, a anterior desliza por cima até sair — o
  contrário não é isso.

### Trilho e pino — carrossel horizontal por rolagem vertical
Referência: `src/components/Testimonials.astro` (comentário,
linhas 49-52).

- **Pin:** sim — `.depos__pino` trava enquanto a rolagem vertical dentro do
  trilho inflado vira, 1:1, `scrollLeft` de uma `<ul>` horizontal.
- **Quem fica parada / quem anda:** a seção inteira fica presa na tela; o
  que anda é o conteúdo horizontal dentro dela — sem segunda seção, sem
  parallax, eixo de saída é X, não Y.
- **Restrição:** só em `pointer: fine` e sem `prefers-reduced-motion`; em
  touch vira carrossel nativo de swipe, sem pino.
- **Parâmetros a fixar antes de codar:** quanto conteúdo horizontal existe
  (poucos itens não sobra trilho suficiente para o pino ser perceptível).
- **Isso NÃO é** Abertura: os dois usam `sticky`, mas Abertura troca de
  SEÇÃO (duas camadas empilhadas em Y); este troca de EIXO dentro da MESMA
  seção (rolagem Y vira posição X). "Seção A presa enquanto B desliza por
  cima" é Abertura; "esta lista larga anda para o lado enquanto desço a
  página" é isto.

### Encaixe — escala ao rolar
Referência: `src/components/AppleVerified.astro` (já nomeado no código:
`data-encaixe`, `.is-encaixando`).

- **Pin:** não. Sem segunda camada, sem parallax — um elemento cresce ou
  encolhe (`transform: scale()`) conforme a seção entra na tela.
- **Parâmetros a fixar antes de codar:** a escala de partida
  (`--escala-cheia`, `AppleVerified.astro:58` — hoje 1.3773, derivada de
  duas larguras do Figma, não escolhida a dedo) e o sentido (hoje: maior →
  1); o script já limita a escala à largura da tela
  (`AppleVerified.astro:172-174`) para não vazar barra horizontal.
- **Isso NÃO é** Revelação: lá são duas seções deslocando em Y por
  diferença de velocidade; aqui é um elemento só, num `scale()`, sem
  segunda camada.

### Leque de palavras — revelação palavra a palavra (consumidor, não autônomo)
Referência: `src/components/Intro.astro`. **Nome cunhado agora** — o código
não batiza o efeito inteiro, só descreve o resultado ("abre o leque",
`Intro.astro:85`). Trocar por outro termo se este não pegar.

- **Não é um mecanismo de rolagem próprio:** não mede nem publica nenhuma
  fração de percurso. Cada palavra vira `<span>` com `--inicio` fixo
  (calculado uma vez, na carga) e reage ao `--avanco` que OUTRO componente
  publica na rolagem (hoje, Abertura).
- **Pré-requisito:** só funciona dentro de um ancestral que já publica
  `--avanco`. Pedir "leque de palavras" num texto solto, sem uma Abertura
  (ou equivalente) por perto, não tem o que ler — este é o único caso da
  lista em que o nome sozinho não basta: seria preciso primeiro decidir de
  onde vem o `--avanco`.
- **Parâmetros a fixar antes de codar:** `--atraso`/`--duracao`/`--empurrao`
  (`Intro.astro:91-93`) se o padrão não servir; e, o principal, QUEM publica
  `--avanco` para este texto consumir.

## Escala fluida (clamp/max)

Título, corpo, espaçamento e largura escalam continuamente com a tela —
nunca quebram linha, nunca saltam de tamanho, e **nunca param de crescer**:
a proporção do design em 1440 (o frame do Figma) se mantém em qualquer
largura de desktop, inclusive 4K e além. Todo token fluido bate o próprio
piso aos 375px e o valor exato do Figma aos 1440px — a mesma dupla para
todos, então nada "para de escalar" numa largura diferente do resto. Fora
do desktop (abaixo de ~48rem/768px), o menu mobile usa uma âncora própria,
464px, e ali continua fazendo sentido ter um teto — ver nota no fim.

**Pedir um valor novo:** "escala isso em fluido, valor X no Figma a
1440px, piso Y" já basta.

**A fórmula**, dado piso F e valor do Figma V (rem):
```
K = (V − F) / 0.665625
B = F − 0.234375·K
max(F, K·vw + B·rem)
```
(a mesma álgebra, comentada, mora em `src/styles/global.css` acima do
bloco `--fs-*` — quem for adicionar um token novo por lá não precisa vir
até aqui.)

**Onde mora cada token:** tokens reutilizados em mais de um lugar viram
`--variável` em `global.css` (`--fs-*`, `--space-*`, `--w-*`); dimensões
decorativas de um componente só (ícone, gap, altura de avatar) ficam como
`max()` direto na propriedade, dentro do próprio `<style>` — os dois
padrões já convivem hoje, ver `Testimonials.astro` para exemplos dos dois.

**Quando NÃO usar:** colunas centradas que devem ocupar a largura toda
abaixo de um teto (`--w-proof`, `--w-locator`, `--w-insta`) ficam com
`width` fixo, não fluido. Raio de borda (`--radius`) também não escala.
Menu mobile (dentro de `@media (max-width: 47.99rem)`) e
`--fs-nav-drawer` continuam usando `clamp()` COM teto, ancorados no frame
mobile do Figma (464px) — um menu mobile nunca existe em desktop, então o
"sem teto" deste vocabulário não se aplica a eles.

## Pendências antes de produção

Placeholders que estão no ar no protótipo e não podem passar para produção.
_Atualizar aqui sempre que uma pendência for resolvida ou surgir._
**Última atualização: 2026-08-21.**

### Contato

- [ ] **WhatsApp: número e mensagem padrão** em `src/data/site.ts`. O número
  atual (`5500000000000`) é inválido de propósito, para nunca abrir conversa
  com um desconhecido se escapar para produção. Alimenta o ícone do hero e o
  menu mobile — trocar num lugar resolve os dois.
- [ ] **`WhatsappCta.astro` (faixa de CTA do rodapé) saiu da página** em
  2026-08-21, a pedido do Felipe ("não quero ela no site") — o componente
  continua no repo, com o asset `cta-whatsapp.png`, só não é mais importado
  em `index.astro`. Decidir se volta, muda de lugar, ou se componente e
  asset devem ser apagados de vez.
- [ ] **Telefone de exibição do rodapé** (`55 9 99900 0000`) ainda é o
  placeholder do Figma, em `src/data/site.ts`.

### Conteúdo

- [x] ~~**Dados das unidades fora da matriz**~~ — resolvido em 2026-08-20.
  Endereço e Instagram das quatro filiais chegaram na revisão do rodapé
  (Figma `49:510`). As cinco unidades agora vivem em `units`, em
  `src/data/site.ts`, lidas pelo acordeão e pelo rodapé; "Informações em
  breve." saiu do ar. Endereço padronizado na forma longa (`R.`/`Av.`
  abreviados, vírgula antes do número) — o rodapé do Figma escrevia curto.
  Ijuí e Santiago vieram sem o tipo do logradouro; as duas são Rua,
  conferido no cadastro do CNPJ.
- [ ] **Link do grupo de ofertas** — segue `href="#"` na matriz, e as outras
  quatro nem mostram o botão até os links existirem. Campo `groupUrl` em
  `src/data/site.ts`.
- [ ] **Handles de Instagram das filiais** — `@pedeprodindo.sr`, `.ijui` e
  `.sb` vieram do Figma e ninguém abriu os perfis; só `.stgo` e o da matriz
  estão confirmados. O acordeão já linka os cinco (`instagram.com/<handle>`,
  derivado em `site.ts`); no rodapé são texto puro, como no Figma. Conferir
  os três antes de considerar o link bom.
- [x] ~~**FAQ não tinha destino**~~ — resolvido em 2026-08-20. A seção chegou
  no Figma (`49:615`), acima do rodapé, e virou `Faq.astro`; `navLinks` aponta
  para `#faq`. As oito perguntas e respostas vêm de `faq-ppd-seminovos.md`,
  convertidas para HTML em `src/data/faq.ts`. O Figma desenhou nove linhas
  todas escritas "Perguntas" — preenchimento, não conteúdo; o documento é a
  fonte. O acordeão é `<details>`, então toda resposta fica no HTML servido,
  aberta ou fechada, e a mesma string alimenta um JSON-LD de `FAQPage`.
- [x] ~~**FAQ foi redesenhado e o código ficou na versão antiga**~~ — resolvido
  em 2026-08-20. O frame `49:615` inverteu para escuro (`--color-bg-dark`), em
  duas colunas com gap de 76px: rótulo "perguntas frequentes" numa de 309px e a
  headline **"O que você precisa saber antes de comprar"** numa de 706px — o
  código usava o texto do rótulo como título. A pergunta aberta virou pílula
  branca de 62px, e o `+`/`−` saiu: agora a pílula é o único sinal de estado,
  decisão tomada sabendo que, fechadas, as oito linhas não denunciam que abrem.
  As oito perguntas de `faq.ts` não mudaram — só a moldura. Fica um débito de
  acessibilidade: o rótulo em `#6C6C6C` sobre `#040404` dá 3,9:1, abaixo dos
  4,5:1 da WCAG AA para texto normal; o mínimo nesse fundo é `#767676`.
- [x] ~~**Seção `insta` não existe no código**~~ — resolvida em 2026-08-21.
  O frame `54:723` virou `Instagram.astro`, entre `autorizada` e `faq`, com o
  gabarito do `autorizada`: coluna centrada, 128px de respiro, fundo branco.
  O rótulo é o handle da matriz, lido de `site.ts`, e virou link para o perfil
  — a seção convida a seguir e o Figma não desenhou botão. As cinco pastilhas
  de assunto são `li` sem clique, como as de cidade em Depoimentos. Segue fora
  de `navLinks`, como no Figma.
- [ ] **Grade do Instagram é placeholder** — os seis quadrados de
  `Instagram.astro` são `div`s vazias em `--color-placeholder`, e a grade
  inteira está `aria-hidden` porque caixa vazia não diz nada a quem não vê.
  Quando as publicações chegarem, cada quadrado vira link com legenda e o
  atributo sai. Decidir também de onde vêm: seis arquivos no CMS ou a API do
  Instagram.
- [ ] **Blog não tem destino** — o menu (hero e rodapé) lista o item, mas não
  existe seção nem página desenhada para ele no Figma. Definir se vira seção
  da one-page ou página à parte. Fonte: `navLinks` em `src/data/site.ts`.
- [ ] **Links `href="#"` restantes** — grupo de ofertas da matriz
  (`Stores.astro`), "Acessar Google Review" (`Testimonials.astro`), "Fazer a
  pesquisa" da busca da Apple (`AppleVerified.astro`) e "Políticas de
  Privacidade" (`Footer.astro`).
- [x] ~~**Destino dos ícones de IA no rodapé**~~ — resolvido em 2026-08-21.
  Os cinco abrem a plataforma com a mesma pergunta pronta, escrita na voz de
  um consumidor decidindo se compra e pedindo verificação da autorização
  Apple. Texto e URLs em `Footer.astro`. Três aceitam a pergunta por
  parâmetro (`chatgpt.com/?q=`, `grok.com/?q=`,
  `perplexity.ai/search?q=`); Gemini não aceita nenhum, então o ícone dele
  vai para o AI Mode da Busca (`google.com/search?udm=50&q=`), que é o mesmo
  modelo por baixo — decisão tomada sabendo que a tela que abre é a do
  Google Search, e não o `gemini.google.com`.
- [ ] **`?q=` do Claude não é mais documentado** — o parâmetro existiu na web
  e saiu do ar (relatos de out/2025, ligados a injeção de prompt). O link em
  `Footer.astro` o mantém porque parâmetro desconhecido é ignorado: o pior
  caso é abrir um chat vazio. Clicar o ícone do Claude antes do deploy e ver
  se a pergunta chega; se não chegar, decidir entre deixar assim ou tirar o
  ícone.

### Escopo deliberado (não é esquecimento)

- [ ] **Pastilhas de cidade em Depoimentos são só visuais.** As cinco
  aparecem como no Figma, com Santo Ângelo ativa, mas não filtram: só a
  matriz tem avaliações no Figma. Quando chegarem depoimentos das outras
  quatro unidades, aí sim vale ligar o filtro — hoje ele abriria abas
  vazias. Fonte: comentário no topo de `src/components/Testimonials.astro`.

### Assets

- [ ] **`src/assets/loja-2.png` (fachada) veio do Figma em 510×510.** A
  rotação da galeria leva toda foto ao slot grande (~1250px na tela), e
  nesse tamanho ela fica visivelmente mole. Pedir o arquivo original.
- [ ] **Avatares dos depoimentos vieram pequenos** — 72×72, e o do Pedro só
  36×36, para exibição a 40px. Em tela de alta densidade ficam moles,
  principalmente o do Pedro. Puxar as fotos originais do Google Review.
- [ ] **`src/assets/apple-locator.png` tem 1329×910** — é o recorte do Figma
  na resolução em que o print foi tirado. Encaixado ele aparece a 880px, e no
  ponto mais alto da animação a 1212px — nos dois casos abaixo de 1x em tela
  de alta densidade, e é um print cheio de texto miúdo. Pedir uma captura em
  retina (2424px de largura cobririam o maior tamanho a 2x).

### Antes do deploy de produção

- [ ] Definir a hospedagem de produção — ver `contexto-agente.md`, seção
  "Estado atual". Vercel hoje é só o ambiente de aprovação.
- [ ] Conectar o CMS e migrar o conteúdo hoje hard-coded nos componentes
  (textos, lista de unidades, fotos da galeria).
