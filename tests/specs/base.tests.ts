import { test as base, expect, Page } from '@playwright/test';
import BasePage from '../model/pages/base.page';

interface TestData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const test = base.extend<{ open: Open, testData: TestData }>({
  open: async ({ page, context, baseURL }, use) => {
    await context.clearCookies();
    await page.goto(baseURL!);
    await use(openFactory(page));
  },
  testData: async ({ }, use) => {
    await use({ username: 'standard_user', password: 'secret_sauce', firstName: 'Myka', lastName: 'Tolentino', postalCode: '2148' });
  }
});

export type Open = <T extends BasePage>(type: new (page: Page) => T) => Promise<T>;

export const openFactory =
  (page: Page) =>
    async <T extends BasePage>(type: new (page: Page) => T): Promise<T> =>
      await new type(page).init();

export { expect };
