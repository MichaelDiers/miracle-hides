// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class Footer extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'footer');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<Footer> {
    return new Footer(driver);
  }

  async toLicensePageAsync() : Promise<void> {
    await this.clickAsync('[href="/react/licenses"], [view=licensePage]');
  }
}
