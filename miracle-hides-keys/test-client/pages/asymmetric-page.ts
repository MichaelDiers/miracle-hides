// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class AsymmetricPage extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'main#asymmetricPage');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<AsymmetricPage> {
    const page = new AsymmetricPage(driver);
    await page.verifyOnPageAsync();
    return page;
  }
}
