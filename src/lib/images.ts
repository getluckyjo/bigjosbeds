import bedFlax from '../assets/images/bed-flax.png';
import bedCharcoal from '../assets/images/bed-charcoal.png';
import detailFlax from '../assets/images/detail-flax.png';
import detailCharcoal from '../assets/images/detail-charcoal.png';

/** Concept renders (see src/data/catalogue.json imageStatus). Keyed by catalogue image names. */
export const images = {
  'bed-flax': bedFlax,
  'bed-charcoal': bedCharcoal,
  'detail-flax': detailFlax,
  'detail-charcoal': detailCharcoal,
} as const;

export type ImageName = keyof typeof images;

export function image(name: string) {
  const found = images[name as ImageName];
  if (!found) throw new Error(`Unknown image "${name}"`);
  return found;
}

/** Responsive widths generated at build time (never larger than the 1536px sources). */
export const imageWidths = [480, 800, 1200, 1536];
