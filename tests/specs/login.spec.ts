import { LoginPage } from '@pages';
import { test, expect } from './base.tests';

test.describe('Login Verification', () => {
    test('Validate successful login', async ({ open, testData }) => {
        const title = await open(LoginPage)
            .then(_ => _.login(testData.username, testData.password))
            .then(_ => _.getTitle());
        expect(title).toBe('Swag Labs');
    });
});
