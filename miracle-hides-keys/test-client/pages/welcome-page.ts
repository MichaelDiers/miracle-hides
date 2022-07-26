// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import AsymmetricPage from './asymmetric-page';
import BasePage from './base-page';
import LicensePage from './licenses-page';
import SymmetricPage from './symmetric-page';

export default class WelcomePage extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, 'main#welcomePage');
  }

  static async initializeAsync(driver: WebDriver | BasePage, url?: string, size?: { width?: number | 'max', height?: number | 'max' }) : Promise<WelcomePage> {
    const page = new WelcomePage(driver);
    if (url) {
      await page.getAsync(url);
    }

    if (size) {
      await page.setWindowSizeAsync(size);
    }

    await page.verifyOnPageAsync();
    return page;
  }

  async getBackgroundColorAsync() : Promise<string> {
    return super.getBackgroundColorAsync('body');
  }

  async getLanguageTextAsync() : Promise<string> {
    return super.getTextAsync('#generateAsync');
  }

  async toAsymmetricPageAsync() : Promise<AsymmetricPage> {
    await this.clickAsync('#generateAsync');
    return AsymmetricPage.initializeAsync(this);
  }

  async toLicensePageAsync() : Promise<LicensePage> {
    await this.clickAsync('a[view=licensePage]');
    return LicensePage.initializeAsync(this);
  }

  async toSymmetricPageAsync() : Promise<SymmetricPage> {
    await this.clickAsync('#generateSync');
    return SymmetricPage.initializeAsync(this);
  }

  async toggleLanguageAsync() : Promise<void> {
    await this.clickAsync('.button.side-menu-language');
  }

  async toggleThemeAsync() : Promise<void> {
    await this.clickAsync('.button.side-menu-theme');
  }
}
