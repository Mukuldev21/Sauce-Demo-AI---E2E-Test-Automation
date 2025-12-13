import { Page, Locator } from '@playwright/test';

/**
 * Sort options for product inventory
 */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Page Object for Sauce Demo Inventory Page
 * Handles product browsing, sorting, cart operations, and navigation
 */
export class InventoryPage {
    readonly page: Page;
    readonly productsGrid: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators using ID and class selectors
        this.productsGrid = page.locator('.inventory_list');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('.product_sort_container');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
    }

    /**
     * Get locator for a specific product's "Add to cart" button
     * @param productName - Name of the product
     * @returns Locator for the add to cart button
     */
    private getAddToCartButton(productName: string): Locator {
        const productId = this.getProductId(productName);
        return this.page.locator(`#add-to-cart-${productId}`);
    }

    /**
     * Get locator for a specific product's "Remove" button
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
     * Get locator for a product card by name
     * @param productName - Name of the product
     * @returns Locator for the product card
     */
    private getProductCard(productName: string): Locator {
        return this.page.locator('.inventory_item', { hasText: productName });
    }

    /**
     * Add a product to cart
     * @param productName - Name of the product to add
     */
    async addToCart(productName: string): Promise<void> {
        await this.getAddToCartButton(productName).click();
    }

    /**
     * Remove a product from cart
     * @param productName - Name of the product to remove
     */
    async removeFromCart(productName: string): Promise<void> {
        await this.getRemoveButton(productName).click();
    }

    /**
     * Sort products by specified option
     * @param option - Sort option (az, za, lohi, hilo)
     */
    async sortBy(option: SortOption): Promise<void> {
        const sortValues: Record<SortOption, string> = {
            az: 'az',
            za: 'za',
            lohi: 'lohi',
            hilo: 'hilo'
        };
        await this.sortDropdown.selectOption(sortValues[option]);
    }

    /**
     * Get all product names currently displayed
     * @returns Array of product names
     */
    async getAllProductNames(): Promise<string[]> {
        const nameLocators = this.page.locator('.inventory_item_name');
        const count = await nameLocators.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            names.push(await nameLocators.nth(i).innerText());
        }

        return names;
    }

    /**
     * Get all product prices currently displayed
     * @returns Array of product prices as numbers
     */
    async getAllProductPrices(): Promise<number[]> {
        const priceLocators = this.page.locator('.inventory_item_price');
        const count = await priceLocators.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const priceText = await priceLocators.nth(i).innerText();
            // Remove $ and convert to number
            prices.push(parseFloat(priceText.replace('$', '')));
        }

        return prices;
    }

    /**
     * Click on a product to view its details
     * @param productName - Name of the product to click
     */
    async clickProduct(productName: string): Promise<void> {
        await this.getProductCard(productName).locator('.inventory_item_name').click();
    }

    /**
     * Get the cart badge count
     * @returns Number of items in cart, or 0 if badge not visible
     */
    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text = await this.cartBadge.innerText();
        return parseInt(text, 10);
    }

    /**
     * Click the cart icon to navigate to cart page
     */
    async goToCart(): Promise<void> {
        await this.page.locator('.shopping_cart_link').click();
    }

    /**
     * Open the burger menu
     */
    async openMenu(): Promise<void> {
        await this.burgerMenuButton.click();
    }

    /**
     * Logout from the application
     */
    async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }

    /**
     * Reset application state (clears cart)
     */
    async resetAppState(): Promise<void> {
        await this.openMenu();
        await this.resetAppStateLink.click();
    }
}
