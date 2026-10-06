/**
 * Server-side work for the on-demand pages: the contact and checkout form posts, the PayFast
 * hand-off and the order lookup. Each language has its own route file; both call these, then
 * set the status or redirect themselves (only a page can), and pass the result to the view.
 */
import type { Locale } from '../i18n/locales';
import { orderPath, path, payPath } from '../i18n/routes';
import { ui } from '../i18n/ui';
import { getFinish, getItem, parseSelection, selectionQuery, selectionTotalCents, type Selection } from './catalogue';
import { commerceMode, emailConfig, payfastConfig, siteOrigin } from './config';
import { deliveryAreaName, deliveryFeeCents, isInDeliveryArea, normalisePostalCode } from './delivery';
import { ownerEnquiryAlert, resendSender, trySend } from './email';
import { fill, toPayFastAmount } from './money';
import { getStore, tokenMatches, type Order } from './orders';
import { buildCheckoutForm, type Pair } from './payfast';
import { fieldErrors, formValues, schemas, type FieldErrors } from './validation';

const FINISH_CHOICES = ['flax', 'charcoal', 'unsure'];

export interface ContactState {
  values: Record<string, string>;
  errors: FieldErrors;
  result: 'sent' | 'failed' | null;
  status?: number;
}

export async function handleContact(request: Request, url: URL, locale: Locale): Promise<ContactState> {
  const state: ContactState = {
    values: { finish: url.searchParams.get('finish') ?? 'unsure', area: url.searchParams.get('area') ?? '' },
    errors: {},
    result: null,
  };
  if (request.method === 'POST') {
    const form = await request.formData();
    state.values = formValues(form);
    const parsed = schemas[locale].enquiry.safeParse(state.values);
    if (state.values.website) {
      // Honeypot filled in: treat as spam, but don't tell the bot.
      state.result = 'sent';
      state.values = { finish: 'unsure', area: '' };
    } else if (!parsed.success) {
      state.errors = fieldErrors(parsed.error);
      state.status = 422;
    } else {
      try {
        const enquiry = { ...parsed.data, phone: parsed.data.phone || null };
        await getStore().saveEnquiry(enquiry);
        const { ownerEmail } = emailConfig();
        if (ownerEmail) await trySend(resendSender(), ownerEnquiryAlert(enquiry, ownerEmail, locale));
        state.result = 'sent';
        state.values = { finish: 'unsure', area: '' };
      } catch (error) {
        console.error('[contact] enquiry not saved', error);
        state.result = 'failed';
        state.status = 500;
      }
    }
  }
  if (!FINISH_CHOICES.includes(state.values.finish)) state.values.finish = 'unsure';
  return state;
}

export interface CheckoutState {
  selection: Selection | null;
  values: Record<string, string>;
  errors: FieldErrors;
  outOfArea: boolean;
  startError: boolean;
  status?: number;
  /** Where to send the browser (303) once the order exists. */
  redirect?: string;
}

export async function handleCheckout(request: Request, url: URL, locale: Locale): Promise<CheckoutState> {
  const state: CheckoutState = {
    selection: parseSelection(
      { item: url.searchParams.get('item'), finish: url.searchParams.get('finish'), qty: url.searchParams.get('qty') ?? '1' },
      locale,
    ),
    values: {},
    errors: {},
    outOfArea: false,
    startError: false,
  };
  const mode = commerceMode();
  if (request.method !== 'POST' || mode === 'enquiry') return state;

  const form = await request.formData();
  const values = (state.values = formValues(form));
  const selection = (state.selection = parseSelection({ item: values.item, finish: values.finish, qty: values.qty }, locale));
  if (values.website) {
    // Honeypot field filled in: almost certainly a bot. Don't create an order.
    state.startError = true;
  } else if (selection) {
    const parsed = schemas[locale].checkout.safeParse(values);
    if (!parsed.success) {
      state.errors = fieldErrors(parsed.error);
    } else if (!isInDeliveryArea(parsed.data.postalCode)) {
      state.outOfArea = true;
    } else {
      const d = parsed.data;
      try {
        const order = await getStore().createOrder({
          itemId: selection.item.id,
          // Orders keep the English names: they're what the owner works from.
          itemName: getItem(selection.item.id)!.checkoutName,
          finishId: selection.finish.id,
          finishName: getFinish(selection.finish.id)!.name,
          quantity: selection.quantity,
          unitPriceCents: selection.item.priceCents,
          deliveryFeeCents,
          totalCents: selectionTotalCents(selection, deliveryFeeCents),
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          phone: d.phone,
          street: d.street,
          suburb: d.suburb,
          postalCode: normalisePostalCode(d.postalCode)!,
          city: deliveryAreaName,
          notes: d.notes || null,
          commerceMode: mode === 'live' ? 'live' : 'sandbox',
        });
        state.redirect = `${payPath(locale, order.reference)}?t=${encodeURIComponent(order.statusToken)}`;
        return state;
      } catch (error) {
        console.error('[checkout] could not create order', error);
        state.startError = true;
      }
    }
  }
  if (Object.keys(state.errors).length || state.outOfArea || state.startError) state.status = 422;
  return state;
}

export type PayState =
  | { kind: 'missing' }
  | { kind: 'redirect'; to: string }
  | { kind: 'form'; reference: string; action: string; fields: Pair[] };

/** The signed PayFast form for an unpaid order, with return and cancel pages in the customer's language. */
export async function preparePayment(reference: string, token: string | null, url: URL, locale: Locale): Promise<PayState> {
  const order = await getStore().getByReference(reference);
  if (!order || !tokenMatches(order, token)) return { kind: 'missing' };
  const orderUrl = `${orderPath(locale, order.reference)}?t=${encodeURIComponent(order.statusToken)}`;
  if (order.status === 'paid' || order.status === 'needs_review') return { kind: 'redirect', to: orderUrl };

  const t = ui(locale).payfast;
  const item = getItem(order.itemId, locale)?.checkoutName ?? order.itemName;
  const finish = getFinish(order.finishId, locale)?.name ?? order.finishName;
  const origin = siteOrigin(url);
  const retry = selectionQuery({ item: { id: order.itemId }, finish: { id: order.finishId }, quantity: order.quantity });
  const { action, fields } = buildCheckoutForm(
    {
      reference: order.reference,
      amount: toPayFastAmount(order.totalCents),
      itemName: fill(t.itemName, { item, finish }),
      itemDescription: fill(t.itemDescription, { finish, qty: String(order.quantity), suburb: order.suburb }),
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      cellNumber: order.phone,
      returnUrl: `${origin}${orderUrl}`,
      cancelUrl: `${origin}${path(locale, 'checkoutCancelled')}?${retry}`,
      notifyUrl: `${origin}/api/payfast/itn`,
      customInt1: order.quantity,
      customStr1: order.finishId,
      customStr2: order.itemId,
      customStr3: locale,
    },
    payfastConfig(),
  );
  return { kind: 'form', reference: order.reference, action, fields };
}

/** The order for a status page, only with its matching token. */
export async function findOrder(reference: string, token: string | null): Promise<Order | null> {
  try {
    const found = await getStore().getByReference(reference);
    return found && tokenMatches(found, token) ? found : null;
  } catch (error) {
    console.error('[order] lookup failed', error);
    return null;
  }
}
