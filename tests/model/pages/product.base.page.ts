import BasePage from './base.page';
import { ProductDetails } from '@components';

export default class ProductBasePage extends BasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '#inventory_container');
        return this;
    }

    async getProduct(comparison: (p: ProductDetails) => Promise<boolean>): Promise<ProductDetails> {
        const count = await this.page.locator('[data-test="inventory-item"]').count();
        for (const i of Array.from({ length: count }).keys()) {
            const rootElement = this.page.locator('[data-test="inventory-item"]').nth(i);
            const product = new ProductDetails(rootElement);
            if (await comparison(product)) return product;
        }
        throw new Error('Product not found');
    }

    toNumber(myString: string): number {
        return Number.parseFloat(
            myString.replace(new RegExp('[^0-9\\.]+'), '')
        );
    }
}
