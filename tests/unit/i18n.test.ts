import { describe, expect, it } from 'vitest';
import catalogue from '../../src/data/catalogue.json';
import catalogueAf from '../../src/content/catalogue.af.json';
import commerceEn from '../../src/content/commerce.json';
import commerceAf from '../../src/content/commerce.af.json';
import copyEn from '../../src/content/copy.json';
import copyAf from '../../src/content/copy.af.json';
import { getItem, itemsFor, parseSelection } from '../../src/lib/catalogue';
import { assurances, faqItems } from '../../src/lib/content';
import { customerConfirmation, ownerEnquiryAlert, ownerPaidAlert } from '../../src/lib/email';
import { MemoryStore } from '../../src/lib/orders';
import { buildCheckoutForm } from '../../src/lib/payfast';
import { PAYFAST_SANDBOX } from '../../src/lib/config';
import { fieldErrors, schemas } from '../../src/lib/validation';
import { localeFromPath } from '../../src/i18n/locales';
import { alternates, path } from '../../src/i18n/routes';
import { ui } from '../../src/i18n/ui';

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

/** Walk two JSON trees in step: same keys in the same order, same array lengths and types, same placeholders. */
function compare(en: unknown, af: unknown, at = '$'): string[] {
  if (Array.isArray(en)) {
    if (!Array.isArray(af)) return [`${at}: not an array`];
    if (en.length !== af.length) return [`${at}: ${en.length} vs ${af.length} items`];
    return en.flatMap((v, i) => compare(v, af[i], `${at}[${i}]`));
  }
  if (en && typeof en === 'object') {
    if (!af || typeof af !== 'object' || Array.isArray(af)) return [`${at}: not an object`];
    const ek = Object.keys(en);
    const ak = Object.keys(af);
    if (ek.join() !== ak.join()) return [`${at}: keys ${ek.join()} vs ${ak.join()}`];
    return ek.flatMap((k) => compare((en as any)[k], (af as any)[k], `${at}.${k}`));
  }
  if (typeof en !== typeof af) return [`${at}: ${typeof en} vs ${typeof af}`];
  if (typeof en === 'string' && placeholders(en).join() !== placeholders(af as string).join()) {
    return [`${at}: placeholders ${placeholders(en)} vs ${placeholders(af as string)}`];
  }
  return [];
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('Afrikaans content', () => {
  it('mirrors the English copy deck and commerce copy exactly', () => {
    expect(compare(copyEn, copyAf)).toEqual([]);
    expect(compare(commerceEn, commerceAf)).toEqual([]);
  });

  it('keeps the interface strings and their placeholders in step', () => {
    expect(compare(ui('en'), ui('af'))).toEqual([]);
  });

  it('translates every catalogue item and finish, keeping prices and finish names', () => {
    for (const item of catalogue.items) {
      const af = (catalogueAf.items as Record<string, { includes: string[] }>)[item.id];
      expect(af, item.id).toBeDefined();
      expect(af.includes).toHaveLength(item.includes.length);
    }
    expect(itemsFor('af').map((i) => i.priceCents)).toEqual(itemsFor('en').map((i) => i.priceCents));
    expect(parseSelection({ item: 'base', finish: 'charcoal', qty: '1' }, 'af')).toMatchObject({
      item: { id: 'base', name: 'Net die basis', priceCents: 599900 },
      finish: { id: 'charcoal', name: 'Charcoal' },
    });
  });

  it('links internal pages to their Afrikaans addresses', () => {
    const afPaths = new Set(['/af/', '/af/beddens/big-jos-bed', '/af/ons-storie', '/af/vrae', '/af/kontak']);
    const links = strings(copyAf).filter((s) => s.startsWith('/'));
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(afPaths.has(link.split('#')[0]), link).toBe(true);
  });

  it('keeps the brand name and tagline right', () => {
    const all = [...strings(copyAf), ...strings(commerceAf), ...strings(catalogueAf), ...strings(ui('af'))];
    expect(all.filter((s) => /Joe|Jo's/.test(s))).toEqual([]);
    expect(copyAf.global.tagline).toBe('Die beste slaap vir groot mense.');
  });

  it('shows the owner-approved trial and warranty in Afrikaans, warranty for the mattress only', () => {
    expect(assurances('set', 'af').map((a) => a.text)).toEqual(['100 dae proeftyd, geen vrae gevra nie', '20 jaar waarborg op die matras']);
    expect(assurances('base', 'af').map((a) => a.id)).toEqual(['trial']);
    const faqs = faqItems('af');
    expect(faqs.map((f) => f.id)).toEqual(faqItems('en').map((f) => f.id));
    expect(faqs.find((f) => f.id === 'trial')?.answer).toContain('100 dae');
  });
});

describe('Afrikaans routes', () => {
  it('maps every page to its counterpart in both directions', () => {
    expect(alternates('/')).toEqual({ en: '/', af: '/af/' });
    expect(alternates('/af')).toEqual({ en: '/', af: '/af/' });
    expect(alternates('/af/ons-storie/')).toEqual({ en: '/our-story', af: '/af/ons-storie' });
    expect(alternates('/beds/big-jos-bed')).toEqual({ en: '/beds/big-jos-bed', af: '/af/beddens/big-jos-bed' });
    expect(alternates('/order/BJ-261006-ABCD')).toEqual({ en: '/order/BJ-261006-ABCD', af: '/af/order/BJ-261006-ABCD' });
    expect(alternates('/af/policies/delivery-and-returns')).toEqual({
      en: '/policies/delivery-and-returns',
      af: '/af/policies/delivery-and-returns',
    });
  });

  it('reads the language from the path', () => {
    expect(localeFromPath('/af/')).toBe('af');
    expect(localeFromPath('/af')).toBe('af');
    expect(localeFromPath('/afrika')).toBe('en');
    expect(localeFromPath('/our-story')).toBe('en');
  });

  it('keeps checkout and order pages under /af', () => {
    expect(path('af', 'checkout')).toBe('/af/checkout');
    expect(path('af', 'checkoutCancelled')).toBe('/af/checkout/cancelled');
  });
});

describe('Afrikaans checkout', () => {
  it('explains form errors in Afrikaans', () => {
    const result = schemas.af.checkout.safeParse({ email: 'nope', postalCode: '12' });
    expect(result.success).toBe(false);
    const errors = fieldErrors(result.error!);
    expect(errors.firstName).toBe('Vul jou voornaam in.');
    expect(errors.postalCode).toBe('Vul ’n poskode van vier syfers in.');
    expect(errors.accept).toBe('Bevestig asseblief om voort te gaan.');
    const enquiry = schemas.af.enquiry.safeParse({});
    expect(fieldErrors(enquiry.error!).message).toBe('Laat weet ons wat jy graag wil weet.');
  });

  it('sends the checkout language to PayFast as custom_str3', () => {
    const { fields } = buildCheckoutForm(
      {
        reference: 'BJ-261006-ABCD',
        amount: '24999.00',
        itemName: 'Big Jo’s Beds Matras en bypassende basis, Flax',
        itemDescription: '160 x 210 cm',
        firstName: 'Anna',
        lastName: 'Botha',
        email: 'anna@example.com',
        returnUrl: 'https://example.com/af/order/BJ-261006-ABCD',
        cancelUrl: 'https://example.com/af/checkout/cancelled',
        notifyUrl: 'https://example.com/api/payfast/itn',
        customStr2: 'set',
        customStr3: 'af',
      },
      { host: 'sandbox.payfast.co.za', ...PAYFAST_SANDBOX },
    );
    const names = fields.map(([k]) => k);
    expect(Object.fromEntries(fields).custom_str3).toBe('af');
    expect(names.indexOf('custom_str3')).toBe(names.indexOf('custom_str2') + 1);
    expect(names.at(-1)).toBe('signature');
  });

  it('emails the customer in Afrikaans and the owner in English', async () => {
    const order = await new MemoryStore().createOrder({
      itemId: 'set', itemName: getItem('set')!.checkoutName, finishId: 'charcoal', finishName: 'Charcoal', quantity: 1,
      unitPriceCents: 2499900, deliveryFeeCents: 0, totalCents: 2499900, firstName: 'Anna', lastName: 'Botha',
      email: 'anna@example.com', phone: '0821234567', street: '12 Kerkstraat', suburb: 'Durbanville',
      postalCode: '7550', city: 'Cape Town', notes: null, commerceMode: 'sandbox',
    });
    const customer = customerConfirmation(order, { OWNER_EMAIL: 'owner@example.com' }, 'af');
    expect(customer.subject).toBe(`Jou Big Jo’s-bestelling ${order.reference}`);
    expect(customer.text).toMatch(/^Hallo Anna,/);
    expect(customer.text).toContain('Matras en bypassende basis — Charcoal');
    expect(customer.text).toContain('Totaal betaal: R24,999');
    expect(customer.text).toContain('Afleweringsadres:');
    expect(customer.replyTo).toBe('owner@example.com');

    const owner = ownerPaidAlert(order, 'owner@example.com', 'af');
    expect(owner.subject).toContain('Mattress and matching base');
    expect(owner.text).toContain('Customer language: Afrikaans');
    expect(ownerPaidAlert(order, 'owner@example.com').text).not.toContain('Customer language');
    expect(
      ownerEnquiryAlert({ name: 'Anna', email: 'a@example.com', phone: null, area: 'Paarl', finish: 'flax', message: 'Hallo' }, 'o@example.com', 'af')
        .text,
    ).toContain('Customer language: Afrikaans');
  });
});
