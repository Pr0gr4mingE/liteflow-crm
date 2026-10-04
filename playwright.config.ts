import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Tempo máximo que um único arquivo de teste pode demorar
  timeout: 60000, 
  
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  // A BALA DE PRATA: Se estiver rodando no GitHub (CI), tenta de novo 2 vezes antes de falhar de vez
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. */
  use: {
    // Aumenta a paciência do robô para cliques e navegações
    actionTimeout: 15000,
    navigationTimeout: 15000,
    
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // Comando para subir o Next.js no ambiente de CI
    command: 'npm run build && npm run start', 
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    // Dá um tempo a mais pro build rodar antes de iniciar os testes (120 segundos)
    timeout: 120 * 1000,
    env: {
      API_URL: 'http://localhost:3000',
    },
  },
});