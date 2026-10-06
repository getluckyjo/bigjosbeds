/**
 * Interface text that isn't in the copy deck (copy.json) or the commerce copy (commerce.json):
 * labels, landmarks, table headings, validation messages and email labels.
 * The English is unchanged from the original pages. The Afrikaans is a draft for owner review.
 */
import type { Locale } from './locales';

const en = {
  skipLink: 'Skip to content',
  homeLink: 'Big Jo’s Beds home',
  menu: 'Menu',
  mainNav: 'Main navigation',
  mobileNav: 'Mobile navigation',
  footerNav: 'Footer',
  /** Label for the link to the other language, written in that language. */
  switchTo: 'Afrikaans',
  switchToShort: 'AF',
  paymentsByPayFast: 'Payments are processed by PayFast.',

  quickFacts: 'Quick facts',
  buyingDetails: 'Buying details',
  homeFaqTitle: 'A few practical questions.',
  allFaqs: 'All FAQs',

  breadcrumb: 'Breadcrumb',
  breadcrumbHome: 'Home',
  breadcrumbBed: 'The bed',
  priceFor: ' for {item}',
  selectedFinish: 'Selected finish:',
  specs: {
    size: 'Width × length',
    depth: 'Approximate depth',
    feel: 'Feel',
    feelValue: 'Firm',
    ratedFor: 'Rated for',
    ratedForValue: 'Up to {kg} kg per person',
    madeIn: 'Made in',
    madeInValue: 'Cape Town',
  },
  layers: { layer: 'Layer', thickness: 'Thickness', material: 'Material' },

  faqsTitle: 'FAQs | Big Jo’s Beds',
  askQuestion: 'Ask us a question',

  honeypot: 'Leave this empty',
  checkDetails: 'Please check the highlighted details.',
  confirmation: 'Confirmation',
  askAboutBed: 'Ask about the bed',
  quantity: 'Quantity: {qty}',
  cancelledSelection: '{item}, {finish}. Quantity {qty}.',

  askUs: 'Ask us',
  meetTheBed: 'Meet the bed',
  delivery: 'Delivery',
  total: 'Total',

  policyUpdated: 'Last updated {date}',
  /** Shown on a policy page whose translation the owner hasn't approved yet. */
  policyOnlyInEnglish: '',

  founderPhotoAlt: 'Portrait of Johannes “Big Jo” le Roux, founder of Big Jo’s Beds',

  payfast: {
    itemName: 'Big Jo’s Beds {item}, {finish}',
    itemDescription: '160 x 210 cm, {finish} finish. Quantity {qty}. Made to order in Cape Town. Delivery to {suburb}.',
  },

  email: {
    greeting: 'Hi {name},',
    order: 'Order {reference}',
    quantity: 'Quantity: {qty}',
    totalPaid: 'Total paid: {amount}',
    delivery: 'Delivery: {fee}',
    deliveryIncluded: 'included',
    address: 'Delivery address:',
    signOff: 'Big Jo’s Beds. Made to order in Cape Town.',
  },

  validation: {
    firstName: 'Enter your first name.',
    lastName: 'Enter your last name.',
    email: 'Enter an email address like name@example.com.',
    phone: 'Enter a phone number we can reach you on.',
    street: 'Enter the street address.',
    suburb: 'Enter the suburb.',
    postalCode: 'Enter a four-digit postal code.',
    accept: 'Please confirm to continue.',
    name: 'Enter your name.',
    area: 'Tell us your town or suburb.',
    message: 'Tell us what you’d like to know.',
  },

  notFound: {
    seoTitle: 'Page not found | Big Jo’s Beds',
    title: 'We couldn’t find that page.',
    body: 'The link may be out of date. The bed is still here.',
    home: 'Home',
  },
};

export type Ui = typeof en;

const af: Ui = {
  skipLink: 'Gaan direk na die inhoud',
  homeLink: 'Big Jo’s Beds tuisblad',
  menu: 'Kieslys',
  mainNav: 'Hoofnavigasie',
  mobileNav: 'Mobiele navigasie',
  footerNav: 'Voetskrif',
  switchTo: 'English',
  switchToShort: 'EN',
  paymentsByPayFast: 'Betalings word deur PayFast verwerk.',

  quickFacts: 'Vinnige feite',
  buyingDetails: 'Koopbesonderhede',
  homeFaqTitle: '’n Paar praktiese vrae.',
  allFaqs: 'Alle vrae',

  breadcrumb: 'Broodkrummels',
  breadcrumbHome: 'Tuis',
  breadcrumbBed: 'Die bed',
  priceFor: ' vir {item}',
  selectedFinish: 'Gekose afwerking:',
  specs: {
    size: 'Breedte × lengte',
    depth: 'Diepte (ongeveer)',
    feel: 'Gevoel',
    feelValue: 'Ferm',
    ratedFor: 'Gegradeer vir',
    ratedForValue: 'Tot {kg} kg per persoon',
    madeIn: 'Gemaak in',
    madeInValue: 'Kaapstad',
  },
  layers: { layer: 'Laag', thickness: 'Dikte', material: 'Materiaal' },

  faqsTitle: 'Vrae oor die ekstra lang bed | Big Jo’s Beds',
  askQuestion: 'Vra ons ’n vraag',

  honeypot: 'Los hierdie leeg',
  checkDetails: 'Gaan asseblief die gemerkte besonderhede na.',
  confirmation: 'Bevestiging',
  askAboutBed: 'Vra oor die bed',
  quantity: 'Hoeveelheid: {qty}',
  cancelledSelection: '{item}, {finish}. Hoeveelheid: {qty}.',

  askUs: 'Vra ons',
  meetTheBed: 'Leer die bed ken',
  delivery: 'Aflewering',
  total: 'Totaal',

  policyUpdated: 'Laas bygewerk op {date}',
  policyOnlyInEnglish: 'Hierdie beleid is tans net in Engels beskikbaar.',

  founderPhotoAlt: 'Portret van Johannes “Big Jo” le Roux, stigter van Big Jo’s Beds',

  payfast: {
    itemName: 'Big Jo’s Beds {item}, {finish}',
    itemDescription: '160 x 210 cm, {finish}-afwerking. Hoeveelheid {qty}. Op bestelling gemaak in Kaapstad. Aflewering na {suburb}.',
  },

  email: {
    greeting: 'Hallo {name},',
    order: 'Bestelling {reference}',
    quantity: 'Hoeveelheid: {qty}',
    totalPaid: 'Totaal betaal: {amount}',
    delivery: 'Aflewering: {fee}',
    deliveryIncluded: 'ingesluit',
    address: 'Afleweringsadres:',
    signOff: 'Big Jo’s Beds. Op bestelling gemaak in Kaapstad.',
  },

  validation: {
    firstName: 'Vul jou voornaam in.',
    lastName: 'Vul jou van in.',
    email: 'Vul ’n e-posadres in, soos naam@voorbeeld.co.za.',
    phone: 'Vul ’n foonnommer in waarop ons jou kan bereik.',
    street: 'Vul die straatadres in.',
    suburb: 'Vul die voorstad in.',
    postalCode: 'Vul ’n poskode van vier syfers in.',
    accept: 'Bevestig asseblief om voort te gaan.',
    name: 'Vul jou naam in.',
    area: 'Laat weet ons in watter dorp of voorstad jy is.',
    message: 'Laat weet ons wat jy graag wil weet.',
  },

  notFound: {
    seoTitle: 'Bladsy nie gevind nie | Big Jo’s Beds',
    title: 'Ons kon nie daardie bladsy kry nie.',
    body: 'Die skakel is dalk verouderd. Die bed is nog hier.',
    home: 'Tuis',
  },
};

const strings: Record<Locale, Ui> = { en, af };

export function ui(locale: Locale): Ui {
  return strings[locale];
}
