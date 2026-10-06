import { copyFor } from '../i18n/content';
import type { Locale } from '../i18n/locales';
import { path, policyPath } from '../i18n/routes';

/** Main navigation: labels from the copy deck, routes from docs/04-website-blueprint.md. */
export function navFor(locale: Locale) {
  const [bed, story, faqs, contact] = copyFor(locale).global.navigation;
  return [
    { label: bed, href: path(locale, 'product') },
    { label: story, href: path(locale, 'story') },
    { label: faqs, href: path(locale, 'faqs') },
    { label: contact, href: path(locale, 'contact') },
  ];
}

interface PolicyModule {
  frontmatter: { title: string; order?: number; updated?: string };
  Content: any;
}

/** Owner-approved policies: English in src/content/policies/, translations in src/content/policies/<locale>/. */
const englishFiles = import.meta.glob<PolicyModule>('../content/policies/*.md', { eager: true });
const afrikaansFiles = import.meta.glob<PolicyModule>('../content/policies/af/*.md', { eager: true });

const slugOf = (file: string) => file.split('/').pop()!.replace(/\.md$/, '');
const bySlug = (files: Record<string, PolicyModule>) =>
  new Map(Object.entries(files).map(([file, mod]) => [slugOf(file), mod]));

const published: Record<Locale, Map<string, PolicyModule>> = { en: bySlug(englishFiles), af: bySlug(afrikaansFiles) };

export interface Policy {
  slug: string;
  title: string;
  order: number;
  updated?: string;
  Content: any;
  /** The language the text is in: English until the owner approves a translation. */
  textLocale: Locale;
}

/**
 * Every published English policy, in the given language where an approved translation exists
 * and in English otherwise (the page then says so). Never a draft.
 */
export function policiesFor(locale: Locale): Policy[] {
  return [...published.en.keys()]
    .map((slug) => {
      const translated = published[locale].get(slug);
      const mod = translated ?? published.en.get(slug)!;
      return {
        slug,
        title: mod.frontmatter.title,
        order: mod.frontmatter.order ?? 99,
        updated: mod.frontmatter.updated,
        Content: mod.Content,
        textLocale: translated ? locale : ('en' as Locale),
      };
    })
    .sort((a, b) => a.order - b.order);
}

/** Whether the owner has approved the policy in every language. */
export function policyTranslated(slug: string): boolean {
  return Object.values(published).every((files) => files.has(slug));
}

export function policyHref(slug: string, locale: Locale = 'en'): string | null {
  return published.en.has(slug) ? policyPath(locale, slug) : null;
}
