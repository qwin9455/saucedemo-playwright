import ProductBasePage from '../pages/product.base.page';
import {InventoryItem} from '@components';

export default class ShopPage extends ProductBasePage {

    async init(): Promise<this> {
        return super.init();
    }

    getInventoryItemByIndex(index: number): InventoryItem {
        const rootElement = this.page.locator('[data-test="inventory-item"]').nth(index);
        return new InventoryItem(rootElement, this);
    }
}
