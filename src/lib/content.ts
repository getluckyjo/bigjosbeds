/**
 * Copy resolved for the current commerce mode. The deck (copy.json) stays verbatim;
 * when online ordering is on, three enquiry-only lines are replaced by commerce.json overrides.
 */
import copy from '../content/copy.json';
import commerce from '../content/commerce.json';
import { canBuy } from './config';

export function faqItems() {
  const buying = canBuy();
  const items = copy.faqPage.items.map((item) =>
    buying && item.id === 'production' ? { ...item, answer: commerce.overrides.faqProductionAnswer } : item,
  );
  return buying ? [...items, ...commerce.faqExtra] : items;
}

export function imageCaption(): string {
  return canBuy() ? commerce.overrides.imageCaption : copy.global.imageConceptCaption;
}

export function productionBody(): string {
  return canBuy() ? commerce.overrides.productionBody : copy.productPage.production.body;
}
