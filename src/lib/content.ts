/**
 * Copy resolved for the current commerce mode. The deck (copy.json) stays verbatim;
 * when online ordering is on, three enquiry-only lines are replaced by commerce.json overrides.
 */
import copy from '../content/copy.json';
import commerce from '../content/commerce.json';
import { claims } from './catalogue';
import { canBuy } from './config';
import type { IconName } from './icons';
import { fill } from './money';

const claimValues = { days: String(claims.trial.days), years: String(claims.warranty.years) };

/** FAQs that state the trial or warranty only appear once that claim is published. */
const claimFaqs: Record<string, boolean> = { trial: claims.trial.publish, warranty: claims.warranty.publish };

export function faqItems() {
  const buying = canBuy();
  const items = copy.faqPage.items.map((item) =>
    buying && item.id === 'production' ? { ...item, answer: commerce.overrides.faqProductionAnswer } : item,
  );
  if (!buying) return items;
  const extra = commerce.faqExtra
    .filter((item) => claimFaqs[item.id] ?? true)
    .map((item) => ({ ...item, answer: fill(item.answer, claimValues) }));
  return [...items, ...extra];
}

export interface Assurance {
  id: 'trial' | 'warranty';
  icon: IconName;
  text: string;
  short: string;
}

/** The owner-approved trial and warranty, for lists beside prices and buy buttons. */
export function assurances(): Assurance[] {
  const a = commerce.assurance;
  const list: Assurance[] = [];
  if (claims.trial.publish) {
    list.push({ id: 'trial', icon: 'returns', text: fill(a.trial, claimValues), short: fill(a.trialShort, claimValues) });
  }
  if (claims.warranty.publish) {
    const warranty = fill(a.warranty, claimValues);
    list.push({ id: 'warranty', icon: 'warranty', text: warranty, short: warranty });
  }
  return list;
}

/** Spec-table row for the warranty, or nothing while it's unpublished. */
export function warrantySpec(): { icon: IconName; label: string; value: string }[] {
  if (!claims.warranty.publish) return [];
  const a = commerce.assurance;
  return [{ icon: 'warranty', label: a.warrantySpecLabel, value: fill(a.warrantySpecValue, claimValues) }];
}

export function imageCaption(): string {
  return canBuy() ? commerce.overrides.imageCaption : copy.global.imageConceptCaption;
}

export function productionBody(): string {
  return canBuy() ? commerce.overrides.productionBody : copy.productPage.production.body;
}
