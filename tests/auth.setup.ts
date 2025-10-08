import { test as setup } from './specs/base.tests';
import { LoginPage } from '@pages';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page, open, testData }) => {
    await open(LoginPage).then(_ => _.login(testData.username, testData.password));
    await page.context().storageState({ path: authFile });  
});