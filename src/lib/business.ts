import data from '../config/business.json';

/** Owner-supplied business details (src/config/business.json); null until supplied. */
export interface Business {
  tradingName: string;
  legalName: string | null;
  registrationNumber: string | null;
  physicalAddress: string | null;
  email: string | null;
  phone: string | null;
  /** Johannes's WhatsApp number in display format, e.g. "+27 60 961 5091". */
  whatsapp: string | null;
  vatRegistered: boolean;
  vatNumber: string | null;
}

export const business = data as unknown as Business;

/** wa.me link to the business WhatsApp, optionally with a prefilled message; null when no number is set. */
export function whatsappHref(text?: string): string | null {
  if (!business.whatsapp) return null;
  const digits = business.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
