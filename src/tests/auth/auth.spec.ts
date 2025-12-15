import { test, expect } from '../../fixtures/custom-test';

/**
 * Authentication Test Suite
 * Covers login, logout, and access control scenarios
 * 
 * Refactored to use custom fixtures from AI_TEST_STANDARDS.md
 * No manual page object instantiation - all injected via fixtures
 */

test.describe('Authentication Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-001: Successful login with standard user @smoke @auth', async ({ page, loginPage, inventoryPage }) => {
        // Perform login
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);

        // Verify redirect to inventory page
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify inventory page elements are visible
        await expect(inventoryPage.productsGrid).toBeVisible();
        await expect(inventoryPage.navBar.cartLink).toBeVisible();
    });

    test('TC-002: Login failure - locked out user @smoke @negative @auth', async ({ page, loginPage }) => {
        // Attempt login with locked out user
        await loginPage.login(process.env.LOCKED_USER!, process.env.TEST_PASSWORD!);

        // Verify error message is displayed
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('locked out');

        // Verify still on login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('TC-003: Login failure - invalid credentials @regression @negative @auth', async ({ page, loginPage }) => {
        // Attempt login with invalid credentials
        await loginPage.login('invalid_user', 'wrong_password');

        // Verify error message is displayed
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('do not match');

        // Verify still on login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('TC-004: Successful logout @smoke @auth', async ({ page, loginPage, inventoryPage }) => {
        // Login first
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/.*inventory.html/);

        // Perform logout using NavigationBar component
        await inventoryPage.logout();

        // Verify redirected to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.usernameInput).toBeVisible();
    });

    test('TC-018: Direct URL access - unauthenticated @smoke @auth @negative', async ({ page, context, loginPage }) => {
        // Clear any existing session
        await context.clearCookies();

        // Attempt to access inventory page directly
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Verify redirected to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();

        // Attempt to access cart page directly
        await page.goto('https://www.saucedemo.com/cart.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Attempt to access checkout page directly
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('TC-021: Login with empty credentials @smoke @negative @auth', async ({ page, loginPage }) => {
        // Attempt login with empty fields
        await loginPage.login('', '');

        // Verify error message is displayed
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });
});
