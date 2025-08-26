import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
 testDir: './tsft',
  fullyParallel: false, // garante que não roda paralelo dentro do mesmo arquivo
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // força execução sequencial
  reporter: 'html',
  timeout: 120000, // 2 minutos por teste
  expect: {
    timeout: 10000,
  },
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.SAFETECH_URL,
    launchOptions: {
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox']
  }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
