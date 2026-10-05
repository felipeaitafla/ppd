import { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID } from 'astro:env/server';

export type InstagramPost = {
  id: string;
  permalink: string;
  caption: string;
  imageUrl: string;
};

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink';

/* Busca em tempo de build (site estático): as publicações mais recentes da
   matriz, para a grade de `Instagram.astro`. Falha em silêncio — token
   vencido, API fora do ar, variável ausente — porque a seção já tem um
   visual de reserva (seis quadrados cinzas) e um build quebrado por uma
   API externa é pior do que a grade ficar velha até o próximo deploy. */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) return [];

  try {
    const url = new URL(`https://graph.facebook.com/v21.0/${INSTAGRAM_USER_ID}/media`);
    url.searchParams.set('fields', FIELDS);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('access_token', INSTAGRAM_ACCESS_TOKEN);

    const response = await fetch(url);
    if (!response.ok) return [];

    const { data } = (await response.json()) as { data?: unknown[] };
    if (!Array.isArray(data)) return [];

    return data
      .map((post) => {
        const { id, permalink, caption, media_type, media_url, thumbnail_url } = post as Record<
          string,
          string | undefined
        >;
        const imageUrl = media_type === 'VIDEO' ? thumbnail_url : media_url;
        if (!id || !permalink || !imageUrl) return null;
        return { id, permalink, caption: caption ?? '', imageUrl };
      })
      .filter((post): post is InstagramPost => post !== null);
  } catch {
    return [];
  }
}
