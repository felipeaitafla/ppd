/* O que dois ou mais componentes precisam ler igual. Menu aparece no hero e
   no rodapé; o WhatsApp, no ícone do hero e no menu mobile;
   as unidades, no acordeão de Unidades e no rodapé — declarar em cada um
   garantiria que um dia divergissem. */

/* Quatro itens, e não seis: "Manifesto" saiu junto com a seção — o texto
   dele agora é o próprio hero, e um link para o topo da página não é item de
   menu. "Blog" saiu por decisão do Felipe (2026-09-03): o item só volta
   quando existir destino, em vez de ficar de enfeite apontando para `#`. O
   `header-scroll` do Figma ainda desenha os dois; quem for implementá-lo lê
   esta lista, não o frame. */
export const navLinks = [
  { label: 'Economia Circular', href: '#economia-circular' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Autorizada', href: '#autorizada' },
  { label: 'FAQ', href: '#faq' },
];

/* TODO: número e mensagem são placeholders. O número é deliberadamente
   inválido para nunca abrir conversa com um desconhecido caso escape para
   produção — trocar pelo número real antes do deploy. */
export const whatsappNumber = '5500000000000';
export const whatsappMessage =
  'Olá! Vi o site da Pede Pro Dindo e quero saber mais.';
export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const profileUrl = (handle: string) => `https://instagram.com/${handle.slice(1)}`;

/* Handle confirmado pelo próprio Figma, na ficha da matriz. É também o
   perfil da marca, que o hero linka. */
export const instagramHandle = '@pedeprodindo';
export const instagramUrl = profileUrl(instagramHandle);

type Unit = {
  city: string;
  address: string;
  instagram: string;
  matriz?: boolean;
  /* TODO: link real do grupo de ofertas. Só a matriz mostra o botão — as
     outras quatro ficam sem ele até os links delas existirem. */
  groupUrl?: string;
};

/* As cinco unidades, lidas pelo acordeão de Unidades e pelo rodapé.

   Endereço na forma longa: tipo do logradouro abreviado e vírgula antes do
   número. O rodapé do Figma escreve curto ("25 de Julho 534"); a forma longa
   venceu para as duas telas dizerem a mesma coisa. Ijuí e Santiago chegaram
   do Figma sem o tipo do logradouro — as duas são Rua, conferido no cadastro
   do CNPJ. */
const unitList: Unit[] = [
  {
    city: 'Santo Ângelo',
    address: 'R. Vinte e Cinco de Julho, 534',
    instagram: instagramHandle,
    matriz: true,
    groupUrl: '#',
  },
  {
    city: 'Santa Rosa',
    address: 'Av. Rio Branco, 220',
    instagram: '@pedeprodindo.sr',
  },
  {
    city: 'Ijuí',
    address: 'R. 14 de Julho, 36',
    instagram: '@pedeprodindo.ijui',
  },
  {
    city: 'São Borja',
    address: 'Av. Pres. Vargas, 1941',
    instagram: '@pedeprodindo.sb',
  },
  {
    city: 'Santiago',
    address: 'R. Marechal Deodoro, 1195',
    instagram: '@pedeprodindo.stgo',
  },
];

/* Rótulo do acordeão e URL do perfil saem daqui: escrever "Santa Rosa" e
   "Santa Rosa, RS" lado a lado — ou o handle e a URL — é criar duas chances
   de divergirem. As cinco unidades são no RS. */
export const units = unitList.map((unit) => ({
  ...unit,
  label: `${unit.city}, RS${unit.matriz ? ' (matriz)' : ''}`,
  instagramUrl: profileUrl(unit.instagram),
}));

export const contactEmail = 'contato@pedeprodindo.com.br';
/* TODO: telefone de exibição do rodapé ainda é o placeholder do Figma. */
export const contactPhone = '55 9 99900 0000';
