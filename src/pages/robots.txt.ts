import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Disallow: /api/', ...(site ? [`Sitemap: ${new URL('/sitemap.xml', site).href}`] : [])].join('\n') + '\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
