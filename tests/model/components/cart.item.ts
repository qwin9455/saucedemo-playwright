import ProductDetails from './product.details';
import CartPage from '../pages/cart.page';
import { Locator } from 'playwright-core';

export default class CartItem extends ProductDetails {

    private parent: CartPage;

    constructor(rootElement: Locator, parent: CartPage) {
        super(rootElement);
        this.parent = parent;
    }

    async clickRemoveButton(): Promise<CartPage> {
        await this.rootElement.getByText('Remove').click();
        return this.parent;
    }
}
