// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

const poppins = (weight) => ({
  weight,
  style: 'normal',
  src: [`@fontsource/poppins/files/poppins-latin-${weight}-normal.woff2`],
});

// https://astro.build/config
export default defineConfig({
  /* Domínio de produção — base de canonical, Open Graph, sitemap, robots.txt
     e JSON-LD (`Astro.site`). TODO: presumido; o domínio hoje ainda serve o
     site antigo em Framer. Confirmar antes do deploy de produção. */
  site: 'https://www.pedeprodindo.com.br',
  /* Poppins pela API de fontes do Astro, não mais por `@import` do
     `@fontsource` no CSS: os mesmos arquivos (provedor local, sem rede no
     build), mas agora com `<link rel="preload">` no `<head>` e uma fonte
     reserva com as métricas do Poppins (`size-adjust` & cia. sobre a
     `sans-serif` do sistema). Antes, o texto pintava em `system-ui` e
     trocava para o Poppins segundos depois — mais largo, então títulos e
     parágrafos "mudavam de tamanho" na carga. Só o subconjunto latin:
     cobre o português inteiro. */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      fallbacks: ['sans-serif'],
      options: {
        variants: [poppins(400), poppins(500), poppins(600), poppins(700)],
      },
    },
  ],
  env: {
    schema: {
      /* Grade de publicações do Instagram (`src/components/Instagram.astro`).
         Secretos e só de servidor: nunca devem ir para o bundle do cliente.
         Opcionais: sem elas `getInstagramPosts` devolve lista vazia e a grade
         cai nos quadrados de reserva — obrigatórias, o Astro derrubava o
         build inteiro antes disso (deploy da Vercel de 2026-10-05). */
      INSTAGRAM_ACCESS_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      INSTAGRAM_USER_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
