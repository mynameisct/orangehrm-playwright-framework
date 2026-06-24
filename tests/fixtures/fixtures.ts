import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeManagementPage } from '../pages/EmployeeManagementPage';
import dotenv from 'dotenv';

dotenv.config();

type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeeManagementPage: EmployeeManagementPage;
  authenticatedUser: { page: Page; dashboardPage: DashboardPage };
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  employeeManagementPage: async ({ page }, use) => {
    const employeeManagementPage = new EmployeeManagementPage(page);
    await use(employeeManagementPage);
  },

  authenticatedUser: async ({ page, loginPage, dashboardPage }, use) => {
    await loginPage.navigate();
    await loginPage.login(
      process.env.USERNAME || 'Admin',
      process.env.PASSWORD || 'admin123'
    );
    await dashboardPage.waitForPageLoad();
    await use({ page, dashboardPage });
  }
});

export const expect = base.expect;
