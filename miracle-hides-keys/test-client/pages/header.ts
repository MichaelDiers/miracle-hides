// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class Header extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'header');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<Header> {
    return new Header(driver);
  }

  async toAsymmetricPageAsync(isMobile: boolean) : Promise<void> {
    if (isMobile) {
      await this.clickAsync('#menuSymbolTrigger');
    }

    await this.clickAsync('#asymmetricAlgorithmsLink');
  }

  async toSymmetricPageAsync(isMobile: boolean) : Promise<void> {
    if (isMobile) {
      await this.clickAsync('#menuSymbolTrigger');
    }

    await this.clickAsync('#symmetricAlgorithmsLink');
  }
}
