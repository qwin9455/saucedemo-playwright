import BasePage from './base.page';
import { ShopPage } from '@pages';

export default class CheckoutCompletePage extends BasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '[data-test="checkout-complete-container"]');
        return this;
    }

    async getCompleteHeader(): Promise<string> {
        return await this.page.locator('[data-test="complete-header"]').innerText();
    }

    async getCompleteText(): Promise<string> {
        return await this.page.locator('[data-test="complete-text"]').innerText();
    }

    async clickBackToShopButton(): Promise<ShopPage> {
        await this.page.locator('[data-test="back-to-products"]').click();
        return new ShopPage(this.page).init();
    }

    async getCompleteMessage(): Promise<{ header: string, text: string }> {
        return { header: await this.getCompleteHeader(), text: await this.getCompleteText() };
    }

}
