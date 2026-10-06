/**
 * Site languages. English lives at the root; Afrikaans under /af with Afrikaans slugs.
 * Brand, product and finish names stay in English in both.
 */
export const locales = ['en', 'af'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** <html lang> and hreflang values. */
export const htmlLang: Record<Locale, string> = { en: 'en-ZA', af: 'af-ZA' };
export const ogLocale: Record<Locale, string> = { en: 'en_ZA', af: 'af_ZA' };
/** Each language's own name, for the language switch. */
export const localeName: Record<Locale, string> = { en: 'English', af: 'Afrikaans' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function localeFromPath(pathname: string): Locale {
  return pathname === '/af' || pathname.startsWith('/af/') ? 'af' : 'en';
}
