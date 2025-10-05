import { Page } from '@playwright/test';
import { Sidebar } from '@components';
import { CartPage } from '@pages';

export default abstract class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract init(): Promise<this>;


    async getTitle(): Promise<string> {
        return await this.page.locator('.app_logo').innerText();
    }

    async getShoppingCartBadge(): Promise<string> {
        return await this.page.locator('[data-test="shopping-cart-badge"]').innerText();
    }

    async clickCartButton(): Promise<CartPage> {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
        return new CartPage(this.page).init();
    }

    async clickMenuButton(): Promise<Sidebar> {
        await this.page.locator('#react-burger-menu-btn').click();
        const rootElement = this.page.locator('#root');
        return new Sidebar(rootElement);
    }
}
