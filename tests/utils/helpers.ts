import { Page } from '@playwright/test';

export class UIHelpers {
  static async waitForElement(page: Page, selector: string, timeout = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `reports/screenshots/${name}.png` });
  }

  static async waitForNavigation(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  static async getPageTitle(page: Page): Promise<string> {
    return await page.title();
  }

  static async reloadPage(page: Page): Promise<void> {
    await page.reload();
    await page.waitForLoadState('networkidle');
  }

  static async goBack(page: Page): Promise<void> {
    await page.goBack();
    await page.waitForLoadState('networkidle');
  }

  static async fillForm(
    page: Page,
    fields: Record<string, string>
  ): Promise<void> {
    for (const [selector, value] of Object.entries(fields)) {
      await page.fill(selector, value);
    }
  }

  static async clickAndWait(page: Page, selector: string): Promise<void> {
    await page.click(selector);
    await page.waitForLoadState('networkidle');
  }
}
