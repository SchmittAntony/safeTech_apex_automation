require('dotenv').config();

export async function login(page) {
  await page.goto(process.env.SAFETECH_URL!);
  await page.locator('#P9999_USERNAME').fill(process.env.SAFETECH_USERNAME!);
  await page.locator('#P9999_PASSWORD').fill(process.env.SAFETECH_PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('t-Header-logo-link').isVisible({ timeout: 5000 });
}
