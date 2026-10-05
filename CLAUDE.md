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

**Fora da página desde 2026-09-03**: o manifesto saiu do site e a abertura
ficou sem o segundo andar. `Abertura.astro` e `Intro.astro` continuam no
repositório, sem nenhuma página que os importe, como implementação de
referência — tudo o que está descrito abaixo segue valendo para quem for
reusar a técnica com outro par de seções.

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
  `src/pages/_pv-px.astro` — histórico, não é a implementação atual. O `_`
  no nome (2026-09-28) tira a página do build: antes ela era publicada em
  `/pv-px/`, com título "pv", ao alcance de qualquer buscador.

### Revelação (em camadas) — sem pino, velocidades diferentes
Referência: `src/components/Revelacao.astro`. Ver também a memória
`reveal-em-camadas`.

**Fora da página desde 2026-09-08**: era a transição FAQ → rodapé, a última
que restava. O Figma trouxe as duas seções para o mesmo `#F6F6F6`, e sem a
borda entre os tons a camada perde o sentido — a mesma razão que tirou a
revelação de economia circular → unidades em 2026-09-04. `Revelacao.astro`
segue no repositório, sem nenhuma página que o importe, como implementação
de referência — igual à Abertura. O descrito abaixo vale para quem reusar a
técnica com um par de seções de cores diferentes.

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
- **Restrição:** só em `pointer: fine`, sem `prefers-reduced-motion` e a
  partir de 48rem (2026-09-17: uma janela estreita testada com mouse
  também caía no pino, já que a checagem original só olhava o tipo de
  ponteiro — abaixo do corte de sempre, é carrossel nativo de swipe, sem
  pino, igual ao toque); em touch vira carrossel nativo de swipe, sem pino,
  em qualquer largura.
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
- **Parâmetros a fixar antes de codar:** a escala de partida não tem número
  de desenho nenhum — desde 2026-09-08 é o menor entre dois cálculos que o
  script faz em tempo real (`AppleVerified.astro:233-235`): "cabe na
  largura da janela" e "o topo do elemento, crescendo a partir da borda de
  baixo, não passa do topo da própria seção". O segundo existe porque uma
  sangria de ponta a ponta sem teto (pedida em 2026-09-04) chegou a estourar
  visualmente para cima da seção anterior — decisão revertida no mesmo dia
  em que foi notada. O sentido do `scale()` continua maior → 1.
- **Isso NÃO é** Revelação: lá são duas seções deslocando em Y por
  diferença de velocidade; aqui é um elemento só, num `scale()`, sem
  segunda camada.

### Leque de palavras — revelação palavra a palavra (consumidor, não autônomo)
Referência: `src/components/Intro.astro` — também fora da página desde
2026-09-03, pelo mesmo motivo da Abertura, que era quem publicava o
`--avanco` que ele lia. **Nome cunhado agora** — o código
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
todos, então nada "para de escalar" numa largura diferente do resto.

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

**Quando NÃO usar:** hoje nenhuma coluna do site fica com `width` fixo em
`rem`. `--w-proof`/`--w-locator` (seção da Apple autorizada) e depois
`--w-insta` (grade do Instagram) eram os casos; todos caíram entre
2026-09-08 e 09-09, a pedido do Felipe — a seção e o print da Apple passaram
a crescer sem teto (`.proof` sem `max-width`, `.proof__shot` a 80% fluido da
largura disponível), e a grade do Instagram virou `60vw` direto (os 864px em
1440 do frame `84:174` são 60% da largura; abaixo de 60rem ocupa a largura
toda, com teto de 36rem que casa com 60vw na troca). O princípio é o mesmo:
a coluna cresce com a tela, nunca estaciona no tamanho de 1440. Raio de
borda (`--radius`) também não escala.
(Até 2026-09-30 havia uma exceção: o menu mobile e `--fs-nav-drawer` usavam
`clamp()` com teto, ancorados no frame mobile de 464px. O menu saiu do site
— ver a pendência do `header-scroll` — e o token foi junto.)

## Quebras de linha travadas no Figma

Hero e economia circular reproduzem, em qualquer largura de desktop, as
mesmas quebras de linha do frame de 1440px — e, desde 2026-09-16, em
qualquer largura de mobile, as do frame mobile (`126:157`/`126:158`/`126:161`
do Figma, canvas "Mobile"). Escala fluida sozinha não dá conta disso — ela
mantém a proporção do corpo, não a razão entre a caixa e a letra —, então o
mecanismo é outro, em três partes:

1. **Cada quebra vira `<br>` no HTML, com uma classe por faixa.**
   `class="quebra"` para as quebras do frame de 1440px (visível no desktop,
   `display: none` abaixo de 48rem) e `class="quebra-mobile"` para as do
   frame mobile (o oposto: `display: none` por padrão, visível só abaixo de
   48rem — a regra base mora em cada componente que a usa, porque o
   `<style>` do Astro é isolado por componente). Quando uma posição de
   quebra é a MESMA nas duas composições (acontece no `h1` do hero, não na
   economia circular), o `<br>` ali não leva classe nenhuma — fica sempre
   visível, sem duplicar marcação para dizer a mesma coisa duas vezes. As
   manuais do Figma e as que o Poppins faz sozinho dentro da caixa
   desenhada não se distinguem: o navegador não pode ficar escolhendo.
   **O espaço antes de cada `<br>` não é enfeite**: é o que mantém a frase
   inteira quando a classe do lado errado o esconde.
2. **As linhas vêm do render do Figma, não de reproduzir a caixa dele.** Este
   é o ponto que custou uma entrega errada: exportar o frame como imagem
   (`download_figma_images`) e ler as linhas ali. Montar a caixa do Figma no
   navegador e deixar o Poppins quebrar dá **outras** quebras — o navegador
   compõe a mesma frase 3–4% mais larga que o Figma (o `h1` do hero pede
   928px onde o Figma desenha 898). Também não dá para confiar na largura do
   frame pai: no Figma cada item pode ter a sua, e a segunda oferta da
   economia circular quebra antes porque o frame dela tem 315px, não os 347
   da coluna.
3. **A caixa cede, as linhas mandam** (`width: max-content` +
   `max-width: 100%`). A caixa cola na maior linha e fica maior que a do
   Figma nesses 3–4%; como o texto é alinhado à esquerda, o que se vê são as
   mesmas linhas no mesmo x e a sobra vai para a borda direita, que é ar.
   Largura em `em` **não** basta: o avanço dos glifos não escala exatamente
   com o corpo, e a caixa em `em` já deixou o `h1` do hero ganhar uma
   palavra na primeira linha a 768px.
4. **A coluna nunca pode ser mais estreita que a maior linha.** Onde a conta
   não fecha sozinha, alguém cede:
   - **o vão** — na economia circular as duas colunas são trilhas `auto` com
     `justify-content: space-between`, como o frame do Figma, e a folga da
     composição sai do vão (99px em 1440px, onde o Figma desenha 132);
   - **o layout** — a mesma seção só monta as duas colunas a partir de 90rem;
   - **o corpo**, por último — `min(var(--fs-h1), 6.2cqi)` no `h1` do hero,
     que morde 0,1% abaixo de 770px. Também mordia ~11% acima de ~3390px,
     enquanto `--page-max` travava `.hero__inner` numa coluna centralizada de
     1920px; esse teto saiu em 2026-09-08 (pedido do Felipe: o hero deve
     seguir o resto do site, que não centraliza — só `padding` fluido, sem
     `max-width` de página), então hoje a coluna acompanha a viewport até
     onde a tela for larga, e essa mordida de cima não existe mais.

**Consequência prática: mexer no texto quebra o acordo.** Trocar uma palavra
obriga a reexportar OS DOIS frames do Figma (desktop e mobile), reler as
linhas e refazer os `<br>` das duas faixas — e, se a maior linha mudar de
tamanho, também os coeficientes `cqi`.

**O piso da escala fluida também vem do frame mobile, e pode divergir entre
seções.** Hero (`h1`) e economia circular (`h2`) convergem para o mesmo
corpo em 1440px (58px — os dois frames de desktop batem nesse valor), mas o
Figma desenha tamanhos diferentes no mobile: 32px para o hero, 28px para a
economia circular (de propósito, não por descuido). Por isso só o hero usa
o token global `--fs-h1` (`global.css`); a economia circular tem a própria
fórmula `max()` no `<style>` de `CircularEconomy.astro`, com o mesmo V
(58px) e um piso F diferente (28px) — mesma álgebra da seção "Escala fluida"
acima, as duas curvas só coincidem exatamente em 1440px.

**Caso leve — o `h2` do Instagram** (`Instagram.astro`, frame `84:162`): um
`<br class="quebra">` depois de "fique", e só. A caixa em `em` deixava a
frase cair para três linhas (e os badges para duas) em telas largas; agora o
`h2` preenche o `.insta__head`, que mede `max-content` — a fileira de badges,
que é a linha mais larga —, e as duas linhas do título centralizam dentro
dela. Sem `cqi`, sem trilha, sem vão: aqui a "coluna" que não pode ficar
menor que a maior linha é o próprio bloco de cabeçalho, e `max-content`
resolve.

## Acordeões (`<details>`)

Dois no site — FAQ (`Faq.astro`) e Unidades (`Stores.astro`) —, os dois
`<details name>` puros: acordeão exclusivo sem uma linha de JS, e a resposta
fica no HTML servido esteja a linha aberta ou fechada. Sem CMS ou toggle em
script; ver as pendências para o que ainda falta em cada um.

**Abertura suave (2026-09-09).** Os dois animam a altura no
`::details-content` — a caixa que o navegador mostra/esconde — com a mesma
receita, dentro de `@media (prefers-reduced-motion: no-preference)`:

- `::details-content { display: grid; grid-template-rows: 0fr }` e
  `[open]::details-content { grid-template-rows: 1fr }`, com `transition` de
  260ms na trilha e em `content-visibility` (`allow-discrete`, para o
  conteúdo seguir visível enquanto recolhe);
- no filho único (`.faq__answer` / `.stores__unit-body`): `min-block-size: 0`
  para a linha `0fr` chegar a zero, e `overflow` para cortar o excesso;
- o vão até o cabeçalho virou `padding` (não `margin`) para ser recolhido
  junto; em Unidades há um `padding-bottom` de 6px só para o anel de foco dos
  links não bater na borda do corte.

**Fallback:** navegador sem `::details-content` (anterior a ~2025) ignora o
bloco todo e abre/fecha na hora — o comportamento que havia antes. Quem
mexer num, replica no outro: a receita é idêntica de propósito.

## Pendências antes de produção

Placeholders que estão no ar no protótipo e não podem passar para produção.
_Atualizar aqui sempre que uma pendência for resolvida ou surgir._
**Última atualização: 2026-09-28.**

### Contato

- [ ] **WhatsApp: mensagem padrão** em `src/data/site.ts`. O número real
  (`555533134188`, +55 55 3313-4188) entrou em 2026-09-30, no lugar do
  placeholder inválido; a mensagem pronta ("Olá! Vi o site da Pede Pro Dindo
  e quero saber mais.") segue a do protótipo, sem revisão. Alimenta o ícone
  do topo e o telefone do rodapé — trocar num lugar resolve os dois.
- [ ] **`WhatsappCta.astro` (faixa de CTA do rodapé) saiu da página** em
  2026-08-21, a pedido do Felipe ("não quero ela no site") — o componente
  continua no repo, com o asset `cta-whatsapp.png`, só não é mais importado
  em `index.astro`. Decidir se volta, muda de lugar, ou se componente e
  asset devem ser apagados de vez.
- [x] ~~**Telefone de exibição do rodapé**~~ — resolvido em 2026-09-30. É o
  número do WhatsApp (`55 3313 4188`, `contactPhone` em `src/data/site.ts`),
  e o link do rodapé passou de `tel:` para `whatsappUrl`. Também entrou como
  `telephone` da organização no JSON-LD.

### Conteúdo

- [x] ~~**Dados das unidades fora da matriz**~~ — resolvido em 2026-08-20.
  Endereço e Instagram das quatro filiais chegaram na revisão do rodapé
  (Figma `49:510`). As cinco unidades agora vivem em `units`, em
  `src/data/site.ts`, lidas pelo acordeão e pelo rodapé; "Informações em
  breve." saiu do ar. Endereço padronizado na forma longa (`R.`/`Av.`
  abreviados, vírgula antes do número) — o rodapé do Figma escrevia curto.
  Ijuí e Santiago vieram sem o tipo do logradouro; as duas são Rua,
  conferido no cadastro do CNPJ.
- [x] ~~**Link do grupo de ofertas**~~ — resolvido em 2026-09-24. As cinco
  unidades ganharam `groupUrl` em `src/data/site.ts`, cada uma com o link do
  próprio grupo (`2gq3jya.s.gy/ofertas-iphone-<cidade>`) — o botão "Acessar
  grupo de ofertas" agora aparece nas cinco, não só na matriz.
- [ ] **Handles de Instagram das filiais** — `@pedeprodindo.sr`, `.ijui` e
  `.sb` vieram do Figma e ninguém abriu os perfis; só `.stgo` e o da matriz
  estão confirmados. O acordeão já linka os cinco (`instagram.com/<handle>`,
  derivado em `site.ts`); no rodapé são texto puro, como no Figma. Desde
  2026-09-28 os cinco também entram como `sameAs` de cada loja no JSON-LD
  (`SchemaOrg.astro`) — um perfil errado ali diz ao buscador que a loja é
  outra conta. Conferir os três antes de considerar o link bom.
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
  código usava o texto do rótulo como título. As oito perguntas de `faq.ts`
  não mudaram — só a moldura.
- [x] ~~**FAQ e rodapé escuros**~~ — revertido em 2026-09-08. A revisão do
  Figma (canvas "Prototype", frames `84:183` e `84:215`) trouxe as duas
  seções para o mesmo `#F6F6F6` (`--color-card`), encerrando a fase escura da
  inversão de 2026-09-04. No FAQ: fundo claro, headline e perguntas em preto,
  corpo em `--color-text-mid`, negrito na mesma cor (só o peso muda), pergunta
  fechada em Medium e aberta em SemiBold. **A pílula branca da pergunta aberta
  saiu** — sem marcador nenhum, o peso da fonte é o único sinal de estado.
  Régua cheia (`#D5D5D5`) entre a headline e a lista, como no frame. No
  rodapé: fundo claro, logo `fill="white"` levado a preto por
  `filter: brightness(0)` (sem segundo asset). Cores afinadas em 2026-09-09
  conforme o Figma: itens de Menu/Contato e os cinco ícones de IA em preto
  (`filter: brightness(0)` nos ícones), rótulos/aviso legal/unidades em
  `--color-footer-faint`, agora `#868686` (era `#BDBDBD`). A revelação
  FAQ → rodapé saiu junto (ver "Vocabulário de efeitos de rolagem"). Os
  tokens `--color-dark-label`, `--color-faq-question`, `--color-dark-rule`,
  `--color-dark-rule-faint` e `--space-faq-pill` ficaram sem uso e foram
  removidos.
- [ ] **Contraste do FAQ e do rodapé claros** — valores do Figma, sobre o
  `#F6F6F6`:
  - rótulo do FAQ `#6C6C6C` → ~3,6:1, abaixo do AA (o mínimo nesse fundo
    seria `#767676`);
  - corpo das respostas do FAQ `#8B8B8B` (`--color-text-mid`) → ~3:1;
  - rótulos, aviso legal e unidades do rodapé `#868686`
    (`--color-footer-faint`) → ~3,5:1, abaixo do AA.
  Os itens de Menu/Contato do rodapé, que eram cinza, passaram a preto na
  revisão de 2026-09-09 e agora fecham o AA.
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
- [ ] **Blog não tem destino** — o item saiu dos menus em 2026-09-03, a pedido
  do Felipe: ficava apontando para `#`, de enfeite. Não existe seção nem
  página desenhada para ele no Figma. Definir se vira seção da one-page ou
  página à parte e devolver o item a `navLinks`, em `src/data/site.ts`. O
  frame `header-scroll` do Figma ainda desenha o item.
- [ ] **`header-scroll` (`49:508`) não foi implementado** — barra fixa de
  16px/64px com `backdrop-filter: blur(16px)`, logo `ppd` preto (95×32),
  os links e os dois ícones sociais. Fica para depois por decisão do Felipe
  (2026-09-03). Quem for implementar: os links vêm de `navLinks`, não do
  frame — lá ainda estão "Manifesto" e "Blog", os dois já removidos do menu.
  **Desde 2026-09-30 o topo do hero não tem menu** (pedido do Felipe): só a
  marca e os ícones de Instagram e WhatsApp, maiores (24px @1440). Os quatro
  links saíram e, com eles, o menu mobile inteiro (☰ + gaveta + o script de
  abrir/fechar), que só repetia links e ícones. `navLinks` segue vivo no
  rodapé. Se o `header-scroll` vier, decidir antes se ele traz os links de
  volta — o topo sem menu foi escolha, não esquecimento.
- [x] ~~**Frame mobile do hero estava desatualizado**~~ — resolvido em
  2026-09-16. O canvas "Mobile" do Figma (`54:795`) trouxe o frame redesenhado
  (`126:109`: hero + economia circular, 400px) — headline e subtexto do hero
  com quebras próprias do mobile (`.quebra-mobile`, ver "Quebras de linha
  travadas no Figma"), sem logo grande no corpo do hero (só na gaveta e no
  rodapé, como já era). O frame antigo `54:797`/`54:806` (com "Manifesto" e
  "Blog", removidos do menu em 2026-09-03) segue no arquivo do Figma como
  lixo histórico — não é mais referência.
- [x] ~~**Assinatura do topo mobile/gaveta mostrava só o selo da Apple**~~ —
  resolvido em 2026-09-16, a pedido do Felipe. `assinatura-h-white.png`
  (apagado do repo) não tinha a marca "pede pro dindo" apesar do nome — só o
  selo "Revendedor autorizado". Topo mobile (`.hero__logo`) e gaveta
  (`.drawer__badge`) passaram a usar o mesmo SVG do desktop
  (`logo-ppd-apple-white.svg`, lockup completo), cada um com seu teto de
  tamanho (sem teto no topo mobile; `clamp()` a 464px na gaveta, como já era).
- [ ] **Texto das ofertas de economia circular em `#8b8b8b` sobre branco** dá
  3,0:1, abaixo dos 4,5:1 da WCAG AA para texto normal. É o valor do Figma
  (`--color-text-mid`, que desde 2026-09-08 também serve as respostas do FAQ
  e os itens de Menu/Contato do rodapé, os dois sobre o `#F6F6F6` claro —
  contraste igualmente aquém, anotado acima). O mínimo sobre branco seria
  `#767676`.
- [ ] **Links `href="#"` restantes** — "Políticas de Privacidade"
  (`Footer.astro`). "Acessar Google Review" (`Testimonials.astro`) saiu
  daqui em 2026-10-05: as cinco cidades têm o link do próprio perfil. O
  grupo de ofertas (`Stores.astro`) saiu daqui em 2026-09-24: as cinco
  unidades têm link de verdade agora. "Fazer a pesquisa"
  (`AppleVerified.astro`) saiu em 2026-09-30: aponta para
  `locate.apple.com/br/pt/sales`.
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

- [ ] **Depoimentos: as cinco cidades filtram** (2026-10-05, os depoimentos
  chegaram no mesmo dia, cada cidade com foto e link do Google Review). Para uma cidade nova: avatares em `src/assets/depo-*.png`, cartões em
  `reviews` e a entrada em `cities` (com `reviewUrl`; sem ele o botão
  renderiza sem link) (`src/components/Testimonials.astro`);
  `filter: false` deixa a pastilha só visual enquanto não há avaliações, e um
  cartão sem `avatar` mostra a inicial num círculo. Os avatares vieram em
  36×36, como o do Pedro — ver "Assets".

### Assets

- [ ] **`src/assets/loja-2.png` (fachada) veio do Figma em 510×510.** A
  rotação da galeria leva toda foto ao slot grande (~1250px na tela), e
  nesse tamanho ela fica visivelmente mole. Pedir o arquivo original.
- [ ] **Avatares dos depoimentos vieram pequenos** — 72×72, e o do Pedro só
  36×36, para exibição a 40px. Em tela de alta densidade ficam moles,
  principalmente o do Pedro. Puxar as fotos originais do Google Review.
- [x] ~~**`src/assets/apple-locator.png` tinha 1329×910**~~ — resolvido em
  2026-09-30 junto com o item do still, abaixo: o arquivo agora tem os
  1922×1148 da gravação (menos as duas colunas pretas). Acima disso ainda
  amplia, mas a fonte não tem mais resolução — o mesmo teto do vídeo.
- [x] ~~**`public/video/autorizada.mp4` era um arquivo só, sem variantes por
  resolução**~~ — resolvido em 2026-09-30. O vídeo novo do desktop
  (`apple-local.mp4`, gravação de tela 1924×1148, 11s, fora do git como os
  outros brutos) virou `autorizada-1280.mp4` (até 1080px de janela) e
  `autorizada-1924.mp4` (acima) — duas variantes e não as quatro do hero,
  porque a fonte para em 1924px e 1440p/2160p seriam a mesma imagem
  ampliada. Mesma receita do hero (H.264 High/yuv420p, sem áudio,
  `+faststart`, CRF 23), 30fps constantes (a fonte era de taxa variável,
  ~49fps médios). As duas colunas da direita da gravação são pretas (sobra
  da captura) e saem no encode (`crop=1922:1148:0:0`): o arquivo "1924"
  tem 1922px de largura, e o `aspect-ratio` do `.proof__shot` é 1922/1148.
  Quem reencodar a partir do bruto repete o corte. O `.proof__shot` também
  perdeu a borda de 1px, que aparecia como linha clara embaixo quando o
  rodapé escuro da Apple chega na beirada. O clipe mobile
  (`autorizada-mobile.mp4`, retrato 1170×2532, gravado no aparelho) não
  mudou e não tem sobra nas bordas.
- [x] ~~**Still do desktop (`apple-locator.png`) era de outra gravação**~~ —
  resolvido em 2026-09-30. O print do Figma deu lugar ao último quadro do
  `apple-local.mp4` (extraído da gravação bruta, não da variante
  comprimida), mesmo nome de arquivo. Ele é o que aparece para quem tem
  movimento reduzido, por baixo do vídeo enquanto carrega, e a miniatura do
  `VideoObject` em `SchemaOrg.astro`. O quadro traz o cursor do mouse no
  canto superior direito, fora da área da busca.

### Antes do deploy de produção

- [ ] Definir a hospedagem de produção — ver `contexto-agente.md`, seção
  "Estado atual". Vercel hoje é só o ambiente de aprovação.
- [ ] Conectar o CMS e migrar o conteúdo hoje hard-coded nos componentes
  (textos, lista de unidades, fotos da galeria).
- [ ] **Confirmar o domínio em `site`** (`astro.config.mjs`). Hoje é
  `https://www.pedeprodindo.com.br`, presumido — o domínio ainda serve o
  site antigo em Framer. Canonical, `og:url`/`og:image`, sitemap, a linha
  `Sitemap:` do robots.txt e os `@id`/`url` do JSON-LD saem todos dele.
- [ ] **Abrir o site para robôs no domínio de produção.** Auditoria de
  2026-09-28: a URL da Vercel responde 302 para o login (Deployment
  Protection) a qualquer visitante, robô ou não, e ainda manda
  `X-Robots-Tag: noindex` — certo para a fase de aprovação, fatal se
  sobreviver ao lançamento. No deploy: proteção só em "Preview Deployments",
  e conferir em Firewall que Bot Protection e a regra "AI Bots" não barram
  Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot,
  ClaudeBot e PerplexityBot (o `robots.txt`, gerado por
  `src/pages/robots.txt.ts`, libera todos, cada um com grupo próprio).
- [ ] **Imagem de compartilhamento (`og:image`) é provisória** — a foto do
  hero (`hero-bg.jpg`) recortada em 1200×630 no build (`Layout.astro`). Uma
  arte com a marca, desenhada no Figma, faria melhor; quando vier, troca o
  import no `Layout`.
