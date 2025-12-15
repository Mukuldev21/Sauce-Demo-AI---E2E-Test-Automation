import { Page, Locator } from '@playwright/test';
import { NavigationBar } from '../components/NavigationBar';
import { ProductCard } from '../components/ProductCard';

/**
 * Sort options for product inventory
 */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Page Object for Sauce Demo Inventory Page
 * Refactored to use Component Object Model (COM) from AI_TEST_STANDARDS.md
 * 
 * This page now composes NavigationBar and uses ProductCard components
 * instead of having all functionality in one monolithic class
 */
export class InventoryPage {
    readonly page: Page;
    readonly navBar: NavigationBar;
    readonly productsGrid: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;

        // Compose NavigationBar component
        this.navBar = new NavigationBar(page);

        // Page-specific locators
        this.productsGrid = page.locator('.inventory_list');
        this.sortDropdown = page.locator('.product_sort_container');
    }

    /**
     * Get a ProductCard component for a specific product
     * This follows the Component Object Model pattern
     * 
     * @param productName - Name of the product
     * @returns ProductCard component instance
     */
    getProduct(productName: string): ProductCard {
        return new ProductCard(this.page, productName);
    }

    /**
     * Add a product to cart
     * Delegates to ProductCard component
     * 
     * @param productName - Name of the product to add
     */
    async addToCart(productName: string): Promise<void> {
        const product = this.getProduct(productName);
        await product.addToCart();
    }

    /**
     * Remove a product from cart
     * Delegates to ProductCard component
     * 
     * @param productName - Name of the product to remove
     */
    async removeFromCart(productName: string): Promise<void> {
        const product = this.getProduct(productName);
        await product.removeFromCart();
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
     * Get the first product name from the inventory
     * Useful for verifying sorting persistence
     * @returns Name of the first product in the list
     */
    async getFirstProductName(): Promise<string> {
        const firstProduct = this.page.locator('.inventory_item_name').first();
        return await firstProduct.innerText();
    }

    /**
     * Click on a product to view its details
     * Delegates to ProductCard component
     * 
     * @param productName - Name of the product to click
     */
    async clickProduct(productName: string): Promise<void> {
        const product = this.getProduct(productName);
        await product.clickProduct();
    }

    /**
     * Get the cart badge count
     * Delegates to NavigationBar component
     * 
     * @returns Number of items in cart, or 0 if badge not visible
     */
    async getCartBadgeCount(): Promise<number> {
        return await this.navBar.getCartCount();
    }

    /**
     * Click the cart icon to navigate to cart page
     * Delegates to NavigationBar component
     */
    async goToCart(): Promise<void> {
        await this.navBar.goToCart();
    }

    /**
     * Open the burger menu
     * Delegates to NavigationBar component
     */
    async openMenu(): Promise<void> {
        await this.navBar.openMenu();
    }

    /**
     * Logout from the application
     * Delegates to NavigationBar component
     */
    async logout(): Promise<void> {
        await this.navBar.logout();
    }

    /**
     * Reset application state (clears cart)
     * Delegates to NavigationBar component
     */
    async resetAppState(): Promise<void> {
        await this.navBar.resetAppState();
    }
}
