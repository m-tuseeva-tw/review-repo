import { test, expect } from '@playwright/test';
import { DashboardPage, LoginPage } from "./login-pages";

// tests for login functionality

const loginData = {
    login: 'test@example.com',
    password: 'test123',
}

test.describe('Check login functionality @login', () => {

    test('TS1. Should allow a user to log in successfully', async ({ page }) => {
        console.log('Open the Login page...');
        await page.goto('/login');
        const loginPage = new LoginPage(page);

        console.log('Enter valid login data...');
        await loginPage.login(loginData.login, loginData.password);

        console.log('Open the Dashboard page...');

        await page.waitForTimeout(5000);
        const dashboardPage = new DashboardPage(page);
        const welcomeMessage = await dashboardPage.getWelcomeMessage();

        console.log('Check that the welcome message has appeared...');
        expect(welcomeMessage).toContain('Welcome');
        await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TS2. Should show an error message with invalid credentials @negative', async ({ page }) => {
        console.log('Open the Login page...');
        await page.goto('/login');
        const loginPage = new LoginPage(page);

        console.log('Enter wrong login data...');
        await page.locator('#email').fill('wrong@example.com');
        await loginPage.enterPassword('wrongpassword');
        await loginPage.clickLogin();

        await page.waitForTimeout(500);

        const errorMessage = await loginPage.getErrorMessage();

        console.log('Check that the error message has appeared...');
        expect.soft(errorMessage).toBe('Invalid email or password.');
    });
});
