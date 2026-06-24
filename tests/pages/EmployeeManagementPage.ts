import { Page, Locator } from '@playwright/test';

export class EmployeeManagementPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly employeeTable: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator('button:has-text("Add")');
    this.employeeTable = page.locator('.oxd-table');
    this.searchInput = page.locator('input[placeholder="Employee Name"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.successMessage = page.locator('.oxd-toast--success');
    this.pageTitle = page.locator('h6:has-text("Employee Information")');
  }

  async waitForPageLoad(): Promise<void> {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddEmployee(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchEmployee(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillEmployeeDetails(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSuccessMessage(): Promise<string> {
    return await this.successMessage.textContent();
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async getTableRowCount(): Promise<number> {
    return await this.page.locator('.oxd-table-body .oxd-table-row').count();
  }
}
