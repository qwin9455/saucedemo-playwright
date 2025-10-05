import { LoginPage, ShopPage } from '@pages';
import { test, expect } from './base.tests';

test.describe('Logout Verification', () => {
    test.beforeEach(async ({ open, testData }) => {
        await open(LoginPage).then(_ => _.login(testData.username, testData.password));
    });

    test('Validate successful logout', async ({ open }) => {
        const loginLogo = await open(ShopPage)
            .then(_ => _.clickMenuButton())
            .then(_ => _.clickLogoutButton())
            .then(_ => _.getLoginLogo());
        expect(loginLogo).toBe('Swag Labs');
    });
});
