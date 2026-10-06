/**
 * Page addresses in each language. Afrikaans pages use Afrikaans slugs where people search
 * (ons-storie, vrae, kontak, beddens); checkout and order pages keep English slugs (never indexed).
 */
import type { Locale } from './locales';

const pages = {
  home: { en: '/', af: '/af/' },
  product: { en: '/beds/big-jos-bed', af: '/af/beddens/big-jos-bed' },
  story: { en: '/our-story', af: '/af/ons-storie' },
  faqs: { en: '/faqs', af: '/af/vrae' },
  contact: { en: '/contact', af: '/af/kontak' },
  checkout: { en: '/checkout', af: '/af/checkout' },
  checkoutCancelled: { en: '/checkout/cancelled', af: '/af/checkout/cancelled' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

export function path(locale: Locale, page: PageKey): string {
  return pages[page][locale];
}

const prefix = (locale: Locale) => (locale === 'af' ? '/af' : '');

export const payPath = (locale: Locale, reference: string) => `${prefix(locale)}/checkout/pay/${reference}`;
export const orderPath = (locale: Locale, reference: string) => `${prefix(locale)}/order/${reference}`;
export const policyPath = (locale: Locale, slug: string) => `${prefix(locale)}/policies/${slug}`;

const trim = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);

/**
 * The same page in every language, for hreflang links and the language switch.
 * Dynamic pages (pay, order) map to the other language's version of the same path.
 */
export function alternates(pathname: string): Record<Locale, string> {
  const current = trim(pathname);
  for (const page of Object.values(pages)) {
    if (trim(page.en) === current || trim(page.af) === current) return { en: page.en, af: page.af };
  }
  const en = current.startsWith('/af/') ? current.slice(3) : current === '/af' ? '/' : current;
  return { en, af: en === '/' ? '/af/' : `/af${en}` };
}
