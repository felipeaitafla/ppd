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

/* Número real desde 2026-09-30 (+55 55 3313-4188). A mensagem pronta ainda
   é a do protótipo — ninguém a revisou. */
export const whatsappNumber = '555533134188';
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
  mapsUrl: string;
  instagram: string;
  matriz?: boolean;
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
    mapsUrl:
      'https://www.google.com/maps/place/Pede+Pro+Dindo+-+Revendedor+Autorizado+Apple+e+Assist%C3%AAncia+T%C3%A9cnica/data=!4m2!3m1!1s0x0:0xf2ee01cda632b1a9?sa=X&ved=1t:2428&ictx=111',
    instagram: instagramHandle,
    matriz: true,
    groupUrl: 'https://2gq3jya.s.gy/ofertas-iphone-sa',
  },
  {
    city: 'Santa Rosa',
    address: 'Av. Rio Branco, 220',
    mapsUrl:
      'https://www.google.com/maps/place/Pede+Pro+Dindo+-+Revenda+autorizada+Apple+e+assist%C3%AAncia+t%C3%A9cnica/@-27.8667092,-54.4790752,17z/data=!3m1!4b1!4m6!3m5!1s0x94f93556f4885359:0x82a276f213977890!8m2!3d-27.866714!4d-54.4764949!16s%2Fg%2F11s7cmwqx2?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D',
    instagram: '@pedeprodindo.sr',
    groupUrl: 'https://2gq3jya.s.gy/ofertas-iphone-sr',
  },
  {
    city: 'Ijuí',
    address: 'R. 14 de Julho, 36',
    mapsUrl:
      'https://www.google.com/maps/place/Pede+Pro+Dindo+-+Revenda+autorizada+Apple+e+assist%C3%AAncia+t%C3%A9cnica/@-28.391032,-53.9150961,17z/data=!3m1!4b1!4m6!3m5!1s0x94fc2debd51a4e73:0xbb37d57f8fcbe106!8m2!3d-28.3910367!4d-53.9125158!16s%2Fg%2F11st69wrhv?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D',
    instagram: '@pedeprodindo.ijui',
    groupUrl: 'https://2gq3jya.s.gy/ofertas-iphone-ijui',
  },
  {
    city: 'São Borja',
    address: 'Av. Pres. Vargas, 1941',
    mapsUrl:
      'https://www.google.com/maps/place/Pede+Pro+Dindo+-+Revenda+Autorizada+Apple+e+assist%C3%AAncia+t%C3%A9cnica/@-28.6594702,-56.0056778,17z/data=!3m1!4b1!4m6!3m5!1s0x9455c7983e2881e5:0xc6dd5b6c84f14f5a!8m2!3d-28.6594749!4d-56.0030975!16s%2Fg%2F11st7ccp96?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D',
    instagram: '@pedeprodindo.sb',
    groupUrl: 'https://2gq3jya.s.gy/ofertas-iphone-sb',
  },
  {
    city: 'Santiago',
    address: 'R. Marechal Deodoro, 1195',
    mapsUrl:
      'https://www.google.com/maps/place/Pede+Pro+Dindo+-+Revenda+autorizada+Apple+e+assist%C3%AAncia+t%C3%A9cnica/@-29.1900919,-54.8708246,17z/data=!3m1!4b1!4m6!3m5!1s0x94ffd3c16f78bfeb:0x1751f2bb4e3b07dc!8m2!3d-29.1900966!4d-54.8682443!16s%2Fg%2F11wv034w4v?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D',
    instagram: '@pedeprodindo.stgo',
    groupUrl: 'https://2gq3jya.s.gy/ofertas-iphone-santiago',
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
/* O número do WhatsApp, escrito para leitura no rodapé — mesmo formato que o
   Figma usava no placeholder (DDD, espaço, número). O link do rodapé vai
   para `whatsappUrl`, não `tel:`: é o canal de atendimento da loja. */
export const contactPhone = '55 3313 4188';
