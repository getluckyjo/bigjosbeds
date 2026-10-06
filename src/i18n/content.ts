/**
 * The copy deck and commerce copy in each language. The Afrikaans files mirror the English
 * structure exactly; typing them as the English types makes a missing or renamed key a build error.
 */
import copyEn from '../content/copy.json';
import copyAfJson from '../content/copy.af.json';
import commerceEn from '../content/commerce.json';
import commerceAfJson from '../content/commerce.af.json';
import type { Locale } from './locales';

export type Copy = typeof copyEn;
export type Commerce = typeof commerceEn;

const copyAf: Copy = copyAfJson;
const commerceAf: Commerce = commerceAfJson;

const copies: Record<Locale, Copy> = { en: copyEn, af: copyAf };
const commerces: Record<Locale, Commerce> = { en: commerceEn, af: commerceAf };

export function copyFor(locale: Locale): Copy {
  return copies[locale];
}

export function commerceFor(locale: Locale): Commerce {
  return commerces[locale];
}
