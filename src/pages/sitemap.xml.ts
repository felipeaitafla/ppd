import type { APIRoute } from 'astro';

/* One-page: a home é a única URL que vale indexar — as seções são âncoras
   dela, não páginas. Uma lista à mão em vez de `@astrojs/sitemap` porque a
   integração lista tudo o que o build gera, e aqui não há nada além da home
   para listar. Quando surgir uma segunda página de verdade (Blog, Políticas
   de Privacidade), ela entra aqui — ou vale trocar pela integração. */
const paths = ['/'];

export const GET: APIRoute = ({ site }) => {
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
