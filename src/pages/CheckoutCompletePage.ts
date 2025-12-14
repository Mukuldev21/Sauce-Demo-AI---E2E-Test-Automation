import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Sauce Demo Checkout Complete Page
 * Handles order confirmation and navigation back to home
 */
export class CheckoutCompletePage {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly completeText: Locator;
    readonly confirmationIcon: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for checkout complete elements
        this.successMessage = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.confirmationIcon = page.locator('.pony_express');
        this.backHomeButton = page.locator('#back-to-products');
    }

    /**
     * Click back home button to return to inventory
     */
    async backToHome(): Promise<void> {
        await this.backHomeButton.click();
    }

    /**
     * Get the confirmation message text
     * @returns Success message text (e.g., "Thank you for your order!")
     */
    async getConfirmationMessage(): Promise<string> {
        return await this.successMessage.innerText();
    }

    /**
     * Get the complete text description
     * @returns Complete text description
     */
    async getCompleteText(): Promise<string> {
        return await this.completeText.innerText();
    }

    /**
     * Check if confirmation icon is visible
     * @returns True if confirmation icon is displayed
     */
    async isConfirmationIconVisible(): Promise<boolean> {
        return await this.confirmationIcon.isVisible();
    }

    /**
     * Check if success message is visible
     * @returns True if success message is displayed
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    /**
     * Verify order completion page is fully loaded
     * @returns True if all key elements are visible
     */
    async isPageFullyLoaded(): Promise<boolean> {
        const messageVisible = await this.isSuccessMessageVisible();
        const iconVisible = await this.isConfirmationIconVisible();
        const buttonVisible = await this.backHomeButton.isVisible();

        return messageVisible && iconVisible && buttonVisible;
    }
}
