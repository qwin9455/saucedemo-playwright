import { ShopPage } from '@pages';
import { test, expect } from './base.tests';


test.describe('Shop Verification', () => {

    test('Validate random product details', async ({ open }) => {
        const productDetails = await open(ShopPage)
            .then(_ => _.getInventoryItemByIndex(Math.floor(Math.random() * 6)))
            .then(_ => _.getProductDetails());
        expect(productDetails.title).not.toBeNull();
        expect(productDetails.description).not.toBeNull();
        expect(productDetails.price).not.toBeNull();
    });

    test('Validate correct product quantity is added to cart', async ({ open }) => {
        const badge = await open(ShopPage)
            .then(_ => _.getInventoryItemByIndex(Math.floor(Math.random() * 6)))
            .then(_ => _.clickAddToCartButton())
            .then(_ => _.getShoppingCartBadge());
        expect(badge).toBe("1");
    });
});