import ProductBasePage from './product.base.page';
import { CheckoutOverviewPage } from '@pages';

export default class CheckoutInfoPage extends ProductBasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '[data-test="checkout-info-container"]');
        return this;
    }

    async setFirstName(firstName: string): Promise<CheckoutInfoPage> {
        await this.page.locator('#first-name').fill(firstName);
        return this;
    }

    async setLastName(lastName: string): Promise<CheckoutInfoPage> {
        await this.page.locator('#last-name').fill(lastName);
        return this;
    }

    async setPostalCode(postalCode: string): Promise<CheckoutInfoPage> {
        await this.page.locator('#postal-code').fill(postalCode);
        return this;
    }

    async clickContinueButton(): Promise<CheckoutOverviewPage> {
        await this.page.locator('#continue').click();
        return new CheckoutOverviewPage(this.page).init();
    }

    async fill(firstName: string, lastName: string, postalCode: string): Promise<CheckoutOverviewPage> {
        return await this.setFirstName(firstName)
            .then(_ => _.setLastName(lastName))
            .then(_ => _.setPostalCode(postalCode))
            .then(_ => _.clickContinueButton());
    }
}
