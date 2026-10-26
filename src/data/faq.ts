/* Perguntas institucionais, escritas para parceiros e pares — o público do
   site é B2B, e o evento de economia circular é o motivo dele existir. Em
   2026-10-26 saíram as perguntas de balcão (acessórios, "a loja fechou?",
   "tem a qualidade de um novo?") e o conteúdo de `faq-ppd-seminovos.md` foi
   reescrito em voz de rede: quem somos, como operamos, que padrão
   sustentamos. Nenhuma resposta afirma data, regra ou condição do evento: o
   que o site não tem fonte para dizer fica de fora.

   A resposta é HTML e não texto puro porque usa negrito — e porque a mesma
   string alimenta dois consumidores: o acordeão da seção e o JSON-LD de
   `FAQPage`, que aceita este subconjunto de tags (`p`, `ul`, `li`,
   `strong`).

   O Figma (`49:615`) desenhou nove linhas, todas escritas "Perguntas": é
   preenchimento, não conteúdo.

   Endereço, cidades e contato são lidos de `site.ts`, o mesmo que o
   acordeão de Unidades e o rodapé mostram, para as telas nunca divergirem. */

import { contactEmail, contactPhone, units } from './site';

const matriz = units.find((unit) => unit.matriz)!;
const cidades = units.map((unit) => unit.city);
const listaDeCidades = `${cidades.slice(0, -1).join(', ')} e ${cidades.at(-1)}`;

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: 'Quem é a Pede Pro Dindo?',
    answer: `
      <p>Somos uma rede de <strong>revenda autorizada Apple e assistência técnica</strong> com ${units.length} unidades no Rio Grande do Sul: ${listaDeCidades}. A matriz fica em ${matriz.city}, em ${matriz.address}.</p>
    `,
  },
  {
    question: 'Qual é a proposta da rede em economia circular?',
    answer: `
      <p>Manter os aparelhos em uso pelo maior tempo possível, em vez de descartá-los cedo. Na prática, o ciclo tem três frentes: <strong>compra</strong> de iPhones seminovos revisados e com garantia, <strong>troca</strong> do modelo atual pagando apenas a diferença e <strong>venda</strong> do aparelho usado para a rede, com avaliação e pagamento na hora.</p>
      <p>O aparelho é recolhido, revisado por especialistas e volta ao mercado com garantia, no lugar de virar lixo eletrônico. O resultado é acesso a dispositivos de alto nível a um valor menor, menos extração de matéria-prima e menos descarte.</p>
    `,
  },
  {
    question: 'Como é o processo de revisão dos aparelhos?',
    answer: `
      <p>Antes de ir para a loja, cada aparelho passa por checagem técnica e higienização feitas pela equipe do <strong>PPD Lab</strong>, nossa assistência especializada. São mais de 40 itens testados em cada dispositivo, para que o produto chegue limpo, revisado e pronto para uso.</p>
    `,
  },
  {
    question: 'Que padrão de classificação a rede adota?',
    answer: `
      <p>Todo seminovo recebe uma classificação que descreve o estado estético e a autonomia da bateria, em quatro níveis:</p>
      <p><strong>Excelente:</strong> sem marcas de uso, ou com marcas leves e imperceptíveis.</p>
      <p><strong>Bom:</strong> marcas de uso moderadas.</p>
      <p><strong>Regular:</strong> marcas de uso consideráveis e/ou saúde de bateria mais baixa.</p>
      <p><strong>Outlet:</strong> pode apresentar muitas marcas de uso, funções inoperantes e/ou peças substituídas.</p>
      <p>A classificação não diz respeito à qualidade da revisão: <strong>todos os modelos passam pela mesma revisão e contam com garantia.</strong></p>
    `,
  },
  {
    question: 'Como a rede trata aparelhos com peças substituídas?',
    answer: `
      <p>Com transparência total. Alguns aparelhos podem ter peças substituídas, e isso é sempre informado de forma clara antes da venda. Quando há peça não genuína, o aparelho é classificado como <strong>Outlet</strong> e o aviso vem destacado na descrição do produto.</p>
    `,
  },
  {
    question: 'Que garantia a rede oferece?',
    answer: `
      <p>Todos os seminovos têm <strong>12 meses de garantia</strong> como padrão, independentemente da classificação. A cobertura pode ser estendida para <strong>24 meses</strong> com o <strong>PPD Plus</strong>.</p>
    `,
  },
  {
    question: 'Como funciona a assistência técnica?',
    answer: `
      <p>O <strong>PPD Lab</strong> é a assistência técnica especializada em iPhones da rede. É a mesma equipe que revisa e prepara os aparelhos antes da venda, então o suporte vem de quem conhece o produto do diagnóstico ao reparo.</p>
    `,
  },
  {
    question: 'Como entrar em contato com a rede?',
    answer: `
      <p>Pelo WhatsApp, no <strong>${contactPhone}</strong>, ou pelo e-mail <strong>${contactEmail}</strong>. Os endereços e perfis de cada uma das ${units.length} unidades estão na seção de unidades e no rodapé.</p>
    `,
  },
];
