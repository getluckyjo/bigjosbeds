import business from '../config/business.json';

export type PostalRange = readonly [number, number];

export const deliveryRanges = business.delivery.postalCodeRanges as unknown as PostalRange[];
export const deliveryFeeCents = business.delivery.feeCents;
export const deliveryAreaName = business.delivery.areaName;

/** South African postal codes are four digits. */
export function normalisePostalCode(value: string): string | null {
  const digits = value.replace(/\s+/g, '');
  return /^\d{4}$/.test(digits) ? digits : null;
}

export function isInDeliveryArea(postalCode: string, ranges: readonly PostalRange[] = deliveryRanges): boolean {
  const code = normalisePostalCode(postalCode);
  if (!code) return false;
  const n = Number(code);
  return ranges.some(([from, to]) => n >= from && n <= to);
}
