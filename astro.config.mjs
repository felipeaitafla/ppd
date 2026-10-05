// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /* Domínio de produção — base de canonical, Open Graph, sitemap, robots.txt
     e JSON-LD (`Astro.site`). TODO: presumido; o domínio hoje ainda serve o
     site antigo em Framer. Confirmar antes do deploy de produção. */
  site: 'https://www.pedeprodindo.com.br',
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
