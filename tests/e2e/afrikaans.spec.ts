import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { checkoutSignature, type Pair } from '../../src/lib/payfast';
import { PAYFAST_SANDBOX } from '../../src/lib/config';

const PAGES = ['/af/', '/af/beddens/big-jos-bed', '/af/ons-storie', '/af/vrae', '/af/kontak', '/af/checkout?item=set&finish=flax&qty=1'];
const WIDTHS = [320, 390, 768, 1440];
const ORIGIN = 'http://127.0.0.1:4322';

const noHorizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);

test.describe('every Afrikaans page', () => {
  for (const path of PAGES) {
    test(`${path} is in Afrikaans, fits 320–1440px and passes axe`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        expect(await noHorizontalOverflow(page), `overflow at ${width}px`).toBe(true);
      }
      await expect(page.locator('html')).toHaveAttribute('lang', 'af-ZA');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByText('Toetswinkel:')).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Hoofnavigasie' })).toBeVisible();
      expect(await page.locator('img:not([alt])').count()).toBe(0);
      expect(errors).toEqual([]);

      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      }
    });
  }
});

test('each page links its translation with hreflang and a canonical URL', async ({ page }) => {
  await page.goto('/our-story');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${ORIGIN}/our-story`);
  await expect(page.locator('link[hreflang="af-ZA"]')).toHaveAttribute('href', `${ORIGIN}/af/ons-storie`);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `${ORIGIN}/our-story`);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_ZA');

  await page.goto('/af/ons-storie');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${ORIGIN}/af/ons-storie`);
  await expect(page.locator('link[hreflang="en-ZA"]')).toHaveAttribute('href', `${ORIGIN}/our-story`);
  await expect(page.locator('link[hreflang="af-ZA"]')).toHaveAttribute('href', `${ORIGIN}/af/ons-storie`);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'af_ZA');
  await expect(page).toHaveTitle('Ons storie: ’n bed vir groot en lang mense | Big Jo’s Beds');
});

test('the language switch goes to the same page in the other language', async ({ page }) => {
  await page.goto('/our-story');
  await page.getByRole('link', { name: 'Afrikaans' }).click();
  await expect(page).toHaveURL(/\/af\/ons-storie$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Party van ons het ’n groter bed nodig.');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/our-story$/);

  // The chosen finish and item come along.
  await page.goto('/beds/big-jos-bed');
  await page.getByLabel('Charcoal').check();
  await page.getByLabel(/Base only/).check();
  await page.getByRole('link', { name: 'Afrikaans' }).click();
  await expect(page).toHaveURL(/\/af\/beddens\/big-jos-bed\?finish=charcoal&item=base/);
  await expect(page.getByLabel('Charcoal')).toBeChecked();
  await expect(page.getByLabel(/Net die basis/)).toBeChecked();
});

test('on a phone the switch shows a short label but keeps its full name', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Afrikaans' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('lang', 'af-ZA');
  await expect(link.locator('.bj-lang__short')).toHaveText('AF');
  const box = await link.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  // Logo, switch and menu share one row.
  const tops = await page.locator('.bj-logo, .bj-lang, .bj-mobile-menu summary').evaluateAll((els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2)),
  );
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(8);
});

async function stubPayFast(page: Page) {
  const posts: Pair[][] = [];
  await page.route('https://sandbox.payfast.co.za/**', async (route) => {
    posts.push([...new URLSearchParams(route.request().postData() ?? '').entries()]);
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>PayFast stub</title><h1>PayFast stub</h1>' });
  });
  return posts;
}

test('an Afrikaans purchase stays in Afrikaans through PayFast and back', async ({ page }) => {
  const posts = await stubPayFast(page);
  await page.goto('/af/beddens/big-jos-bed');
  await page.getByLabel('Charcoal').check();
  await page.getByLabel(/Net die basis/).check();
  await page.getByLabel('Hoeveelheid').selectOption('2');
  await page.getByRole('button', { name: 'Koop nou' }).click();

  await expect(page).toHaveURL(/\/af\/checkout\?finish=charcoal&item=base&qty=2/);
  await expect(page.locator('.bj-summary')).toContainText('Net die bypassende basis');
  await expect(page.locator('.bj-summary')).toContainText('Hoeveelheid: 2');
  // The warranty covers the mattress only, so a base-only order shows just the trial.
  await expect(page.locator('.bj-summary .bj-assure')).toHaveText('100 dae proeftyd, geen vrae gevra nie');

  await page.getByRole('button', { name: /Betaal R11,998/ }).click();
  await expect(page.locator('#co-firstName-error')).toHaveText('Vul jou voornaam in.');
  await expect(page.getByRole('alert')).toBeFocused();

  await page.getByLabel('Voornaam').fill('Anna');
  await page.getByLabel('Van', { exact: true }).fill('Botha');
  await page.getByLabel('E-posadres').fill('anna@example.com');
  await page.getByLabel('Selfoonnommer').fill('082 123 4567');
  await page.getByLabel('Straatadres').fill('12 Kerkstraat');
  await page.getByLabel('Voorstad').fill('Durbanville');
  await page.getByLabel('Poskode').fill('7550');
  await page.getByLabel(/toetsbestelling/).check();
  await page.getByRole('button', { name: 'Betaal R11,998 met PayFast' }).click();
  await expect(page.getByRole('heading', { name: 'PayFast stub' })).toBeVisible();

  const fields = posts[0];
  const data = Object.fromEntries(fields);
  expect(data.custom_str3).toBe('af');
  expect(data.item_name).toBe('Big Jo’s Beds Net die bypassende basis, Charcoal');
  expect(data.return_url).toMatch(/\/af\/order\/BJ-/);
  expect(data.cancel_url).toBe(`${ORIGIN}/af/checkout/cancelled?item=base&finish=charcoal&qty=2`);
  expect(data.signature).toBe(checkoutSignature(fields.filter(([k]) => k !== 'signature'), PAYFAST_SANDBOX.passphrase));

  await page.goto(data.return_url);
  await expect(page.locator('html')).toHaveAttribute('lang', 'af-ZA');
  await expect(page.getByRole('heading', { name: 'Ons bevestig tans jou betaling.' })).toBeVisible();
  await expect(page.locator('.bj-totals')).toContainText('Net die bypassende basis');

  await page.goto(data.cancel_url);
  await expect(page.getByRole('heading', { name: 'Jou betaling het nie deurgegaan nie.' })).toBeVisible();
  await expect(page.getByText('Net die bypassende basis, Charcoal. Hoeveelheid: 2.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Probeer weer' })).toHaveAttribute('href', '/af/checkout?item=base&finish=charcoal&qty=2');
});

test('the Afrikaans contact form validates and confirms in Afrikaans', async ({ page }) => {
  await page.goto('/af/kontak?finish=charcoal');
  const finish = page.getByLabel('In watter afwerking stel jy belang?');
  await expect(finish).toHaveValue('charcoal');
  await expect(finish.locator('option[value="unsure"]')).toHaveText('Nog nie seker nie');
  await page.getByRole('button', { name: 'Stuur navraag' }).click();
  await expect(page.getByRole('alert')).toContainText('Gaan asseblief die gemerkte besonderhede na.');
  await expect(page.locator('#en-name-error')).toHaveText('Vul jou naam in.');

  await page.getByLabel('Jou naam').fill('Anna');
  await page.getByLabel('E-posadres').fill('anna@example.com');
  await page.getByLabel('Dorp of voorstad').fill('Paarl');
  await page.getByLabel('Wat wil jy graag weet?').fill('Pas dit by ’n nou trap op?');
  await page.getByRole('button', { name: 'Stuur navraag' }).click();
  await expect(page.getByRole('status')).toContainText('Dankie. Ons het jou navraag ontvang');
  await expect(page).toHaveURL(/\/af\/kontak$/);
});

test('policies show English text, marked as English, until the owner approves a translation', async ({ page }) => {
  await page.goto('/af/');
  const link = page.locator('footer a[href="/af/policies/delivery-and-returns"]');
  await expect(link).toHaveAttribute('lang', 'en-ZA');
  await link.click();
  await expect(page.getByText('Hierdie beleid is tans net in Engels beskikbaar.')).toBeVisible();
  await expect(page.locator('article')).toHaveAttribute('lang', 'en-ZA');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
  // The Afrikaans draft is never published.
  expect((await page.request.get('/af/policies/drafts/af/delivery-and-returns')).status()).toBe(404);
});

test('the 404 page speaks both languages', async ({ page }) => {
  const response = await page.goto('/af/bestaan-nie');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'We couldn’t find that page.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ons kon nie daardie bladsy kry nie.' })).toBeVisible();
  await expect(page.locator('[lang="af-ZA"] a', { hasText: 'Tuis' })).toHaveAttribute('href', '/af/');
});
