// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';

export default class SideMenu extends BasePage {
  private constructor(driver: WebDriver | BasePage) {
    super(driver, '.side-menu');
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<SideMenu> {
    return new SideMenu(driver);
  }

  async toggleLanguageAsync() : Promise<void> {
    await this.clickAsync('.button.side-menu-language');
  }

  async toggleThemeAsync() : Promise<void> {
    await this.clickAsync('.button.side-menu-theme');
  }
}
