import type { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async enterEmail(email: string) {
        await this.page.locator('#email').fill(email);
    }

    async enterPassword(password: string) {
        await this.page.locator('#password').fill(password);
    }

    async clickLogin() {
        await this.page.locator('button[type="submit"]').click();
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage() {
        const errorLocator = this.page.locator('.text-destructive');
        return await errorLocator.textContent();
    }
}

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getWelcomeMessage() {
        return await this.page.locator('h1').first().textContent();
    }
}
