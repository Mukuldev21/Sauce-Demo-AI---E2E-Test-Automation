import { Page, Locator } from '@playwright/test';

/**
 * ProductCard Component
 * Represents a single product card in the inventory grid
 * Uses the "Filter" pattern from AI_TEST_STANDARDS.md
 */
export class ProductCard {
    readonly page: Page;
    readonly productName: string;
    readonly container: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;
        this.productName = productName;

        // Use filter pattern instead of ID generation
        // This is more resilient to DOM changes
        this.container = page
            .locator('.inventory_item')
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
     * Get the product image element
     */
    get imageElement(): Locator {
        return this.container.locator('.inventory_item_img img');
    }

    /**
     * Get the "Add to cart" button
     * Uses role-based locator for better accessibility
     */
    get addToCartButton(): Locator {
        return this.container.getByRole('button', { name: /add to cart/i });
    }

    /**
     * Get the "Remove" button
     * Uses role-based locator for better accessibility
     */
    get removeButton(): Locator {
        return this.container.getByRole('button', { name: /remove/i });
    }

    /**
     * Add this product to cart
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Remove this product from cart
     */
    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    /**
     * Click on the product to view details
     */
    async clickProduct(): Promise<void> {
        await this.nameElement.click();
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
     * Get the product name text
     */
    async getName(): Promise<string> {
        return await this.nameElement.innerText();
    }

    /**
     * Check if "Add to cart" button is visible
     */
    async isAddToCartVisible(): Promise<boolean> {
        return await this.addToCartButton.isVisible();
    }

    /**
     * Check if "Remove" button is visible
     */
    async isRemoveVisible(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }

    /**
     * Check if the product card is visible
     */
    async isVisible(): Promise<boolean> {
        return await this.container.isVisible();
    }
}
