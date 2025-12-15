import { test, expect } from '../../fixtures/custom-test';

/**
 * Shopping Cart Test Suite
 * Covers cart operations and management
 * 
 * Refactored to use custom fixtures from AI_TEST_STANDARDS.md
 */

test.describe('Shopping Cart Tests', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        // Login before each test
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-005: Add single item to cart from inventory @smoke @cart', async ({ page, inventoryPage, cartPage }) => {
        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');

        // Verify cart badge updates using NavigationBar component
        await expect(inventoryPage.navBar.cartBadge).toBeVisible();
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Verify item is in cart using CartItem component
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(true);

        // Verify price
        const price = await cartPage.getItemPrice('Sauce Labs Backpack');
        expect(price).toBe(29.99);  // Now returns number, not string
    });

    test('TC-006: Add multiple items to cart @regression @cart', async ({ page, inventoryPage, cartPage }) => {
        // Add multiple items
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('2');

        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('3');

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

    test('TC-007: Remove item from cart @regression @cart', async ({ page, inventoryPage, cartPage }) => {
        // Add two items to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('2');

        // Navigate to cart
        await inventoryPage.goToCart();

        // Verify both items present
        expect(await cartPage.getCartItemCount()).toBe(2);

        // Remove one item using CartItem component
        await cartPage.removeItem('Sauce Labs Backpack');

        // Verify cart updates
        expect(await cartPage.getCartItemCount()).toBe(1);
        await expect(cartPage.isItemInCart('Sauce Labs Bike Light')).resolves.toBe(true);
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(false);

        // Verify cart badge updates
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');
    });

    test('TC-013: Continue shopping from cart @regression @cart', async ({ page, inventoryPage, cartPage }) => {
        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Continue shopping
        await cartPage.continueShopping();

        // Verify returned to inventory
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify cart persists
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Add another item
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('2');
    });

    test('TC-017: Empty cart checkout attempt @negative @edge @cart', async ({ page, inventoryPage, cartPage }) => {
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

    test('TC-022: Add all products to cart @regression @cart', async ({ page, inventoryPage, cartPage }) => {
        // Get all product names
        const productNames = await inventoryPage.getAllProductNames();
        const productCount = productNames.length;

        // Add each product to cart
        for (const name of productNames) {
            await inventoryPage.addToCart(name);
        }

        // Verify cart badge shows correct count
        await expect(inventoryPage.navBar.cartBadge).toHaveText(productCount.toString());

        // Navigate to cart and verify all items
        await inventoryPage.goToCart();
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(productCount);

        // Verify each product is in cart
        for (const name of productNames) {
            await expect(cartPage.isItemInCart(name)).resolves.toBe(true);
        }
    });

    test('TC-028: Remove all items from cart @regression @cart', async ({ page, inventoryPage, cartPage }) => {
        // Add 3 items
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('3');

        // Navigate to cart
        await inventoryPage.goToCart();
        expect(await cartPage.getCartItemCount()).toBe(3);

        // Remove all items
        await cartPage.removeItem('Sauce Labs Backpack');
        await cartPage.removeItem('Sauce Labs Bike Light');
        await cartPage.removeItem('Sauce Labs Bolt T-Shirt');

        // Verify cart is empty
        expect(await cartPage.getCartItemCount()).toBe(0);
        await expect(inventoryPage.navBar.cartBadge).not.toBeVisible();
    });

    test('TC-030: Add and remove same item multiple times @regression @cart', async ({ loginPage, inventoryPage }) => {
        // Login
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);

        const productName = 'Sauce Labs Backpack';

        // Add item
        await inventoryPage.addToCart(productName);
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Remove item
        await inventoryPage.removeFromCart(productName);
        await expect(inventoryPage.navBar.cartBadge).not.toBeVisible();

        // Add again
        await inventoryPage.addToCart(productName);
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Remove again
        await inventoryPage.removeFromCart(productName);
        await expect(inventoryPage.navBar.cartBadge).not.toBeVisible();
    });
});
