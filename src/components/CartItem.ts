import { Page, Locator } from '@playwright/test';

/**
 * CartItem Component
 * Represents a single item in the shopping cart
 * Uses the "Filter" pattern for resilient locators
 */
export class CartItem {
    readonly page: Page;
    readonly productName: string;
    readonly container: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;
        this.productName = productName;

        // Use filter pattern to find the cart item by product name
        this.container = page
            .locator('.cart_item')
            .filter({ hasText: productName });
    }

    /**
     * Get the product name element
     */
    get nameElement(): Locator {
        return this.container.locator('.inventory_item_name');
    }

    /**
     * Get the product description element
     */
    get descriptionElement(): Locator {
        return this.container.locator('.inventory_item_desc');
    }

    /**
     * Get the product price element
     */
    get priceElement(): Locator {
        return this.container.locator('.inventory_item_price');
    }

    /**
     * Get the quantity label
     */
    get quantityElement(): Locator {
        return this.container.locator('.cart_quantity');
    }

    /**
     * Get the "Remove" button
     * Uses role-based locator for better accessibility
     */
    get removeButton(): Locator {
        return this.container.getByRole('button', { name: /remove/i });
    }

    /**
     * Remove this item from the cart
     */
    async remove(): Promise<void> {
        await this.removeButton.click();
    }

    /**
     * Get the product name text
     */
    async getName(): Promise<string> {
        return await this.nameElement.innerText();
    }

    /**
     * Get the product price as a number
     * @returns The price as a number (e.g., 29.99)
     */
    async getPrice(): Promise<number> {
        const priceText = await this.priceElement.innerText();
        const match = priceText.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get the quantity
     * @returns The quantity as a number
     */
    async getQuantity(): Promise<number> {
        const qtyText = await this.quantityElement.innerText();
        return parseInt(qtyText, 10);
    }

    /**
     * Get the product description text
     */
    async getDescription(): Promise<string> {
        return await this.descriptionElement.innerText();
    }

    /**
     * Check if the cart item is visible
     */
    async isVisible(): Promise<boolean> {
        return await this.container.isVisible();
    }

    /**
     * Check if remove button is visible
     */
    async isRemoveButtonVisible(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }
}
