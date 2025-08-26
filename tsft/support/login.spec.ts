import { test, expect } from '@playwright/test';

require('dotenv').config();

export async function login(page) {

  test.describe.configure({ mode: 'serial' });

  // 1. Teste de login válido (sempre primeiro)
  test('Login válido', async ({ page }) => {
    await page.goto(process.env.SAFETECH_URL!);
    await page.locator('#P9999_USERNAME').fill(process.env.SAFETECH_USERNAME!);
    await page.locator('#P9999_PASSWORD').fill(process.env.SAFETECH_PASSWORD!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('t-Header-logo-link').isVisible({ timeout: 5000 })
  });

  // 2. Testes independentes (rodam após o primeiro)
  test('Login com senha errada', async ({ page }) => {
    await page.goto(process.env.SAFETECH_URL!);
    await page.locator('#P9999_USERNAME').fill(process.env.SAFETECH_USERNAME!);
    await page.locator('#P9999_PASSWORD').fill('senha_errada');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('.t-Alert-wrap')).toBeVisible();
  });

  test('Login sem preencher campos', async ({ page }) => {
    await page.goto(process.env.SAFETECH_URL!);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('.t-Alert-wrap')).toBeVisible();
  });
}



