import { test, expect } from '@playwright/test';
import { DashboardPage, LoginPage } from "./login_pages";
import { invalidLoginData } from "../test-data/login_tests_constants";
import { LoginResponse } from '../api/login-post-interface';

// tests for login functionality

const correct_login_data = {
    login: 'test@example.com',
    password: 'test123',
}

let loginResponse: LoginResponse;

test.describe('Check login functionality @login', () => {

    test('TS1. Should allow a user to log in successfully', async ({ page }) => {
        console.log('Open the Login page...');
        await page.goto('/login');
        const loginPage = new LoginPage(page);

        console.log('Enter valid login data...');
        await loginPage.login(correct_login_data.login, correct_login_data.password);

        console.log('Open the Dashboard page...');

        await page.waitForTimeout(5000);
        const dashboardPage = new DashboardPage(page);
        const welcomeMessage = await dashboardPage.getWelcomeMessage();

        console.log('Check that the welcome message has appeared...');
        expect(welcomeMessage).toContain('Welcome');
        await expect(page.locator('h1').first()).toBeVisible();
    });

    for (const i of invalidLoginData) {
        test(`${i.ts} Should show error message with incorrect data: ${i.name}`, async ({ page }) => {
            console.log('Open the Login page...');
            await page.goto('/login');
            const loginPage = new LoginPage(page);

            console.log(`Enter ${i.name}...`);
            await loginPage.enterEmail(i.email);
            await loginPage.enterPassword(i.password);
            await loginPage.clickLogin();

            await page.waitForTimeout(500);

            const errorMessage = await loginPage.getErrorMessage();

            console.log('Check that the error message has appeared...');
            expect.soft(errorMessage).toBe(i.expectedError);
        });
    }

    test('TS3. Check login request response', async ({ page }) => {
        console.log('Open the Login page...');
        await page.goto('/login');
        const loginPage = new LoginPage(page);

        console.log('Enter valid login data...');
        await loginPage.login(correct_login_data.login, correct_login_data.password);

        console.log('Getting post response...');

        try {
            let apiResponseReceived = false;
            let responseBody: any = null;
            let responseStatus: number | null = null;

            page.on('response', async response => {
                if (response.url().includes('/api/login') || response.url().includes('/login')) {
                    apiResponseReceived = true;
                    responseStatus = response.status();
                    try {
                        responseBody = await response.json();
                    } catch (e) {
                        throw new Error('Response body is not received');
                    }
                }
            });

            console.log('Checking that API request was successful...');
            expect.soft(apiResponseReceived).toBe(true);
            expect.soft(responseStatus).toBe(200);

            if (responseBody && typeof responseBody === 'object') {
                expect.soft(responseBody).toHaveProperty('user');
                expect.soft(responseBody.user).toHaveProperty('id');
                expect.soft(responseBody.user).toHaveProperty('email');
                expect.soft(responseBody.user.email).toBe(correct_login_data.login);
            }
        } catch (error) {
            console.log('Error during fetching post response...');
        }
    });
});
