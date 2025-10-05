import BasePage from './base.page';
import { ShopPage } from '@pages';

export default class LoginPage extends BasePage {

    async init(): Promise<this> {
        await this.page.waitForFunction(selector => !!document.querySelector(selector), '[data-test="login-container"]');
        return this;
    }

    async getLoginLogo(): Promise<string> {
        return await this.page.locator('.login_logo').innerText();
    }

    async setUsername(username: string): Promise<LoginPage> {
        await this.page.locator('#user-name').fill(username);
        return this;
    }

    async setPassword(password: string): Promise<LoginPage> {
        await this.page.locator('#password').fill(password);
        return this;
    }

    async clickLoginButton(): Promise<ShopPage> {
        await this.page.locator('#login-button').click();
        return new ShopPage(this.page).init();
    }

    async login(username: string, password: string): Promise<ShopPage> {
        return await this.setUsername(username)
            .then(_ => _.setPassword(password))
            .then(_ => _.clickLoginButton());
    }
}
