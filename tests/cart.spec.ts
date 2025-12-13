import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';

/**
 * Shopping Cart Test Suite
 * Covers cart operations and management
 */

test.describe('Shopping Cart Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        // Login before each test
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-005: Add single item to cart from inventory @smoke @cart', async ({ page }) => {
        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');

        // Verify cart badge updates
        await expect(inventoryPage.cartBadge).toBeVisible();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Verify item is in cart
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(true);

        // Verify price
        const price = await cartPage.getItemPrice('Sauce Labs Backpack');
        expect(price).toBe('$29.99');
    });

    test('TC-006: Add multiple items to cart @regression @cart', async ({ page }) => {
        // Add multiple items
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.cartBadge).toHaveText('2');

        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await expect(inventoryPage.cartBadge).toHaveText('3');

        // Navigate to cart
        await inventoryPage.goToCart();

        // Verify all items are in cart
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(3);

        // Verify specific items
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(true);
        await expect(cartPage.isItemInCart('Sauce Labs Bike Light')).resolves.toBe(true);
        await expect(cartPage.isItemInCart('Sauce Labs Bolt T-Shirt')).resolves.toBe(true);
    });

    test('TC-007: Remove item from cart @regression @cart', async ({ page }) => {
        // Add two items to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.cartBadge).toHaveText('2');

        // Navigate to cart
        await inventoryPage.goToCart();

        // Verify both items present
        expect(await cartPage.getCartItemCount()).toBe(2);

        // Remove one item
        await cartPage.removeItem('Sauce Labs Backpack');

        // Verify cart updates
        expect(await cartPage.getCartItemCount()).toBe(1);
        await expect(cartPage.isItemInCart('Sauce Labs Bike Light')).resolves.toBe(true);
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(false);

        // Verify cart badge updates (need to check from inventory or navigate back)
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('TC-013: Continue shopping from cart @regression @cart', async ({ page }) => {
        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Continue shopping
        await cartPage.continueShopping();

        // Verify returned to inventory
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify cart persists
        await expect(inventoryPage.cartBadge).toHaveText('1');

        // Add another item
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

    test('TC-017: Empty cart checkout attempt @negative @edge @cart', async ({ page }) => {
        // Navigate to cart without adding items
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Verify cart is empty
        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBe(true);

        // Verify checkout button is still present (app allows empty cart checkout)
        await expect(cartPage.checkoutButton).toBeVisible();

        // Note: The app allows proceeding with empty cart, which may be a bug
        // but we document the actual behavior
    });
});
