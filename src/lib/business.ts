import data from '../config/business.json';

/** Owner-supplied business details (src/config/business.json); null until supplied. */
export interface Business {
  tradingName: string;
  legalName: string | null;
  registrationNumber: string | null;
  physicalAddress: string | null;
  email: string | null;
  phone: string | null;
  vatRegistered: boolean;
  vatNumber: string | null;
}

export const business = data as unknown as Business;
