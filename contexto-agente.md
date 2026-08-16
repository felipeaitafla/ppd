# Contexto inicial — site institucional (Astro + CMS + Figma)

Resumo operacional para começar um projeto deste tipo. O porquê de cada
regra está em `estrategia-astro-cms-figma.md`, na mesma pasta — isto aqui é
só o que decidir e em que ordem, sem a justificativa.

## Estado atual

_Política vigente — atualizar aqui sempre que mudar, e datar a mudança._
**Última atualização: 2026-08-16.**

- **Protótipo, fase de aprovação: sempre Vercel.** É o ambiente onde o
  cliente vê e aprova antes de qualquer decisão de produção — não é a
  hospedagem final.
- **Produção: Vercel, Netlify ou Railway**, conforme o que o projeto pedir
  (função serverless, preço, integração).
- **VPS: só em caso raro.**

## Sequência esperada

1. Protótipo estático sobe no Vercel para aprovação visual/de conteúdo.
2. Ajustes no mesmo protótipo até aprovar — hospedagem não muda nessa fase.
3. Definir hospedagem de produção (ver Estado atual, acima).
4. Conectar CMS, migrar conteúdo, deploy de produção.

## Defaults de stack

- Astro, saída estática, sem framework de UI salvo necessidade real.
- CMS headless, ACL de leitura pública — build não usa token.
- No máximo 1 função serverless, e só se houver recurso dinâmico de verdade.

## Regras herdadas (sem o porquê — está no guia completo)

- CMS: documento que traduz (prosa) ≠ documento que não traduz (contato,
  redes, assets compartilhados).
- i18n: uma função só decide a rota de cada idioma; SEO e interface
  consomem a mesma.
- Figma: medir (base + run do estilo, nó ainda filho do frame raiz), nunca
  confiar só na leitura da camada.
- Layout: escala fluida via `clamp()`/`vw` a partir de uma largura de
  referência; breakpoint só por mudança de comportamento.
- Strings de acessibilidade ficam no código, por idioma — não no CMS.
- Editar CMS por script: rascunho → confirmação humana → publicar (nunca
  direto no documento publicado).
- JS só onde CSS não alcança; cada exceção justificada numa frase.
- Verificação: protocolo de debug do navegador, não framework de teste
  convencional — parallax e hover não aparecem em teste de DOM.
- Hospedagem não trava arquitetura: lógica de qualquer função dinâmica num
  módulo puro (entra objeto, sai objeto) + adaptador fino por hospedagem —
  trocar o provedor de produção não pode custar reescrever lógica.

## Não copiar

Cor, tipografia, nomes de componente e vocabulário são de cada projeto —
isto é só o padrão de decisão.
