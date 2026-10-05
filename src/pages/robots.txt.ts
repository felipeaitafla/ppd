import type { APIRoute } from 'astro';

/* Gerado no build, e não um arquivo fixo em `public/`, para a linha
   `Sitemap:` sair do mesmo `site` do `astro.config.mjs` que o canonical usa.

   Cada robô de busca e de IA ganha um grupo próprio: quem acha o seu grupo
   ignora o `*`, então liberar só no `*` deixaria a decisão a cargo de uma
   regra que um bloqueio futuro no `*` mudaria sem ninguém perceber. */
const bots = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
];

export const GET: APIRoute = ({ site }) => {
  const groups = ['*', ...bots].map((bot) => `User-agent: ${bot}\nAllow: /`);
  const body = `${groups.join('\n\n')}\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
