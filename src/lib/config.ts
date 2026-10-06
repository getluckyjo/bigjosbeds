/**
 * Runtime configuration from environment variables. Read lazily so the same code
 * works at build time (static pages) and in Vercel functions (on-demand pages).
 * See .env.example for every variable.
 */
export type CommerceMode = 'enquiry' | 'sandbox' | 'live';

type Env = Record<string, string | undefined>;

/** PayFast's public sandbox test account (developers.payfast.co.za). Not a secret. */
export const PAYFAST_SANDBOX = {
  merchantId: '10000100',
  merchantKey: '46f0cd694581a',
  passphrase: 'jt7NOE43FZPn',
} as const;

export function commerceMode(env: Env = process.env): CommerceMode {
  const mode = (env.COMMERCE_MODE ?? 'sandbox').trim().toLowerCase();
  if (mode === 'enquiry' || mode === 'sandbox' || mode === 'live') return mode;
  throw new Error(`COMMERCE_MODE must be enquiry, sandbox or live (got "${env.COMMERCE_MODE}")`);
}

export function canBuy(env: Env = process.env): boolean {
  return commerceMode(env) !== 'enquiry';
}

export interface PayFastConfig {
  host: 'www.payfast.co.za' | 'sandbox.payfast.co.za';
  merchantId: string;
  merchantKey: string;
  passphrase: string;
}

export function payfastConfig(env: Env = process.env): PayFastConfig {
  const mode = commerceMode(env);
  if (mode === 'live') {
    const { PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE } = env;
    if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY || !PAYFAST_PASSPHRASE) {
      throw new Error('Live mode needs PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY and PAYFAST_PASSPHRASE');
    }
    return {
      host: 'www.payfast.co.za',
      merchantId: PAYFAST_MERCHANT_ID,
      merchantKey: PAYFAST_MERCHANT_KEY,
      passphrase: PAYFAST_PASSPHRASE,
    };
  }
  // Sandbox never uses the live PAYFAST_MERCHANT_* values, so live credentials can sit in the
  // environment ahead of launch. A private sandbox merchant can be set with PAYFAST_SANDBOX_*.
  return {
    host: 'sandbox.payfast.co.za',
    merchantId: env.PAYFAST_SANDBOX_MERCHANT_ID || PAYFAST_SANDBOX.merchantId,
    merchantKey: env.PAYFAST_SANDBOX_MERCHANT_KEY || PAYFAST_SANDBOX.merchantKey,
    passphrase: env.PAYFAST_SANDBOX_PASSPHRASE || PAYFAST_SANDBOX.passphrase,
  };
}

/** Public base URL for PayFast return/cancel/notify links. Falls back to the request origin. */
export function siteOrigin(requestUrl: URL, env: Env = process.env): string {
  const configured = env.PUBLIC_SITE_URL?.trim();
  return (configured ? new URL(configured).origin : requestUrl.origin).replace(/\/$/, '');
}

export function emailConfig(env: Env = process.env) {
  return {
    apiKey: env.RESEND_API_KEY || null,
    from: env.EMAIL_FROM || null,
    ownerEmail: env.OWNER_EMAIL || null,
  };
}
