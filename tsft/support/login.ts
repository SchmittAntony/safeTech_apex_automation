export async function login(page) {
  await page.goto('https://sistemas.safetech.inf.br/ords/tsft/f?p=100');
  await page.locator('#P9999_USERNAME').fill('sft_apex');
  await page.locator('#P9999_PASSWORD').fill('safetech');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('t-Header-logo-link').isVisible({ timeout: 5000 });
}
