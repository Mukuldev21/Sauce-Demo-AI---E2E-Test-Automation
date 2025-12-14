import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Sauce Demo Login Page
 * Handles authentication and login-related interactions
 */
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // User-facing locators following AI_TEST_STANDARDS.md
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    /**
     * Navigate to the login page
     */
    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * Perform login with provided credentials
     * @param username - Username to login with
     * @param password - Password to login with
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Get the error message text
     * @returns Error message text if visible
     */
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }

    /**
     * Check if error message is visible
     * @returns True if error message is displayed
     */
    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
}
