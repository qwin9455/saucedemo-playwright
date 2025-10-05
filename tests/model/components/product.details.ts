import { Locator } from 'playwright-core';

interface ProductData {
    title: string;
    description: string;
    price: number;
}

export default class ProductDetails {
    protected rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    async getTitle(): Promise<string> {
        return await this.rootElement.locator('[data-test="inventory-item-name"]').innerText();
    }

    async getDescription(): Promise<string> {
        return await this.rootElement.locator('[data-test="inventory-item-desc"]').innerText();
    }

    async getPrice(): Promise<number> {
        const priceString = await this.rootElement.locator('[data-test="inventory-item-price"]').innerText()
        return Number.parseFloat(
            priceString.replace(new RegExp('[^0-9\\.]+'), '')
        );
    }

    async getProductDetails(): Promise<ProductData> {
        return { title: await this.getTitle(), description: await this.getDescription(), price: await this.getPrice() };
    }
}
