/**
 * Sitemap of the indexable pages in both languages, each with its hreflang alternates.
 * Pages are only indexable once the shop is live (Base.astro), so until then it lists nothing.
 * Policies appear in Afrikaans only once the owner has approved the translation.
 */
import type { APIRoute } from 'astro';
import { commerceMode } from '../lib/config';
import { policiesFor, policyTranslated } from '../lib/site';
import { htmlLang, locales, type Locale } from '../i18n/locales';
import { path, policyPath, type PageKey } from '../i18n/routes';

const PAGES: PageKey[] = ['home', 'product', 'story', 'faqs', 'contact'];

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const entry = (paths: Partial<Record<Locale, string>>) =>
    Object.values(paths).map((loc) => {
      const alternates = Object.keys(paths).length > 1
        ? [
            ...Object.entries(paths).map(([l, p]) => `<xhtml:link rel="alternate" hreflang="${htmlLang[l as Locale]}" href="${abs(p!)}"/>`),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(paths.en!)}"/>`,
          ]
        : [];
      return `<url><loc>${abs(loc!)}</loc>${alternates.join('')}</url>`;
    });

  const urls =
    site && commerceMode() === 'live'
      ? [
          ...PAGES.flatMap((page) => entry(Object.fromEntries(locales.map((l) => [l, path(l, page)])))),
          ...policiesFor('en').flatMap((p) =>
            entry(policyTranslated(p.slug) ? Object.fromEntries(locales.map((l) => [l, policyPath(l, p.slug)])) : { en: policyPath('en', p.slug) }),
          ),
        ]
      : [];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
