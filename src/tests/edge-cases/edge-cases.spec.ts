import { test, expect } from '../../fixtures/custom-test';

/**
 * Edge Cases and Special User Test Suite
 * Covers problem users, app state reset, and edge scenarios
 * 
 * Refactored to use custom fixtures from AI_TEST_STANDARDS.md
 */

test.describe('Edge Cases Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-014: Reset app state @regression @edge', async ({ page, loginPage, inventoryPage, cartPage }) => {
        // Login and add items to cart
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);

        // Add multiple items
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');

        // Verify cart badge using NavigationBar component
        await expect(inventoryPage.navBar.cartBadge).toHaveText('3');

        // Reset app state using NavigationBar component
        await inventoryPage.resetAppState();

        // Wait a moment for state to reset
        await page.waitForTimeout(500);

        // Navigate to cart to verify it's empty
        await inventoryPage.goToCart();

        // Verify cart is empty
        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBe(true);
    });

    test('TC-015: Problem user - visual issues @regression @edge @problem-user', async ({ page, loginPage, inventoryPage, cartPage }) => {
        // Login as problem user
        await loginPage.login('problem_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify inventory page loads despite potential visual issues
        await expect(inventoryPage.productsGrid).toBeVisible();

        // Verify core functionality still works
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // Verify item is in cart despite visual bugs
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(true);

        // Attempt to complete checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        // Note: Problem user may have visual discrepancies but functionality should work
        // This test validates that core features are not broken
    });

    test('TC-016: Performance glitch user @regression @performance', async ({ page, loginPage, inventoryPage, cartPage }) => {
        // Login as performance glitch user (may be slow)
        await loginPage.login('performance_glitch_user', 'secret_sauce');

        // Use increased timeout for inventory page load
        await expect(inventoryPage.productsGrid).toBeVisible({ timeout: 60000 });
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify functionality works despite slowness
        await inventoryPage.addToCart('Sauce Labs Backpack');

        // Cart badge may take longer to update
        await expect(inventoryPage.navBar.cartBadge).toBeVisible({ timeout: 10000 });
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Navigate to cart
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/, { timeout: 10000 });

        // Verify item is in cart
        await expect(cartPage.isItemInCart('Sauce Labs Backpack')).resolves.toBe(true);
    });

    test('Error user - checkout failure @regression @edge', async ({ page, loginPage, inventoryPage, cartPage }) => {
        // Login as error user
        await loginPage.login('error_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);

        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();

        // Attempt checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        // Note: Error user may encounter issues during checkout
        // This test documents the behavior
    });

    test('Visual user - image differences @regression @edge', async ({ page, loginPage, inventoryPage }) => {
        // Login as visual user
        await loginPage.login('visual_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify page loads
        await expect(inventoryPage.productsGrid).toBeVisible();

        // Verify core functionality
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');

        // Note: Visual user may have different images but functionality should work
        // This would be better tested with visual regression tools
    });
});
