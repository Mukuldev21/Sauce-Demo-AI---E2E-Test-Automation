import { test, expect } from '../../fixtures/custom-test';

/**
 * Checkout Test Suite
 * Covers end-to-end checkout flow and validation
 * 
 * Refactored to use custom fixtures from AI_TEST_STANDARDS.md
 */

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        // Login before each test
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-008: Complete checkout - single item @smoke @e2e @checkout', async ({
        page,
        inventoryPage,
        cartPage,
        checkoutInfoPage,
        checkoutOverviewPage,
        checkoutCompletePage
    }) => {
        // Add item to cart
        await inventoryPage.addToCart('Sauce Labs Backpack');

        // Navigate to cart and checkout
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        // Fill checkout information
        await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
        await checkoutInfoPage.continue();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

        // Verify checkout overview
        const itemTotalText = await checkoutOverviewPage.getItemTotalText();
        expect(itemTotalText).toContain('$29.99');

        // Verify tax is present
        await expect(checkoutOverviewPage.tax).toBeVisible();

        // Verify total is calculated correctly
        const isPriceCorrect = await checkoutOverviewPage.isPriceCalculationCorrect();
        expect(isPriceCorrect).toBe(true);

        // Complete purchase
        await checkoutOverviewPage.finish();
        await expect(page).toHaveURL(/.*checkout-complete.html/);

        // Verify success message
        await expect(checkoutCompletePage.successMessage).toBeVisible();
        const confirmationMsg = await checkoutCompletePage.getConfirmationMessage();
        expect(confirmationMsg).toContain('Thank you');

        // Verify confirmation icon
        await expect(checkoutCompletePage.confirmationIcon).toBeVisible();

        // Return to home
        await checkoutCompletePage.backToHome();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-009: Checkout validation - missing information @regression @negative @checkout', async ({
        page,
        inventoryPage,
        cartPage,
        checkoutInfoPage
    }) => {
        // Add item and navigate to checkout
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        // Attempt to continue with empty fields
        await checkoutInfoPage.continue();

        // Verify error for first name
        await expect(checkoutInfoPage.errorMessage).toBeVisible();
        await expect(checkoutInfoPage.errorMessage).toContainText('First Name is required');

        // Fill only first name
        await checkoutInfoPage.fillInfo('John', '', '');
        await checkoutInfoPage.continue();

        // Verify error for last name
        await expect(checkoutInfoPage.errorMessage).toContainText('Last Name is required');

        // Fill first and last name
        await checkoutInfoPage.fillInfo('John', 'Doe', '');
        await checkoutInfoPage.continue();

        // Verify error for postal code
        await expect(checkoutInfoPage.errorMessage).toContainText('Postal Code is required');

        // Fill all fields and verify success
        await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
        await checkoutInfoPage.continue();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    test('TC-020: Multiple items - price calculation @regression @checkout @e2e', async ({
        page,
        inventoryPage,
        cartPage,
        checkoutInfoPage,
        checkoutOverviewPage,
        checkoutCompletePage
    }) => {
        // Add multiple items with known prices
        await inventoryPage.addToCart('Sauce Labs Backpack'); // $29.99
        await inventoryPage.addToCart('Sauce Labs Bike Light'); // $9.99
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt'); // $15.99

        // Navigate to cart and checkout
        await inventoryPage.goToCart();

        // Verify all items in cart
        expect(await cartPage.getCartItemCount()).toBe(3);

        await cartPage.proceedToCheckout();

        // Fill checkout info
        await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
        await checkoutInfoPage.continue();

        // Verify item total (29.99 + 9.99 + 15.99 = 55.97)
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        expect(itemTotal).toBe(55.97);

        // Verify tax is calculated
        const tax = await checkoutOverviewPage.getTaxAmount();
        expect(tax).toBeGreaterThan(0);

        // Verify total = item total + tax
        const total = await checkoutOverviewPage.getTotalAmount();
        expect(Math.abs(total - (itemTotal + tax))).toBeLessThan(0.01);

        // Verify price calculation method
        const isPriceCorrect = await checkoutOverviewPage.isPriceCalculationCorrect();
        expect(isPriceCorrect).toBe(true);

        // Complete purchase
        await checkoutOverviewPage.finish();
        await expect(page).toHaveURL(/.*checkout-complete.html/);

        // Verify completion
        await expect(checkoutCompletePage.isPageFullyLoaded()).resolves.toBe(true);
    });

    test('TC-019: Browser back button during checkout @edge @checkout', async ({
        page,
        inventoryPage,
        cartPage,
        checkoutInfoPage
    }) => {
        // Add item and start checkout
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        // Fill information and continue
        await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
        await checkoutInfoPage.continue();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

        // Use browser back button
        await page.goBack();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        // Verify form data does NOT persist (actual Sauce Demo behavior)
        // The application clears the form on back navigation
        const firstName = await checkoutInfoPage.getFirstNameValue();
        const lastName = await checkoutInfoPage.getLastNameValue();
        const postalCode = await checkoutInfoPage.getPostalCodeValue();

        // Document actual behavior: form is cleared on back button
        expect(firstName).toBe('');
        expect(lastName).toBe('');
        expect(postalCode).toBe('');

        // Fill form again and continue
        await checkoutInfoPage.fillInfo('Jane', 'Smith', '54321');
        await checkoutInfoPage.continue();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });
});
