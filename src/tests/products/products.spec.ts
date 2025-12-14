import { test, expect } from '../../fixtures/custom-test';

/**
 * Product Browsing Test Suite
 * Covers product display, sorting, and detail view
 * 
 * Refactored to use custom fixtures from AI_TEST_STANDARDS.md
 */

test.describe('Product Tests', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        // Login before each test
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-010: Product sorting - Name A to Z @regression @products', async ({ inventoryPage }) => {
        // Sort by name A to Z
        await inventoryPage.sortBy('az');

        // Get all product names
        const productNames = await inventoryPage.getAllProductNames();

        // Verify they are sorted alphabetically
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);

        // Verify first and last products
        expect(productNames[0]).toBe('Sauce Labs Backpack');
        expect(productNames[productNames.length - 1]).toBe('Test.allTheThings() T-Shirt (Red)');
    });

    test('TC-011: Product sorting - Price low to high @regression @products', async ({ inventoryPage }) => {
        // Sort by price low to high
        await inventoryPage.sortBy('lohi');

        // Get all product prices
        const prices = await inventoryPage.getAllProductPrices();

        // Verify they are sorted in ascending order
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);

        // Verify lowest and highest prices
        expect(prices[0]).toBe(7.99); // Sauce Labs Onesie
        expect(prices[prices.length - 1]).toBe(49.99); // Sauce Labs Fleece Jacket
    });

    test('Product sorting - Name Z to A @regression @products', async ({ inventoryPage }) => {
        // Sort by name Z to A
        await inventoryPage.sortBy('za');

        // Get all product names
        const productNames = await inventoryPage.getAllProductNames();

        // Verify they are sorted in reverse alphabetical order
        const sortedNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedNames);
    });

    test('Product sorting - Price high to low @regression @products', async ({ inventoryPage }) => {
        // Sort by price high to low
        await inventoryPage.sortBy('hilo');

        // Get all product prices
        const prices = await inventoryPage.getAllProductPrices();

        // Verify they are sorted in descending order
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);

        // Verify highest and lowest prices
        expect(prices[0]).toBe(49.99); // Sauce Labs Fleece Jacket
        expect(prices[prices.length - 1]).toBe(7.99); // Sauce Labs Onesie
    });

    test('TC-012: Product detail view @regression @products', async ({ page, inventoryPage, productDetailPage }) => {
        // Click on a product
        await inventoryPage.clickProduct('Sauce Labs Backpack');
        await expect(page).toHaveURL(/.*inventory-item.html/);

        // Verify product details
        const productName = await productDetailPage.getProductName();
        expect(productName).toBe('Sauce Labs Backpack');

        const productPrice = await productDetailPage.getProductPrice();
        expect(productPrice).toBe('$29.99');

        // Verify description is visible
        const description = await productDetailPage.getProductDescription();
        expect(description.length).toBeGreaterThan(0);

        // Verify image is visible
        await expect(productDetailPage.isProductImageVisible()).resolves.toBe(true);

        // Add to cart from detail page
        await productDetailPage.addToCart();

        // Verify button changes to Remove
        await expect(productDetailPage.isRemoveVisible()).resolves.toBe(true);
        await expect(productDetailPage.isAddToCartVisible()).resolves.toBe(false);

        // Navigate back to products
        await productDetailPage.backToProducts();
        await expect(page).toHaveURL(/.*inventory.html/);

        // Verify cart badge shows item using NavigationBar component
        await expect(inventoryPage.navBar.cartBadge).toHaveText('1');
    });

    test('Add to cart from product detail page @regression @products', async ({ page, inventoryPage, productDetailPage }) => {
        // Navigate to product detail
        await inventoryPage.clickProduct('Sauce Labs Bike Light');
        await expect(page).toHaveURL(/.*inventory-item.html/);

        // Verify add to cart button is visible
        await expect(productDetailPage.isAddToCartVisible()).resolves.toBe(true);

        // Add to cart
        await productDetailPage.addToCart();

        // Verify remove button appears
        await expect(productDetailPage.isRemoveVisible()).resolves.toBe(true);

        // Remove from cart
        await productDetailPage.removeFromCart();

        // Verify add to cart button reappears
        await expect(productDetailPage.isAddToCartVisible()).resolves.toBe(true);
    });
});
