
import ProductBasePage from './product.base.page';
import { CheckoutInfoPage } from '@pages';

export default class CartPage extends ProductBasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '#cart_contents_container');
        return this;
    }

    async clickCheckoutButton(): Promise<CheckoutInfoPage> {
        await this.page.locator('#checkout').click();
        return new CheckoutInfoPage(this.page).init();
    }
}
