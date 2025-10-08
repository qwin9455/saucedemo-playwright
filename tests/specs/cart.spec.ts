import { ShopPage } from '@pages';
import { test, expect } from './base.tests';


test.describe('Cart Verification', () => {

    test('Validate successful adding a random product to cart', async ({ open }) => {
        const shopPage = await open(ShopPage);
        const product = shopPage.getInventoryItemByIndex(Math.floor(Math.random() * 6));
        const productDetails = await product.getProductDetails();
        const productInCartDetails = await (await (await product.clickAddToCartButton()).clickCartButton()).getProduct(async p => await p.getTitle() === productDetails.title).then(_ => _.getProductDetails());
        expect(productInCartDetails).toEqual(productDetails);
    });
});
