import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Sauce Demo Checkout Overview Page
 * Handles order review and final purchase confirmation
 */
export class CheckoutOverviewPage {
    readonly page: Page;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for checkout overview elements
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
        this.cartItems = page.locator('.cart_item');
    }

    /**
     * Click finish button to complete the order
     */
    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    /**
     * Click cancel button to return to inventory
     */
    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    /**
     * Get the item total text
     * @returns Item total text (e.g., "Item total: $29.99")
     */
    async getItemTotalText(): Promise<string> {
        return await this.itemTotal.innerText();
    }

    /**
     * Get the item total amount as a number
     * @returns Item total as number
     */
    async getItemTotal(): Promise<number> {
        const text = await this.itemTotal.innerText();
        // Extract number from "Item total: $29.99"
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get the tax amount as a number
     * @returns Tax amount as number
     */
    async getTaxAmount(): Promise<number> {
        const text = await this.tax.innerText();
        // Extract number from "Tax: $2.40"
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get the total amount as a number
     * @returns Total amount as number
     */
    async getTotalAmount(): Promise<number> {
        const text = await this.total.innerText();
        // Extract number from "Total: $32.39"
        const match = text.match(/\$(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Get the tax text
     * @returns Tax text (e.g., "Tax: $2.40")
     */
    async getTaxText(): Promise<string> {
        return await this.tax.innerText();
    }

    /**
     * Get the total text
     * @returns Total text (e.g., "Total: $32.39")
     */
    async getTotalText(): Promise<string> {
        return await this.total.innerText();
    }

    /**
     * Get count of items in checkout summary
     * @returns Number of items
     */
    async getItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    /**
     * Verify price calculation is correct
     * @returns True if item total + tax equals total (within 0.01 tolerance)
     */
    async isPriceCalculationCorrect(): Promise<boolean> {
        const itemTotal = await this.getItemTotal();
        const tax = await this.getTaxAmount();
        const total = await this.getTotalAmount();

        const expectedTotal = itemTotal + tax;
        // Allow small floating point difference
        return Math.abs(expectedTotal - total) < 0.01;
    }
}
