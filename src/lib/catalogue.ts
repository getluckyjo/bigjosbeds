import catalogue from '../data/catalogue.json';

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

export function getItem(id: unknown): CatalogueItem | undefined {
  return items.find((item) => item.id === id);
}

export function getFinish(id: unknown): Finish | undefined {
  return finishes.find((finish) => finish.id === id);
}

export interface Selection {
  item: CatalogueItem;
  finish: Finish;
  quantity: number;
}

/**
 * Turn untrusted input (query string or form) into a priced selection.
 * Prices always come from the catalogue, never from the client.
 */
export function parseSelection(input: { item?: unknown; finish?: unknown; qty?: unknown }): Selection | null {
  const item = getItem(input.item);
  const finish = getFinish(input.finish);
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
