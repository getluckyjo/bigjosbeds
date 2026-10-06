import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/beds/big-jos-bed', '/our-story', '/faqs', '/contact', '/checkout?item=set&finish=flax&qty=1'];
const WIDTHS = [320, 390, 768, 1440];

async function noHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
}

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`${path} fits 320–1440px, has one h1 and loads cleanly`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      const failed: string[] = [];
      page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        expect(await noHorizontalOverflow(page), `overflow at ${width}px`).toBe(true);
      }
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByText('Test shop: checkout uses the PayFast sandbox')).toBeVisible();
      // Every image has alt text (empty only when decorative).
      expect(await page.locator('img:not([alt])').count()).toBe(0);
      expect(errors).toEqual([]);
      expect(failed).toEqual([]);
    });

    test(`${path} has no serious accessibility violations (desktop and mobile)`, async ({ page }) => {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      }
    });
  }

  test('only local assets load (no third-party requests)', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (r) => !r.url().startsWith('http://127.0.0.1') && !r.url().startsWith('data:') && external.push(r.url()));
    for (const path of PAGES) await page.goto(path);
    expect(external).toEqual([]);
  });
});

test.describe('product configurator', () => {
  test('finish selection keeps image, name, URL and enquiry links in sync', async ({ page }) => {
    await page.goto('/beds/big-jos-bed');
    const flaxImage = page.locator('[data-show-finish="flax"] img').first();
    const charcoalImage = page.locator('[data-show-finish="charcoal"] img').first();
    await expect(flaxImage).toBeVisible();
    await expect(charcoalImage).toBeHidden();

    await page.getByLabel('Charcoal').check();
    await expect(charcoalImage).toBeVisible();
    await expect(flaxImage).toBeHidden();
    await expect(charcoalImage).toHaveAttribute('alt', /Charcoal/);
    await expect(page.locator('[data-bj-finish-name]')).toHaveText('Charcoal');
    await expect(page).toHaveURL(/finish=charcoal/);
    for (const link of await page.locator('[data-bj-enquiry-link]').all()) {
      await expect(link).toHaveAttribute('href', /finish=charcoal/);
    }
  });

  test('arrow keys move between finishes', async ({ page }) => {
    await page.goto('/beds/big-jos-bed');
    await page.getByLabel('Flax').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByLabel('Charcoal')).toBeChecked();
    await expect(page.locator('[data-bj-finish-name]')).toHaveText('Charcoal');
  });

  test('query string preselects finish and item, and the price follows the item', async ({ page }) => {
    await page.goto('/beds/big-jos-bed?finish=charcoal&item=base');
    await expect(page.getByLabel('Charcoal')).toBeChecked();
    await expect(page.locator('.bj-price > span:visible')).toContainText('R5,999');
    await page.getByLabel(/Mattress only/).check();
    await expect(page.locator('.bj-price > span:visible')).toContainText('R19,999');
    await expect(page.locator('ul[data-show-item="mattress"]')).toBeVisible();
    await expect(page.locator('ul[data-show-item="set"]')).toBeHidden();
  });
});

test('mobile menu opens with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
  await page.locator('.bj-mobile-menu summary').focus();
  await page.keyboard.press('Enter');
  const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole('link', { name: 'FAQs' }).click();
  await expect(page).toHaveURL(/\/faqs$/);
});

test('FAQs use native disclosure and allow several open at once', async ({ page }) => {
  await page.goto('/faqs');
  await page.getByText('Does it have springs?').click();
  await page.getByText('How firm is it?').click();
  await expect(page.locator('details[open]')).toHaveCount(2);
  await expect(page.getByText('How do I pay?')).toBeVisible();
});

test('reduced motion turns off smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('icons are decorative and every fact keeps readable text', async ({ page }) => {
  await page.goto('/');
  const icons = page.locator('svg.bj-icon');
  expect(await icons.count()).toBeGreaterThan(5);
  expect(await page.locator('svg.bj-icon:not([aria-hidden="true"])').count()).toBe(0);
  const facts = page.getByRole('list', { name: 'Quick facts' });
  await expect(facts).toContainText('160 × 210 cm');
  await expect(facts).toContainText('Width × length'); // screen-reader detail from the copy deck
  const commerce = page.getByRole('list', { name: 'Buying details' });
  await expect(commerce).toContainText('R24,999 with base');
  await expect(commerce).toContainText('Free Cape Town delivery');
  await expect(commerce).toContainText('100-day trial');
  await expect(commerce).toContainText('20-year mattress warranty');
});

test('the trial and warranty show beside every buying decision', async ({ page }) => {
  await page.goto('/beds/big-jos-bed');
  const assure = page.locator('.bj-buy .bj-assure');
  await expect(assure).toContainText('100-day trial, no questions asked');
  await expect(assure).toContainText('20-year mattress warranty');
  await expect(page.locator('.bj-specs')).toContainText('20 years on the mattress');

  await page.goto('/checkout?item=set&finish=flax&qty=1');
  const summary = page.locator('.bj-summary');
  await expect(summary).toContainText('100-day trial, no questions asked');
  await expect(summary).toContainText('20-year mattress warranty');

  await page.goto('/faqs');
  await page.getByText('Can I try it at home first?').click();
  await expect(page.getByText('Every bed comes with a 100-day trial, starting on the day it’s delivered.')).toBeVisible();
  await expect(page.getByText('We’ll collect it for free and give you a full refund')).toBeVisible();
  await page.getByText('Is there a warranty?').click();
  await expect(page.getByText('The mattress comes with a 20-year warranty.')).toBeVisible();
});

test('our story tells the founder story with a readable length comparison', async ({ page }) => {
  await page.goto('/our-story');
  await expect(page.getByText('I’m 2 metres tall and 125 kg.').first()).toBeVisible();
  const photo = page.getByRole('img', { name: /Johannes “Big Jo” le Roux/ });
  await expect(photo).toBeVisible();
  expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  const chart = page.getByRole('figure', { name: 'Why 210 cm?' });
  const rows = chart.getByRole('listitem');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText('188 cm');
  await expect(rows.nth(2)).toContainText('10 cm to spare');
  // Bars are proportional: the Big Jo's bar is longer than the standard one.
  const widths = await chart.locator('.bj-compare__bar').evaluateAll((bars) => bars.map((b) => b.getBoundingClientRect().width));
  expect(widths[2]).toBeGreaterThan(widths[1]);
  expect(widths[1]).toBeGreaterThan(widths[0]);
});

test('draft policies are never published', async ({ page }) => {
  const res = await page.goto('/policies/delivery-and-returns');
  expect(res?.status()).toBe(404);
  await page.goto('/');
  await expect(page.locator('footer a[href^="/policies/"]')).toHaveCount(0);
});
