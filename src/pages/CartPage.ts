import { Page, Locator } from '@playwright/test';
import { CartItem } from '../components/CartItem';

/**
 * Page Object for Sauce Demo Shopping Cart Page
 * Refactored to use Component Object Model (COM) from AI_TEST_STANDARDS.md
 * 
 * This page now uses CartItem components instead of having all functionality inline
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
     * Get a CartItem component for a specific product
     * This follows the Component Object Model pattern
     * 
     * @param productName - Name of the product
     * @returns CartItem component instance
     */
    getCartItem(productName: string): CartItem {
        return new CartItem(this.page, productName);
    }

    /**
     * Remove an item from the cart
     * Delegates to CartItem component
     * 
     * @param productName - Name of the product to remove
     */
    async removeItem(productName: string): Promise<void> {
        const cartItem = this.getCartItem(productName);
        await cartItem.remove();
    }

    /**
     * Click the checkout button to proceed to checkout
     */
    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    /**
     * Click the continue shopping button to return to inventory
     */
    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    /**
     * Get the number of items in the cart
     * @returns Number of cart items
     */
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    /**
     * Get all product names in the cart
     * @returns Array of product names
     */
    async getCartItemNames(): Promise<string[]> {
        const nameLocators = this.page.locator('.cart_item .inventory_item_name');
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
     * @returns True if the item is in the cart
     */
    async isItemInCart(productName: string): Promise<boolean> {
        const cartItem = this.getCartItem(productName);
        return await cartItem.isVisible();
    }

    /**
     * Get the price of a specific item in the cart
     * Delegates to CartItem component
     * 
     * @param productName - Name of the product
     * @returns Price as a number
     */
    async getItemPrice(productName: string): Promise<number> {
        const cartItem = this.getCartItem(productName);
        return await cartItem.getPrice();
    }

    /**
     * Check if the cart is empty
     * @returns True if the cart has no items
     */
    async isCartEmpty(): Promise<boolean> {
        const count = await this.getCartItemCount();
        return count === 0;
    }
}
