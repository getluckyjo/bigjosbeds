import { expect, test, type Page } from '@playwright/test';
import { checkoutSignature, type Pair } from '../../src/lib/payfast';
import { PAYFAST_SANDBOX } from '../../src/lib/config';

/** PayFast is unreachable from tests: capture the hand-off POST instead. */
async function stubPayFast(page: Page) {
  const posts: Pair[][] = [];
  await page.route('https://sandbox.payfast.co.za/**', async (route) => {
    posts.push([...new URLSearchParams(route.request().postData() ?? '').entries()]);
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>PayFast stub</title><h1>PayFast stub</h1>' });
  });
  return posts;
}

async function fillDetails(page: Page, postalCode = '7700') {
  await page.getByLabel('First name').fill('Thabo');
  await page.getByLabel('Last name').fill("O'Brien");
  await page.getByLabel('Email address').fill('thabo@example.com');
  await page.getByLabel('Mobile number').fill('082 123 4567');
  await page.getByLabel('Street address').fill('40 Strubens Road');
  await page.getByLabel('Suburb').fill('Mowbray');
  await page.getByLabel('Postal code').fill(postalCode);
  await page.getByLabel(/test order/).check();
}

test('product → checkout → signed PayFast hand-off → order and cancel pages', async ({ page }) => {
  const posts = await stubPayFast(page);
  await page.goto('/beds/big-jos-bed');
  await page.getByLabel('Charcoal').check();
  await page.getByLabel(/Base only/).check();
  await page.getByLabel('Quantity').selectOption('2');
  await page.getByRole('button', { name: 'Buy now' }).click();

  await expect(page).toHaveURL(/\/checkout\?finish=charcoal&item=base&qty=2/);
  const summary = page.locator('.bj-summary');
  await expect(summary).toContainText('Matching base only');
  await expect(summary).toContainText('Charcoal');
  await expect(summary).toContainText('R11,998');

  await fillDetails(page);
  await page.getByRole('button', { name: 'Pay R11,998 with PayFast' }).click();
  await expect(page.getByRole('heading', { name: 'PayFast stub' })).toBeVisible();

  expect(posts).toHaveLength(1);
  const fields = posts[0];
  const data = Object.fromEntries(fields);
  expect(data.amount).toBe('11998.00');
  expect(data.merchant_id).toBe(PAYFAST_SANDBOX.merchantId);
  expect(data.m_payment_id).toMatch(/^BJ-\d{6}-[A-Z0-9]{4}$/);
  expect(data.name_last).toBe('O’Brien');
  expect(data.cell_number).toBe('0821234567');
  expect(data.custom_str1).toBe('charcoal');
  expect(data.notify_url).toMatch(/\/api\/payfast\/itn$/);
  const unsigned = fields.filter(([k]) => k !== 'signature');
  expect(data.signature).toBe(checkoutSignature(unsigned, PAYFAST_SANDBOX.passphrase));

  // Returning from PayFast before the ITN arrives: status comes from the database.
  await page.goto(data.return_url);
  await expect(page.getByRole('heading', { name: 'We’re confirming your payment.' })).toBeVisible();
  await expect(page.getByText(data.m_payment_id).first()).toBeVisible();

  // A wrong token reveals nothing.
  await page.goto(data.return_url.replace(/t=[^&]+/, 't=wrong'));
  await expect(page.getByRole('heading', { name: 'We couldn’t find that order.' })).toBeVisible();

  // Cancelling at PayFast keeps the selection for a retry.
  await page.goto(data.cancel_url);
  await expect(page.getByRole('heading', { name: 'Your payment didn’t go through.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try again' })).toHaveAttribute('href', '/checkout?item=base&finish=charcoal&qty=2');
});

test('checkout explains errors and focuses the summary', async ({ page }) => {
  await page.goto('/checkout?item=set&finish=flax&qty=1');
  await page.getByRole('button', { name: /Pay R24,999/ }).click();
  const summary = page.getByRole('alert');
  await expect(summary).toBeFocused();
  await expect(summary.getByRole('link', { name: 'First name' })).toHaveAttribute('href', '#co-firstName');
  await expect(page.locator('#co-firstName-error')).toHaveText('Enter your first name.');
  await expect(page.getByLabel('First name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('First name')).toHaveAttribute('aria-describedby', 'co-firstName-error');
});

test('addresses outside Cape Town are sent to the enquiry form', async ({ page }) => {
  await page.goto('/checkout?item=set&finish=flax&qty=1');
  await fillDetails(page, '7600');
  await page.getByLabel('Suburb').fill('Stellenbosch');
  await page.getByRole('button', { name: /Pay R24,999/ }).click();
  await expect(page.getByRole('alert')).toContainText('We deliver in Cape Town for now.');
  await page.getByRole('link', { name: 'Ask about delivery' }).click();
  await expect(page.getByLabel('Town or suburb')).toHaveValue('Stellenbosch');
  await expect(page.getByLabel('Which finish are you interested in?')).toHaveValue('flax');
});

test('an empty or invalid selection asks the customer to choose a bed', async ({ page }) => {
  await page.goto('/checkout?item=headboard&finish=flax');
  await expect(page.getByRole('heading', { name: 'Choose your bed first.' })).toBeVisible();
});

test('the whole purchase works without JavaScript', async ({ browser }) => {
  // reducedMotion: Playwright's 'stable' check stalls on smooth scrolling when page JS is off.
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const posts = await stubPayFast(page);
  await page.goto('/beds/big-jos-bed');
  await page.getByLabel('Charcoal').check();
  await expect(page.locator('[data-show-finish="charcoal"] img').first()).toBeVisible(); // CSS :has()
  await page.getByRole('button', { name: 'Buy now' }).click();
  await expect(page.locator('.bj-summary')).toContainText('R24,999');
  await fillDetails(page);
  await page.getByRole('button', { name: /Pay R24,999/ }).click();
  await page.getByRole('button', { name: 'Continue to PayFast' }).click();
  await expect(page.getByRole('heading', { name: 'PayFast stub' })).toBeVisible();
  expect(Object.fromEntries(posts[0]).amount).toBe('24999.00');
  await context.close();
});

test.describe('contact form', () => {
  test('prefills the finish, validates, and confirms only after saving', async ({ page }) => {
    await page.goto('/contact?finish=charcoal');
    await expect(page.getByLabel('Which finish are you interested in?')).toHaveValue('charcoal');
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page.getByRole('alert').getByRole('link', { name: 'Your name' })).toBeVisible();
    await expect(page.locator('#en-name-error')).toHaveText('Enter your name.');
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');

    await page.getByLabel('Your name').fill('Sam');
    await page.getByLabel('Email address').fill('sam@example.com');
    await page.getByLabel('Town or suburb').fill('Durbanville');
    await page.getByLabel('What would you like to know?').fill('Will it go up a narrow staircase?');
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page.getByRole('status')).toHaveText(
      'Thanks. We’ve received your enquiry and will reply using the contact details you provided.',
    );
    await expect(page.getByLabel('Your name')).toHaveValue('');
  });
});

test.describe('request security', () => {
  test('cross-site form posts are refused', async ({ request }) => {
    const response = await request.post('/contact', {
      headers: { Origin: 'https://evil.example' },
      form: { name: 'x', email: 'x@example.com', area: 'x', message: 'x' },
    });
    expect(response.status()).toBe(403);
  });

  test('PayFast notifications reach the ITN endpoint but need a valid signature', async ({ request }) => {
    const response = await request.post('/api/payfast/itn', {
      form: { m_payment_id: 'BJ-000000-NONE', payment_status: 'COMPLETE', amount_gross: '1.00', signature: 'deadbeef' },
    });
    expect(response.status()).toBe(400);
    expect(await response.text()).toBe('bad_signature');
  });
});

test('on-demand pages send security headers that still allow the PayFast hand-off', async ({ request }) => {
  const response = await request.get('/checkout?item=set&finish=flax&qty=1');
  const headers = response.headers();
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['content-security-policy']).toContain('form-action');
  expect(headers['content-security-policy']).toContain('https://sandbox.payfast.co.za');
  expect(headers['cache-control']).toBe('no-store');
});
