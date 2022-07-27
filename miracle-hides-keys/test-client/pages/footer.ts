// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import LicensePage from './licenses-page';

export default class Footer extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'footer');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<Footer> {
    return new Footer(driver);
  }

  async toLicensePageAsync() : Promise<LicensePage> {
    await this.clickAsync('a[view=licensePage]');
    return LicensePage.initializeAsync(this);
  }
}
