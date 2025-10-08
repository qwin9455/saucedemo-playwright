import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
checkMandatoryEnvironmentVariables();
const { PLAYWRIGHT_URL, PLAYWRIGHT_BROWSER, PLAYWRIGHT_HEADLESS } = readEnvironmentVariables();

export default defineConfig({
  testDir: 'tests',
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: PLAYWRIGHT_URL
      }
    },
    {
      testMatch: /login.spec.ts/,
      use: {
        baseURL: PLAYWRIGHT_URL,
        browserName: PLAYWRIGHT_BROWSER,
        headless: PLAYWRIGHT_HEADLESS,
        screenshot: 'only-on-failure',
        trace: 'on'
      },
    },
    {
      testMatch: /.*\.spec\.ts/,
      testIgnore: /login.spec.ts/,
      use: {
        baseURL: PLAYWRIGHT_URL + 'inventory.html',
        browserName: PLAYWRIGHT_BROWSER,
        headless: PLAYWRIGHT_HEADLESS,
        screenshot: 'only-on-failure',
        storageState: 'playwright/.auth/user.json',
        trace: 'on'
      },
      dependencies: ['setup'],
    },
  ],

})

function checkMandatoryEnvironmentVariables() {
  const missing: { areMissing: boolean, list: string[] } = { areMissing: false, list: [] };
  if (process.env.PLAYWRIGHT_URL === undefined || process.env.PLAYWRIGHT_URL.length === 0) {
    missing.areMissing = true;
    missing.list.push('PLAYWRIGHT_URL');
  }
  if (process.env.PLAYWRIGHT_BROWSER === undefined || process.env.PLAYWRIGHT_BROWSER.length === 0) {
    console.log('PLAYWRIGHT_BROWSER not set. "chromium" will be used as the default browser');
  }
  if (process.env.PLAYWRIGHT_HEADLESS === undefined || process.env.PLAYWRIGHT_HEADLESS.length === 0) {
    console.log('PLAYWRIGHT_HEADLESS not set. By default tests will run "headless"');
  }
  if (missing.areMissing === true) throw Error(`Missing mandatory environment variables: ${missing.list}`);
}

function readEnvironmentVariables() {
  const PLAYWRIGHT_URL = process.env.PLAYWRIGHT_URL;
  const PLAYWRIGHT_BROWSER: 'chromium' | 'firefox' | 'webkit' = process.env.PLAYWRIGHT_BROWSER
    ? process.env.PLAYWRIGHT_BROWSER as 'chromium' | 'firefox' | 'webkit'
    : 'chromium';
  const PLAYWRIGHT_HEADLESS = process.env.PLAYWRIGHT_HEADLESS
    ? process.env.PLAYWRIGHT_HEADLESS !== 'false'
    : true;

  return { PLAYWRIGHT_URL, PLAYWRIGHT_BROWSER, PLAYWRIGHT_HEADLESS };
}