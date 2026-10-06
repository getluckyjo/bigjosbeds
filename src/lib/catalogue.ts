import catalogue from '../data/catalogue.json';
import catalogueAf from '../content/catalogue.af.json';
import type { Locale } from '../i18n/locales';

export type ItemId = 'set' | 'mattress' | 'base';
export type FinishId = 'flax' | 'charcoal';

export interface CatalogueItem {
  id: ItemId;
  name: string;
  checkoutName: string;
  priceCents: number;
  includes: string[];
}

export interface Finish {
  id: FinishId;
  name: string;
  swatchHex: string;
  image: string;
  detailImage: string;
  alt: string;
  detailAlt: string;
}

export const items = catalogue.items as CatalogueItem[];
export const finishes = catalogue.finishes as Finish[];
export const productName = catalogue.productName;
export const maxQuantity = catalogue.maxQuantity;
export const defaultItem = catalogue.defaultItem as ItemId;
export const defaultFinish = catalogue.defaultFinish as FinishId;
export const claims = catalogue.claims;
export const homeHero = catalogue.homeHero;

/**
 * Translated names, inclusions and alt text, laid over the English catalogue.
 * Ids, prices and images always come from catalogue.json.
 */
interface Overlay {
  items: Record<string, Pick<CatalogueItem, 'name' | 'checkoutName' | 'includes'>>;
  finishes: Record<string, Pick<Finish, 'name' | 'alt' | 'detailAlt'>>;
  homeHero: { alt: string };
}

const overlays: Record<Exclude<Locale, 'en'>, Overlay> = { af: catalogueAf };

export function itemsFor(locale: Locale): CatalogueItem[] {
  if (locale === 'en') return items;
  return items.map((item) => ({ ...item, ...overlays[locale].items[item.id] }));
}

export function finishesFor(locale: Locale): Finish[] {
  if (locale === 'en') return finishes;
  return finishes.map((finish) => ({ ...finish, ...overlays[locale].finishes[finish.id] }));
}

export function homeHeroFor(locale: Locale): typeof homeHero {
  return locale === 'en' ? homeHero : { ...homeHero, ...overlays[locale].homeHero };
}

export function getItem(id: unknown, locale: Locale = 'en'): CatalogueItem | undefined {
  return itemsFor(locale).find((item) => item.id === id);
}

export function getFinish(id: unknown, locale: Locale = 'en'): Finish | undefined {
  return finishesFor(locale).find((finish) => finish.id === id);
}

export interface Selection {
  item: CatalogueItem;
  finish: Finish;
  quantity: number;
}

/**
 * Turn untrusted input (query string or form) into a priced selection.
 * Prices always come from the catalogue, never from the client. Names are in the given language.
 */
export function parseSelection(
  input: { item?: unknown; finish?: unknown; qty?: unknown },
  locale: Locale = 'en',
): Selection | null {
  const item = getItem(input.item, locale);
  const finish = getFinish(input.finish, locale);
  const quantity = Number(input.qty ?? 1);
  if (!item || !finish) return null;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQuantity) return null;
  return { item, finish, quantity };
}

export function selectionTotalCents(selection: Selection, deliveryFeeCents = 0): number {
  return selection.item.priceCents * selection.quantity + deliveryFeeCents;
}

export function selectionQuery(selection: { item: { id: string }; finish: { id: string }; quantity: number }): string {
  return new URLSearchParams({
    item: selection.item.id,
    finish: selection.finish.id,
    qty: String(selection.quantity),
  }).toString();
}
