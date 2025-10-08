import { ShopPage } from '@pages';
import { test, expect } from './base.tests';

test.describe('Logout Verification', () => {
    test('Validate successful logout', async ({ open }) => {
        const loginLogo = await open(ShopPage)
            .then(_ => _.clickMenuButton())
            .then(_ => _.clickLogoutButton())
            .then(_ => _.getLoginLogo());
        expect(loginLogo).toBe('Swag Labs');
    });
});
