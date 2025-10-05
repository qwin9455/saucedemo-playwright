import ProductDetails from './product.details';
import ShopPage from '../pages/shop.page';
import { Locator } from 'playwright-core';

export default class InventoryItem extends ProductDetails {

    private parent: ShopPage;

    constructor(rootElement: Locator, parent: ShopPage) {
        super(rootElement);
        this.parent = parent;
    }

    async clickAddToCartButton(): Promise<ShopPage> {
        await this.rootElement.getByText('Add to cart').click();
        return this.parent;
    }
}
