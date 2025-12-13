import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Sauce Demo Product Detail Page
 * Handles individual product detail view interactions
 */
export class ProductDetailPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for product detail elements
        this.productName = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('.inventory_details_img');
        this.addToCartButton = page.locator('button[id^="add-to-cart"]');
        this.removeButton = page.locator('button[id^="remove"]');
        this.backToProductsButton = page.locator('#back-to-products');
    }

    /**
     * Get the product name
     * @returns Product name text
     */
    async getProductName(): Promise<string> {
        return await this.productName.innerText();
    }

    /**
     * Get the product price
     * @returns Product price text (includes $)
     */
    async getProductPrice(): Promise<string> {
        return await this.productPrice.innerText();
    }

    /**
     * Get the product description
     * @returns Product description text
     */
    async getProductDescription(): Promise<string> {
        return await this.productDescription.innerText();
    }

    /**
     * Add product to cart from detail page
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Remove product from cart on detail page
     */
    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    /**
     * Navigate back to products/inventory page
     */
    async backToProducts(): Promise<void> {
        await this.backToProductsButton.click();
    }

    /**
     * Check if product image is visible
     * @returns True if image is visible
     */
    async isProductImageVisible(): Promise<boolean> {
        return await this.productImage.isVisible();
    }

    /**
     * Check if "Add to cart" button is visible
     * @returns True if add to cart button is visible
     */
    async isAddToCartVisible(): Promise<boolean> {
        return await this.addToCartButton.isVisible();
    }

    /**
     * Check if "Remove" button is visible
     * @returns True if remove button is visible
     */
    async isRemoveVisible(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }
}
