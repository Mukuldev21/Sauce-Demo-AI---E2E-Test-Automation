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
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);
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

    test('TC-025: All product images load correctly @regression @products', async ({ page, inventoryPage }) => {
        // Get all product image elements
        const images = await page.locator('.inventory_item_img img').all();

        // Verify we have images
        expect(images.length).toBeGreaterThan(0);

        // Verify each image is visible and has valid src
        for (const img of images) {
            await expect(img).toBeVisible();
            const src = await img.getAttribute('src');
            expect(src).toBeTruthy();
            expect(src).not.toContain('WithGarbageOnItToBreakTheUrl'); // Not problem_user
        }
    });

    test('TC-026: Burger menu all links functional @regression @navigation', async ({ page, inventoryPage }) => {
        // Open burger menu
        await inventoryPage.navBar.burgerMenuButton.click();

        // Verify all menu items visible
        await expect(inventoryPage.navBar.allItemsLink).toBeVisible();
        await expect(inventoryPage.navBar.aboutLink).toBeVisible();
        await expect(inventoryPage.navBar.logoutLink).toBeVisible();
        await expect(inventoryPage.navBar.resetAppStateLink).toBeVisible();

        // Test All Items link
        await inventoryPage.navBar.allItemsLink.click();
        await expect(page).toHaveURL(/.*inventory.html/);

        // Close the menu (it stays open after All Items click)
        await inventoryPage.navBar.closeMenuButton.click();

        // Open menu again and test Reset App State
        await inventoryPage.navBar.burgerMenuButton.click();
        await inventoryPage.navBar.resetAppStateLink.click();

        // Verify reset worked (menu should close)
        await expect(inventoryPage.navBar.burgerMenuButton).toBeVisible();
    });

    test('TC-029: Sorting persists after navigation @regression @products', async ({ page, loginPage, inventoryPage, productDetailPage }) => {
        // Login
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);

        // Sort by price low to high
        await inventoryPage.sortBy('lohi');

        // Verify sorting applied
        const firstProductBefore = await inventoryPage.getFirstProductName();
        expect(firstProductBefore).toBe('Sauce Labs Onesie');

        // Navigate to product detail
        await inventoryPage.clickProduct('Sauce Labs Onesie'); // Cheapest product
        await expect(page).toHaveURL(/.*inventory-item.html/);

        // Go back to inventory
        await productDetailPage.backToProducts();
        await expect(page).toHaveURL(/.*inventory.html/);

        // Document actual behavior: sorting DOES NOT persist (resets to default A-Z)
        // This is the actual Sauce Demo behavior
        const firstProductAfter = await inventoryPage.getFirstProductName();
        expect(firstProductAfter).toBe('Sauce Labs Backpack'); // Default A-Z sorting
    });

    test('TC-032: All product prices formatted correctly @regression @products', async ({ loginPage, inventoryPage }) => {
        // Login
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);

        const prices = await inventoryPage.getAllProductPrices();

        // Verify all prices are valid numbers
        for (const price of prices) {
            expect(price).toBeGreaterThan(0);
            expect(price).toBeLessThan(1000); // Reasonable upper limit
            // Verify max 2 decimal places
            const decimalPlaces = (price.toString().split('.')[1] || '').length;
            expect(decimalPlaces).toBeLessThanOrEqual(2);
        }
    });

    test('TC-035: About link opens Sauce Labs website @regression @navigation', async ({ page, loginPage, inventoryPage }) => {
        // Login
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.TEST_PASSWORD!);

        // Open burger menu
        await inventoryPage.navBar.burgerMenuButton.click();

        // Click About link (navigates to external site)
        await inventoryPage.navBar.aboutLink.click();

        // Wait for navigation
        await page.waitForURL(/saucelabs.com/, { timeout: 10000 });

        // Verify navigated to Sauce Labs website
        await expect(page).toHaveURL(/saucelabs.com/);
    });
});
