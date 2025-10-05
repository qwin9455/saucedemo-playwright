import { Locator } from 'playwright-core';
import LoginPage from '../pages/login.page';

export default class SideBar {
    protected rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    async clickLogoutButton(): Promise<LoginPage> {
        await this.rootElement.locator('#logout_sidebar_link').click();
        const page = (await (await this.rootElement.elementHandle())!.ownerFrame())!.page();
        return new LoginPage(page).init();
    }
}
