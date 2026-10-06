/**
 * Copy resolved for the current commerce mode and language. The deck (copy.json) stays verbatim;
 * when online ordering is on, three enquiry-only lines are replaced by commerce.json overrides.
 */
import { claims, items as catalogueItems } from './catalogue';
import { canBuy } from './config';
import type { IconName } from './icons';
import { fill } from './money';
import { commerceFor, copyFor } from '../i18n/content';
import type { Locale } from '../i18n/locales';

const claimValues = { days: String(claims.trial.days), years: String(claims.warranty.years) };

/** FAQs that state the trial or warranty only appear once that claim is published. */
const claimFaqs: Record<string, boolean> = { trial: claims.trial.publish, warranty: claims.warranty.publish };

export function faqItems(locale: Locale = 'en') {
  const copy = copyFor(locale);
  const commerce = commerceFor(locale);
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
  /** Item ids this doesn't apply to (the warranty covers the mattress, not the base). */
  notFor: string[];
}

const warrantyItems: string[] = claims.warranty.appliesToItems;

/**
 * The owner-approved trial and warranty, for lists beside prices and buy buttons.
 * Pass the chosen item to leave out anything that doesn't apply to it.
 */
export function assurances(itemId?: string, locale: Locale = 'en'): Assurance[] {
  const a = commerceFor(locale).assurance;
  const list: Assurance[] = [];
  if (claims.trial.publish) {
    list.push({ id: 'trial', icon: 'returns', text: fill(a.trial, claimValues), short: fill(a.trialShort, claimValues), notFor: [] });
  }
  if (claims.warranty.publish) {
    const warranty = fill(a.warranty, claimValues);
    const notFor = catalogueItems.map((i) => i.id).filter((id) => !warrantyItems.includes(id));
    list.push({ id: 'warranty', icon: 'warranty', text: warranty, short: warranty, notFor });
  }
  return itemId ? list.filter((x) => !x.notFor.includes(itemId)) : list;
}

/** Spec-table row for the warranty, or nothing while it's unpublished. */
export function warrantySpec(locale: Locale = 'en'): { icon: IconName; label: string; value: string }[] {
  if (!claims.warranty.publish) return [];
  const a = commerceFor(locale).assurance;
  return [{ icon: 'warranty', label: a.warrantySpecLabel, value: fill(a.warrantySpecValue, claimValues) }];
}

export function imageCaption(locale: Locale = 'en'): string {
  return canBuy() ? commerceFor(locale).overrides.imageCaption : copyFor(locale).global.imageConceptCaption;
}

export function productionBody(locale: Locale = 'en'): string {
  return canBuy() ? commerceFor(locale).overrides.productionBody : copyFor(locale).productPage.production.body;
}
