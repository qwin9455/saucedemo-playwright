import { LoginPage, ShopPage } from '@pages';
import { test, expect } from './base.tests';

test.describe('Checkout Verification', () => {

    test.beforeEach(async ({ open, testData }) => {
        await open(LoginPage).then(_ => _.login(testData.username, testData.password));
    });

    test('Validate successful checking out of random product', async ({ open, testData }) => {
        const shopPage = await open(ShopPage);
        const product = shopPage.getInventoryItemByIndex(Math.floor(Math.random() * 6));
        const productDetails = await product.getProductDetails();
        const checkoutPage =
            await product.clickAddToCartButton()
                .then(_ => _.clickCartButton())
                .then(_ => _.clickCheckoutButton())
                .then(_ => _.fill(testData.firstName, testData.lastName, testData.postalCode));
        const checkedOutProductDetails = await checkoutPage.getProduct(async p => await p.getTitle() === productDetails.title).then(_ => _.getProductDetails());
        const priceTotalDetails = await checkoutPage.getPriceTotalDetails();
        expect(checkedOutProductDetails).toEqual(productDetails);
        expect(priceTotalDetails.subTotal).toEqual(productDetails.price);
        expect(priceTotalDetails.tax.toFixed(2)).toEqual((productDetails.price * 0.08).toFixed(2));
        expect(priceTotalDetails.total.toFixed(2)).toEqual((productDetails.price * 1.08).toFixed(2));
    });
});
