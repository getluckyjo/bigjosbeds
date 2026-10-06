import { z } from 'zod';
import { isInDeliveryArea, normalisePostalCode } from './delivery';

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, message: string) => text(max).min(1, message);

export const checkoutSchema = z.object({
  firstName: required(100, 'Enter your first name.'),
  lastName: required(100, 'Enter your last name.'),
  email: text(254).pipe(z.email('Enter an email address like name@example.com.')),
  phone: text(30).refine((v) => /^\+?[\d\s()-]{9,}$/.test(v), 'Enter a phone number we can reach you on.'),
  street: required(200, 'Enter the street address.'),
  suburb: required(100, 'Enter the suburb.'),
  postalCode: text(10).refine((v) => normalisePostalCode(v) !== null, 'Enter a four-digit postal code.'),
  notes: text(1000).optional().default(''),
  accept: z.literal('yes', { error: 'Please confirm to continue.' }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const enquirySchema = z.object({
  name: required(100, 'Enter your name.'),
  email: text(254).pipe(z.email('Enter an email address like name@example.com.')),
  phone: text(30).optional().default(''),
  area: required(100, 'Tell us your town or suburb.'),
  finish: z.enum(['flax', 'charcoal', 'unsure']).catch('unsure'),
  message: required(3000, 'Tell us what you’d like to know.'),
});

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
