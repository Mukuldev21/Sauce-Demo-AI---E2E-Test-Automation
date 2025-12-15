import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './src/tests',  // Updated to use new enterprise structure
  // Fallback: './tests' for backward compatibility during transition
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    [
      '@reportportal/agent-js-playwright',
      {
        apiKey: process.env.RP_API_KEY,
        endpoint: process.env.RP_ENDPOINT,
        project: process.env.RP_PROJECT,
        launch: process.env.RP_LAUNCH || 'Sauce_Demo_Tests',
        description: 'Sauce Demo E2E Automation Tests',
        attributes: [
          {
            key: 'framework',
            value: 'playwright',
          },
          {
            key: 'environment',
            value: process.env.TEST_ENV || 'local',
          },
        ],
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
