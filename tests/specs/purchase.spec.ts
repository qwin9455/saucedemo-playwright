import { ShopPage } from '@pages';
import { test, expect } from './base.tests';


test.describe('Purchase Verification', () => {

    test('Validate successful purchase of random product', async ({ open, testData }) => {
        const shopPage = await open(ShopPage);
        const product = shopPage.getInventoryItemByIndex(Math.floor(Math.random() * 6));
        const checkoutCompleteMessage = await product.clickAddToCartButton()
            .then(_ => _.clickCartButton())
            .then(_ => _.clickCheckoutButton())
            .then(_ => _.fill(testData.firstName, testData.lastName, testData.postalCode))
            .then(_ => _.clickFinishButton())
            .then(_ => _.getCompleteMessage());

        expect(checkoutCompleteMessage.header).toBe('Thank you for your order!');
        expect(checkoutCompleteMessage.text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
});
