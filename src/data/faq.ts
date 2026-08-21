/* As oito perguntas de `faq-ppd-seminovos.md`, convertidas de Markdown para
   HTML. A resposta é HTML e não texto puro porque o documento usa negrito e
   uma lista — e porque a mesma string alimenta dois consumidores: o acordeão
   da seção e o JSON-LD de `FAQPage`, que aceita este subconjunto de tags
   (`p`, `ul`, `li`, `strong`).

   O Figma (`49:615`) desenhou nove linhas, todas escritas "Perguntas": é
   preenchimento, não conteúdo. O documento é a fonte, e ele traz oito. */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: 'Como vocês classificam a condição dos aparelhos?',
    answer: `
      <p>Todo seminovo PPD recebe uma classificação que descreve seu estado estético e funcional, para você saber exatamente o que está comprando:</p>
      <ul>
        <li><strong>Excelente</strong> — não possui marcas de uso. Se houver, são leves e imperceptíveis.</li>
        <li><strong>Bom</strong> — possui marcas de uso moderadas.</li>
        <li><strong>Regular</strong> — possui marcas de uso consideráveis e/ou saúde de bateria mais baixa.</li>
        <li><strong>Outlet</strong> — pode apresentar muitas marcas de uso, funções inoperantes e/ou peças substituídas, sempre com o aviso de peça não genuína informado antes da compra.</li>
      </ul>
      <p>Independentemente da classificação, <strong>todos os modelos passam por revisão dos nossos especialistas, com mais de 40 itens testados em cada dispositivo, e contam com garantia.</strong> A classificação não diz respeito à qualidade da revisão — apenas ao estado estético e à autonomia da bateria de cada aparelho.</p>
    `,
  },
  {
    question:
      'Os aparelhos passam por algum processo de checagem/higienização antes da venda?',
    answer: `
      <p>Sim. Antes de ir para a loja, cada aparelho passa por checagem técnica e higienização feitas pela equipe do <strong>PPD Lab</strong>, nossa assistência especializada. São mais de 40 itens testados em cada dispositivo para garantir que tudo esteja funcionando como deveria e que o produto chegue até você limpo, revisado e pronto para uso.</p>
    `,
  },
  {
    question: 'O produto vem com acessórios?',
    answer: `
      <p>Os seminovos não acompanham acessórios de fábrica. Em contrapartida, oferecemos uma linha completa de acessórios em diferentes faixas de preço — homologados pela Apple ou compatíveis — para você escolher exatamente o que precisa, sem pagar por itens que talvez já tenha em casa. É uma opção mais econômica e alinhada à economia circular: você compra só o necessário.</p>
    `,
  },
  {
    question: 'Vocês vendem aparelhos com peças substituídas?',
    answer: `
      <p>Sim, alguns aparelhos podem ter peças substituídas — e sempre informamos isso de forma clara antes da compra. Quando um aparelho contém peça não genuína, ele é classificado como <strong>Outlet</strong> e o aviso vem destacado na descrição do produto. Nossa premissa é a transparência total: você nunca leva uma surpresa depois de comprar.</p>
    `,
  },
  {
    question: 'Qual é o prazo de garantia dos seminovos?',
    answer: `
      <p>Todos os seminovos têm <strong>12 meses de garantia</strong> como padrão. Se quiser mais tranquilidade, é possível estender a cobertura para <strong>24 meses</strong> aderindo ao <strong>PPD Plus</strong>. A garantia acompanha todos os aparelhos, independentemente da classificação.</p>
    `,
  },
  {
    question: 'Onde faço a assistência técnica se precisar?',
    answer: `
      <p>Você conta com o <strong>PPD Lab</strong>, nossa assistência técnica especializada em iPhones. É a mesma equipe que revisa e prepara cada aparelho antes da venda, então você tem o suporte de quem realmente entende do produto — do diagnóstico ao reparo.</p>
    `,
  },
  {
    question: 'O que é economia circular e por que comprar seminovo faz diferença?',
    answer: `
      <p>Economia circular é um modelo que mantém os produtos em uso pelo maior tempo possível, em vez de descartá-los precocemente. Na prática, significa dar uma nova vida a um aparelho que ainda tem muito a oferecer: ele é recolhido, revisado por especialistas e volta ao mercado com garantia, no lugar de virar lixo eletrônico.</p>
      <p>Comprar um seminovo faz diferença em três frentes. Para o <strong>seu bolso</strong>, porque você leva um produto Apple por um valor menor. Para o <strong>planeta</strong>, porque cada aparelho reaproveitado evita a extração de novas matérias-primas e reduz o descarte de eletrônicos — uma das formas de lixo que mais cresce no mundo. E para a <strong>cadeia como um todo</strong>, porque estimula um consumo mais consciente, em que a tecnologia circula em vez de ser desperdiçada. Na PPD, você compra bem, economiza e ainda contribui para um ciclo mais sustentável.</p>
    `,
  },
  {
    question: 'Comprar um seminovo tem a mesma qualidade de um novo?',
    answer: `
      <p>Sim — com a diferença de que você paga menos por isso. Todo seminovo PPD é revisado por especialistas do PPD Lab, com mais de 40 itens testados, e sai com garantia. A única diferença em relação a um produto lacrado é a possibilidade de marcas de uso, que informamos abertamente pela classificação (Excelente, Bom, Regular ou Outlet) e pela saúde da bateria. Ou seja: você sabe exatamente o estado do aparelho antes de comprar e leva um produto Apple original, testado e com suporte, por um preço mais acessível.</p>
    `,
  },
];
