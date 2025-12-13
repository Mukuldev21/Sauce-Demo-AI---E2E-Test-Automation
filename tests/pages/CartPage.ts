import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Sauce Demo Shopping Cart Page
 * Handles cart management and checkout navigation
 */
export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartQuantityLabel: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for cart page elements
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.cartQuantityLabel = page.locator('.cart_quantity_label');
    }

    /**
     * Get locator for remove button of a specific product
     * @param productName - Name of the product
     * @returns Locator for the remove button
     */
    private getRemoveButton(productName: string): Locator {
        const productId = this.getProductId(productName);
        return this.page.locator(`#remove-${productId}`);
    }

    /**
     * Convert product name to product ID used in data-test attributes
     * @param productName - Full product name
     * @returns Product ID for data-test attributes
     */
    private getProductId(productName: string): string {
        return productName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '');
    }

    /**
     * Get locator for a cart item by product name
     * @param productName - Name of the product
     * @returns Locator for the cart item
     */
    private getCartItem(productName: string): Locator {
        return this.page.locator('.cart_item', { hasText: productName });
    }

    /**
     * Remove an item from the cart
     * @param productName - Name of the product to remove
     */
    async removeItem(productName: string): Promise<void> {
        await this.getRemoveButton(productName).click();
    }

    /**
     * Proceed to checkout
     */
    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    /**
     * Continue shopping (return to inventory)
     */
    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    /**
     * Get the count of items in cart
     * @returns Number of items in cart
     */
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    /**
     * Get all product names in the cart
     * @returns Array of product names
     */
    async getCartItemNames(): Promise<string[]> {
        const nameLocators = this.page.locator('.inventory_item_name');
        const count = await nameLocators.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            names.push(await nameLocators.nth(i).innerText());
        }

        return names;
    }

    /**
     * Check if a specific item is in the cart
     * @param productName - Name of the product to check
     * @returns True if product is in cart
     */
    async isItemInCart(productName: string): Promise<boolean> {
        return await this.getCartItem(productName).isVisible();
    }

    /**
     * Get the price of a specific item in cart
     * @param productName - Name of the product
     * @returns Price text (includes $)
     */
    async getItemPrice(productName: string): Promise<string> {
        return await this.getCartItem(productName).locator('.inventory_item_price').innerText();
    }

    /**
     * Check if cart is empty
     * @returns True if cart has no items
     */
    async isCartEmpty(): Promise<boolean> {
        const count = await this.getCartItemCount();
        return count === 0;
    }
}
