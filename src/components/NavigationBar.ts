import { Page, Locator } from '@playwright/test';

/**
 * NavigationBar Component
 * Represents the top navigation bar with burger menu, cart, and user actions
 * Used across all pages after login
 */
export class NavigationBar {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;
    readonly closeMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation elements
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');

        // Menu items (visible after opening burger menu)
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
    }

    /**
     * Open the burger menu
     */
    async openMenu(): Promise<void> {
        await this.burgerMenuButton.click();
        // Wait for menu to be visible
        await this.logoutLink.waitFor({ state: 'visible' });
    }

    /**
     * Close the burger menu
     */
    async closeMenu(): Promise<void> {
        await this.closeMenuButton.click();
    }

    /**
     * Navigate to shopping cart
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    /**
     * Get the cart badge count
     * @returns The number displayed in the cart badge, or 0 if not visible
     */
    async getCartCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const text = await this.cartBadge.innerText();
            return parseInt(text, 10);
        }
        return 0;
    }

    /**
     * Logout from the application
     */
    async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }

    /**
     * Reset application state (clears cart and other state)
     */
    async resetAppState(): Promise<void> {
        await this.openMenu();
        await this.resetAppStateLink.click();
        await this.closeMenu();
    }

    /**
     * Check if cart badge is visible
     */
    async isCartBadgeVisible(): Promise<boolean> {
        return await this.cartBadge.isVisible();
    }
}
