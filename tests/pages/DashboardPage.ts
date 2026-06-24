import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly mainMenu: Locator;
  readonly pimMenu: Locator;
  readonly dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('.oxd-topbar-header-welcome');
    this.userDropdown = page.locator('img.oxd-userdropdown-img');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.mainMenu = page.locator('.oxd-navebar-menu');
    this.pimMenu = page.locator('a:has-text("PIM")');
    this.dashboardTitle = page.locator('h6:has-text("Dashboard")');
  }

  async waitForPageLoad(): Promise<void> {
    await this.dashboardTitle.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.welcomeMessage.textContent();
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.userDropdown.isVisible();
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.page.waitForTimeout(500);
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPIM(): Promise<void> {
    await this.pimMenu.click();
    await this.page.waitForLoadState('networkidle');
  }
}
