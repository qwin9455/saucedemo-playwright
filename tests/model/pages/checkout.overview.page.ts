import ProductBasePage from './product.base.page';
import { CheckoutCompletePage } from '@pages';

export default class CheckoutOverviewPage extends ProductBasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '[data-test="checkout-summary-container"]');
        return this;
    }

    async getPaymentInfo(): Promise<string> {
        return await this.page.locator('[data-test="payment-info-value"]').innerText();
    }

    async getShippingInfo(): Promise<string> {
        return await this.page.locator('[data-test="shipping-info-value"]').innerText();
    }

    async getItemSubTotal(): Promise<number> {
        const subTotalString = await this.page.locator('[data-test="subtotal-label"]').innerText();
        return this.toNumber(subTotalString);
    }

    async getItemTax(): Promise<number> {
        const itemTaxString = await this.page.locator('[data-test="tax-label"]').innerText();
        return this.toNumber(itemTaxString);
    }

    async getItemTotal(): Promise<number> {
        const itemTotalString = await this.page.locator('[data-test="total-label"]').innerText();
        return this.toNumber(itemTotalString);
    }

    async getPriceTotalDetails(): Promise<{ subTotal: number, tax: number, total: number }> {
        return { subTotal: await this.getItemSubTotal(), tax: await this.getItemTax(), total: await this.getItemTotal() };
    }

    async clickFinishButton(): Promise<CheckoutCompletePage> {
        await this.page.locator('#finish').click();
        return new CheckoutCompletePage(this.page).init();
    }

}
