import { Page, Locator } from '@playwright/test';

/**
 * Interface for checkout information data
 */
export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    postalCode: string;
}

/**
 * Page Object for Sauce Demo Checkout Information Page
 * Handles checkout form input and validation
 */
export class CheckoutInfoPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // User-facing locators for form inputs
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    /**
     * Fill in checkout information form
     * @param info - Checkout information object
     */
    async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        await this.postalCodeInput.fill(info.postalCode);
    }

    /**
     * Fill in checkout information with individual parameters
     * @param firstName - First name
     * @param lastName - Last name
     * @param postalCode - Postal/Zip code
     */
    async fillInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Click continue button to proceed to checkout overview
     */
    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Click cancel button to return to cart
     */
    async cancel(): Promise<void> {
        await this.cancelButton.click();
    }

    /**
     * Get the error message text
     * @returns Error message text if visible
     */
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }

    /**
     * Check if error message is visible
     * @returns True if error message is displayed
     */
    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    /**
     * Get the value of first name input
     * @returns First name input value
     */
    async getFirstNameValue(): Promise<string> {
        return await this.firstNameInput.inputValue();
    }

    /**
     * Get the value of last name input
     * @returns Last name input value
     */
    async getLastNameValue(): Promise<string> {
        return await this.lastNameInput.inputValue();
    }

    /**
     * Get the value of postal code input
     * @returns Postal code input value
     */
    async getPostalCodeValue(): Promise<string> {
        return await this.postalCodeInput.inputValue();
    }
}
