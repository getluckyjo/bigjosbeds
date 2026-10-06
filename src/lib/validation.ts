import { z } from 'zod';
import { isInDeliveryArea, normalisePostalCode } from './delivery';
import { locales, type Locale } from '../i18n/locales';
import { ui, type Ui } from '../i18n/ui';

type Messages = Ui['validation'];

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, message: string) => text(max).min(1, message);

/** Missing fields count as empty, so the friendly "Enter your …" messages always apply. */
function form<T extends z.ZodRawShape>(shape: T) {
  const keys = Object.keys(shape);
  return z.preprocess((input) => {
    const values: Record<string, unknown> = input && typeof input === 'object' ? { ...input } : {};
    for (const key of keys) values[key] ??= '';
    return values;
  }, z.object(shape));
}

function checkoutSchemaFor(m: Messages) {
  return form({
    firstName: required(100, m.firstName),
    lastName: required(100, m.lastName),
    email: text(254).pipe(z.email(m.email)),
    phone: text(30).refine((v) => /^\+?[\d\s()-]{9,}$/.test(v), m.phone),
    street: required(200, m.street),
    suburb: required(100, m.suburb),
    postalCode: text(10).refine((v) => normalisePostalCode(v) !== null, m.postalCode),
    notes: text(1000).optional().default(''),
    accept: z.literal('yes', { error: m.accept }),
  });
}

function enquirySchemaFor(m: Messages) {
  return form({
    name: required(100, m.name),
    email: text(254).pipe(z.email(m.email)),
    phone: text(30).optional().default(''),
    area: required(100, m.area),
    finish: z.enum(['flax', 'charcoal', 'unsure']).catch('unsure'),
    message: required(3000, m.message),
  });
}

/** Form schemas with error messages in each language. */
export const schemas = Object.fromEntries(
  locales.map((locale) => {
    const m = ui(locale).validation;
    return [locale, { checkout: checkoutSchemaFor(m), enquiry: enquirySchemaFor(m) }];
  }),
) as Record<Locale, { checkout: ReturnType<typeof checkoutSchemaFor>; enquiry: ReturnType<typeof enquirySchemaFor> }>;

export const checkoutSchema = schemas.en.checkout;

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const enquirySchema = schemas.en.enquiry;

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type FieldErrors = Record<string, string>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    out[key] ??= issue.message;
  }
  return out;
}

/** Form values as plain strings, for re-rendering after an error. */
export function formValues(form: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of form.entries()) if (typeof value === 'string') values[key] = value;
  return values;
}

export function deliverable(postalCode: string): boolean {
  return isInDeliveryArea(postalCode);
}
