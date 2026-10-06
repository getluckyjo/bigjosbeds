import { describe, expect, it } from 'vitest';
import { getItem, items, parseSelection, selectionQuery, selectionTotalCents } from '../../src/lib/catalogue';
import { commerceMode, payfastConfig, siteOrigin } from '../../src/lib/config';
import { isInDeliveryArea } from '../../src/lib/delivery';
import { customerConfirmation, ownerPaidAlert } from '../../src/lib/email';
import { fill, formatZar, fromPayFastAmount, toPayFastAmount } from '../../src/lib/money';
import { MemoryStore, newReference, tokenMatches } from '../../src/lib/orders';
import { checkoutSchema, enquirySchema, fieldErrors } from '../../src/lib/validation';

describe('catalogue and pricing', () => {
  it('has the approved launch prices', () => {
    expect(getItem('set')?.priceCents).toBe(2499900);
    expect(getItem('mattress')?.priceCents).toBe(1999900);
    expect(getItem('base')?.priceCents).toBe(599900);
    expect(items.every((i) => Number.isInteger(i.priceCents))).toBe(true);
  });

  it('prices a selection from the catalogue only', () => {
    const s = parseSelection({ item: 'set', finish: 'charcoal', qty: '2', price: '1' } as never)!;
    expect(selectionTotalCents(s)).toBe(4999800);
    expect(selectionQuery(s)).toBe('item=set&finish=charcoal&qty=2');
  });

  it.each([
    [{ item: 'set', finish: 'flax', qty: '0' }],
    [{ item: 'set', finish: 'flax', qty: '4' }],
    [{ item: 'set', finish: 'flax', qty: '1.5' }],
    [{ item: 'headboard', finish: 'flax', qty: '1' }],
    [{ item: 'set', finish: 'pink', qty: '1' }],
    [{}],
  ])('rejects %j', (input) => expect(parseSelection(input)).toBeNull());
});

describe('money', () => {
  it('formats rand', () => {
    expect(formatZar(2499900)).toBe('R24,999');
    expect(formatZar(599950)).toBe('R5,999.50');
    expect(toPayFastAmount(2499900)).toBe('24999.00');
    expect(fromPayFastAmount('24999.00')).toBe(2499900);
    expect(fromPayFastAmount('24,999')).toBeNaN();
    expect(fill('Pay {amount} now {x}', { amount: 'R1' })).toBe('Pay R1 now {x}');
  });
});

describe('Cape Town delivery area', () => {
  it.each(['8001', '8005', '7700', '7925', '7441', '7530', '7130', '7975', '7349', ' 7800 '])('%s is in the area', (code) =>
    expect(isInDeliveryArea(code)).toBe(true),
  );
  it.each(['7600', '7646', '2196', '0001', '770', 'abcd', ''])('%s is outside the area', (code) =>
    expect(isInDeliveryArea(code)).toBe(false),
  );
});

describe('config', () => {
  it('defaults to sandbox with the public test account', () => {
    expect(commerceMode({})).toBe('sandbox');
    expect(payfastConfig({}).host).toBe('sandbox.payfast.co.za');
    expect(payfastConfig({}).merchantId).toBe('10000100');
  });

  it('refuses live mode without real credentials', () => {
    expect(() => payfastConfig({ COMMERCE_MODE: 'live' })).toThrow(/PAYFAST_MERCHANT_ID/);
    const live = payfastConfig({
      COMMERCE_MODE: 'live',
      PAYFAST_MERCHANT_ID: '123',
      PAYFAST_MERCHANT_KEY: 'k',
      PAYFAST_PASSPHRASE: 'p',
    });
    expect(live.host).toBe('www.payfast.co.za');
  });

  it('never sends live credentials to the sandbox', () => {
    const live = { PAYFAST_MERCHANT_ID: '123', PAYFAST_MERCHANT_KEY: 'k', PAYFAST_PASSPHRASE: 'p' };
    const sandbox = payfastConfig({ COMMERCE_MODE: 'sandbox', ...live });
    expect(sandbox.host).toBe('sandbox.payfast.co.za');
    expect(sandbox.merchantId).toBe('10000100');
    expect(sandbox.passphrase).not.toBe('p');
    expect(payfastConfig({ ...live, PAYFAST_SANDBOX_MERCHANT_ID: '999' }).merchantId).toBe('999');
  });

  it('rejects an unknown mode and prefers the configured site URL', () => {
    expect(() => commerceMode({ COMMERCE_MODE: 'yes' })).toThrow();
    expect(siteOrigin(new URL('http://localhost:4321/x'), { PUBLIC_SITE_URL: 'https://bigjos.example/' })).toBe('https://bigjos.example');
    expect(siteOrigin(new URL('http://localhost:4321/x'), {})).toBe('http://localhost:4321');
  });
});

describe('validation', () => {
  const valid = {
    firstName: 'Thabo',
    lastName: 'Mokoena',
    email: 'thabo@example.com',
    phone: '082 123 4567',
    street: '40 Strubens Road',
    suburb: 'Mowbray',
    postalCode: '7700',
    notes: '',
    accept: 'yes',
  };

  it('accepts a complete checkout form', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true);
  });

  it('explains every missing field in plain language', () => {
    const result = checkoutSchema.safeParse({ email: 'nope' });
    expect(result.success).toBe(false);
    const errors = fieldErrors(result.error!);
    expect(errors.firstName).toBe('Enter your first name.');
    expect(errors.email).toMatch(/email address/);
    expect(errors.postalCode).toMatch(/four-digit/);
    expect(errors.accept).toBe('Please confirm to continue.');
  });

  it('falls back to "unsure" for an unknown enquiry finish', () => {
    const result = enquirySchema.safeParse({ name: 'Sam', email: 'sam@example.com', area: 'Paarl', finish: 'pink', message: 'Hi' });
    expect(result.success && result.data.finish).toBe('unsure');
  });
});

describe('orders and emails', () => {
  it('creates readable references and checks status tokens', async () => {
    expect(newReference(new Date('2026-10-06T10:00:00Z'))).toMatch(/^BJ-261006-[A-HJ-NP-Z2-9]{4}$/);
    const store = new MemoryStore();
    const order = await store.createOrder({
      itemId: 'set', itemName: 'Mattress and matching base', finishId: 'flax', finishName: 'Flax', quantity: 1,
      unitPriceCents: 2499900, deliveryFeeCents: 0, totalCents: 2499900, firstName: 'Thabo', lastName: 'Mokoena',
      email: 'thabo@example.com', phone: '0821234567', street: '40 Strubens Road', suburb: 'Mowbray',
      postalCode: '7700', city: 'Cape Town', notes: null, commerceMode: 'sandbox',
    });
    expect(tokenMatches(order, order.statusToken)).toBe(true);
    expect(tokenMatches(order, 'wrong')).toBe(false);
    expect(tokenMatches(order, null)).toBe(false);

    const confirmation = customerConfirmation(order);
    expect(confirmation.subject).toBe(`Your Big Jo’s order ${order.reference}`);
    expect(confirmation.text).toContain('R24,999');
    expect(confirmation.text).toContain('40 Strubens Road');
    expect(confirmation.replyTo).toBeUndefined();
    expect(customerConfirmation(order, { OWNER_EMAIL: 'owner@example.com' }).replyTo).toBe('owner@example.com');
    expect(ownerPaidAlert(order, 'owner@example.com').text).toContain('SANDBOX TEST');
  });
});
