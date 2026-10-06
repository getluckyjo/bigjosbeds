/**
 * Transactional email through Resend. Email is best-effort: a failure is logged and
 * never undoes a recorded order or enquiry. Without RESEND_API_KEY, messages are
 * logged instead of sent (local development).
 */
import { Resend } from 'resend';
import commerce from '../content/commerce.json';
import { commerceFor } from '../i18n/content';
import { localeName, type Locale } from '../i18n/locales';
import { ui } from '../i18n/ui';
import { getFinish, getItem } from './catalogue';
import { emailConfig } from './config';
import { fill, formatZar } from './money';
import type { NewEnquiry, Order } from './orders';

export interface Message {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export type Sender = (message: Message) => Promise<void>;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function textToHtml(text: string): string {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#292C27">${text
    .split('\n\n')
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('')}</div>`;
}

export function resendSender(env: Record<string, string | undefined> = process.env): Sender {
  const cfg = emailConfig(env);
  if (!cfg.apiKey || !cfg.from) {
    return async (message) => {
      console.info(`[email not sent: RESEND_API_KEY/EMAIL_FROM unset] to=${message.to} subject="${message.subject}"`);
    };
  }
  const resend = new Resend(cfg.apiKey);
  return async (message) => {
    const { error } = await resend.emails.send({
      from: cfg.from!,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: textToHtml(message.text),
      replyTo: message.replyTo,
    });
    if (error) throw new Error(`Resend: ${error.message}`);
  };
}

/** Item and finish names in the customer's language; owner emails use the English names stored on the order. */
function orderLines(order: Order, locale: Locale = 'en'): string {
  const e = ui(locale).email;
  const itemName = locale === 'en' ? order.itemName : (getItem(order.itemId, locale)?.checkoutName ?? order.itemName);
  const finishName = locale === 'en' ? order.finishName : (getFinish(order.finishId, locale)?.name ?? order.finishName);
  const lines = [
    `${itemName} — ${finishName}`,
    fill(e.quantity, { qty: String(order.quantity) }),
    fill(e.totalPaid, { amount: formatZar(order.totalCents) }),
    fill(e.delivery, { fee: order.deliveryFeeCents === 0 ? e.deliveryIncluded : formatZar(order.deliveryFeeCents) }),
  ];
  return lines.join('\n');
}

/** A line telling the owner to reply in the customer's language, when it isn't English. */
const languageLine = (locale: Locale) => (locale === 'en' ? [] : [`Customer language: ${localeName[locale]}`]);

function address(order: Order): string {
  return [order.street, order.suburb, `${order.city} ${order.postalCode}`].join('\n');
}

/** The customer's confirmation, in the language they checked out in. */
export function customerConfirmation(order: Order, env: NodeJS.ProcessEnv = process.env, locale: Locale = 'en'): Message {
  const e = commerceFor(locale).email;
  const labels = ui(locale).email;
  return {
    to: order.email,
    // Customer replies go to the owner, not the no-reply sending address.
    replyTo: emailConfig(env).ownerEmail ?? undefined,
    subject: fill(e.customerSubject, { reference: order.reference }),
    text: [
      fill(labels.greeting, { name: order.firstName }),
      e.customerIntro,
      `${fill(labels.order, { reference: order.reference })}\n${orderLines(order, locale)}`,
      `${labels.address}\n${address(order)}`,
      e.customerNext,
      labels.signOff,
    ].join('\n\n'),
  };
}

export function ownerPaidAlert(order: Order, ownerEmail: string, locale: Locale = 'en'): Message {
  return {
    to: ownerEmail,
    replyTo: order.email,
    subject: fill(commerce.email.ownerSubject, {
      reference: order.reference,
      item: order.itemName,
      finish: order.finishName,
    }),
    text: [
      `Paid order ${order.reference}${order.commerceMode === 'sandbox' ? ' (SANDBOX TEST — no real payment)' : ''}`,
      orderLines(order),
      `PayFast payment ID: ${order.payfastPaymentId ?? 'n/a'}`,
      `Customer: ${order.firstName} ${order.lastName}\n${order.email}\n${order.phone}`,
      ...languageLine(locale),
      `Deliver to:\n${address(order)}`,
      `Access notes: ${order.notes || 'none'}`,
    ].join('\n\n'),
  };
}

export function ownerReviewAlert(order: Order, reasons: string[], ownerEmail: string): Message {
  return {
    to: ownerEmail,
    subject: fill(commerce.email.ownerReviewSubject, { reference: order.reference }),
    text: [
      `A PayFast notification for order ${order.reference} (${formatZar(order.totalCents)}) did not pass every check, so the order was NOT marked as paid.`,
      `Failed checks: ${reasons.join(', ')}`,
      'Check the transaction in the PayFast dashboard before making the bed. If the payment is genuine, mark the order as paid in Supabase.',
      `Customer: ${order.firstName} ${order.lastName}, ${order.email}, ${order.phone}`,
    ].join('\n\n'),
  };
}

export function ownerEnquiryAlert(enquiry: NewEnquiry, ownerEmail: string, locale: Locale = 'en'): Message {
  return {
    to: ownerEmail,
    replyTo: enquiry.email,
    subject: fill(commerce.email.enquirySubject, { name: enquiry.name }),
    text: [
      `From: ${enquiry.name} <${enquiry.email}>${enquiry.phone ? `, ${enquiry.phone}` : ''}`,
      `Area: ${enquiry.area}`,
      `Finish: ${enquiry.finish}`,
      ...languageLine(locale),
      enquiry.message,
    ].join('\n\n'),
  };
}

/** Send without throwing; returns whether it went out. */
export async function trySend(send: Sender, message: Message): Promise<boolean> {
  try {
    await send(message);
    return true;
  } catch (error) {
    console.error(`[email failed] to=${message.to} subject="${message.subject}":`, error);
    return false;
  }
}
