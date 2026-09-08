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

## Pendências antes de produção

Placeholders que estão no ar no protótipo e não podem passar para produção.
_Atualizar aqui sempre que uma pendência for resolvida ou surgir._
**Última atualização: 2026-08-21.**

### Contato

- [ ] **WhatsApp: número e mensagem padrão** em `src/data/site.ts`. O número
  atual (`5500000000000`) é inválido de propósito, para nunca abrir conversa
  com um desconhecido se escapar para produção. Alimenta o ícone do hero, o
  menu mobile e a faixa de CTA do rodapé — trocar num lugar resolve os três.
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
  acessibilidade: o rótulo em `#6C6C6C` piorou com a inversão de fundos de
  2026-09-04 — sobre o `#0C0C0C` do FAQ (o `#141414` que veio do rodapé,
  escurecido no mesmo dia a pedido do Felipe) dá 3,72:1, contra 3,9:1 sobre
  o `#040404` de antes, e os dois estão abaixo dos 4,5:1 da WCAG AA para
  texto normal. O mínimo nesse fundo é `#7A7A7A`.
  O rótulo do rodapé (`#464646`) andou no sentido contrário, de 1,95:1 para
  2,17:1 — longe do AA nos dois casos, e continua sendo o pior contraste do
  site.
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
  pesquisa" da busca da Apple (`AppleVerified.astro`), os cinco ícones de IA
  e "Políticas de Privacidade" (`Footer.astro`).
- [ ] **Destino dos ícones de IA no rodapé** — a intenção aparente é abrir
  cada plataforma com uma pergunta pronta sobre a PPD, mas o Figma não traz
  nenhuma URL. Decidir o formato antes de escrever os links.

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
  na resolução em que o print foi tirado. Desde 2026-09-08 o tamanho
  encaixado e o teto da animação são fluidos (80% da coluna disponível, sem
  teto — ver `AppleVerified.astro`), então em telas largas o print amplia
  além dos 1329px nativos mais cedo do que antes. Pedir uma captura em
  retina resolve nos dois pontos.
- [ ] **`public/video/autorizada.mp4` é um arquivo só, sem variantes por
  resolução** — ao contrário do vídeo do hero (`hero-720p/1080p/1440p/
  2160p.mp4`), que tem uma fonte por faixa de tela. Pedido do Felipe em
  2026-09-08: ele vai mandar um vídeo novo, em qualidade melhor, para
  gerarmos as mesmas quatro variantes daqui — mesmo tratamento de
  conversão que já foi usado para o vídeo do hero (H.264 High/yuv420p, sem
  áudio, `+faststart`, CRF calibrado por faixa).

### Antes do deploy de produção

- [ ] Definir a hospedagem de produção — ver `contexto-agente.md`, seção
  "Estado atual". Vercel hoje é só o ambiente de aprovação.
- [ ] Conectar o CMS e migrar o conteúdo hoje hard-coded nos componentes
  (textos, lista de unidades, fotos da galeria).
