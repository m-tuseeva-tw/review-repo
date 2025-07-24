import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: 0,
  workers: 1,
  testDir: './tests',
  reporter: [
    ['html'],
    ['junit', {outputFile: '../playwright-report/xunit.xml'}],
    ['json', {outputFile: '../playwright-report/report.json'}],
  ],
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
  use: {
    baseURL: 'http://localhost:9002',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'off',
  },
});