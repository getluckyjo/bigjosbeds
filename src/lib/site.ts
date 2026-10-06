import copy from '../content/copy.json';

const [bed, story, faqs, contact] = copy.global.navigation;

/** Main navigation: labels from the copy deck, routes from docs/04-website-blueprint.md. */
export const nav = [
  { label: bed, href: '/beds/big-jos-bed' },
  { label: story, href: '/our-story' },
  { label: faqs, href: '/faqs' },
  { label: contact, href: '/contact' },
];

export const PRODUCT_PATH = '/beds/big-jos-bed';

/** Policy pages that exist as Markdown files in src/content/policies/. */
const policyFiles = import.meta.glob<{ frontmatter: { title: string; order?: number } }>(
  '../content/policies/*.md',
  { eager: true },
);

export const policies = Object.entries(policyFiles)
  .map(([file, mod]) => ({
    slug: file.split('/').pop()!.replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    order: mod.frontmatter.order ?? 99,
  }))
  .sort((a, b) => a.order - b.order);

export function policyHref(slug: string): string | null {
  return policies.some((p) => p.slug === slug) ? `/policies/${slug}` : null;
}
