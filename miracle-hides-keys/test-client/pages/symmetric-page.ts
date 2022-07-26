// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class SymmetricPage extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'main#symmetricPage');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<SymmetricPage> {
    const page = new SymmetricPage(driver);
    await page.verifyOnPageAsync();
    return page;
  }
}
