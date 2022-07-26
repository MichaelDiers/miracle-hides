// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class LicensePage extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'main#licensePage');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<LicensePage> {
    const page = new LicensePage(driver);
    await page.verifyOnPageAsync();
    return page;
  }
}
