import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { NavigationBar } from '../components/NavigationBar';

/**
 * Custom Fixtures for Sauce Demo Automation
 * 
 * This file implements the Dependency Injection pattern from AI_TEST_STANDARDS.md
 * All page objects and components are automatically available in tests
 * 
 * Usage:
 * import { test, expect } from '../fixtures/custom-test';
 * 
 * test('my test', async ({ loginPage, inventoryPage }) => {
 *   await loginPage.login('user', 'pass');
 *   await expect(inventoryPage.productsGrid).toBeVisible();
 * });
 */

// Define the types of our custom fixtures
type SauceDemoFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
    navBar: NavigationBar;
};

// Extend the base test with our custom fixtures
export const test = base.extend<SauceDemoFixtures>({
    /**
     * LoginPage fixture
     * Automatically instantiated for every test that uses it
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * InventoryPage fixture
     * Automatically instantiated for every test that uses it
     */
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    /**
     * ProductDetailPage fixture
     * Automatically instantiated for every test that uses it
     */
    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },

    /**
     * CartPage fixture
     * Automatically instantiated for every test that uses it
     */
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    /**
     * CheckoutInfoPage fixture
     * Automatically instantiated for every test that uses it
     */
    checkoutInfoPage: async ({ page }, use) => {
        const checkoutInfoPage = new CheckoutInfoPage(page);
        await use(checkoutInfoPage);
    },

    /**
     * CheckoutOverviewPage fixture
     * Automatically instantiated for every test that uses it
     */
    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    /**
     * CheckoutCompletePage fixture
     * Automatically instantiated for every test that uses it
     */
    checkoutCompletePage: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },

    /**
     * NavigationBar fixture
     * Automatically instantiated for every test that uses it
     * This is a shared component used across multiple pages
     */
    navBar: async ({ page }, use) => {
        const navBar = new NavigationBar(page);
        await use(navBar);
    },
});

// Re-export expect for convenience
export { expect };
