// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Page from './page';
import SideMenu from './side-menu';

export default class SymmetricPage extends Page {
  private constructor(driver: WebDriver | BasePage, footer: Footer, sideMenu: SideMenu) {
    super(driver, 'main#symmetricPage', footer, sideMenu);
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<SymmetricPage> {
    const footer = await Footer.initializeAsync(driver);
    const sideMenu = await SideMenu.initializeAsync(driver);

    const page = new SymmetricPage(driver, footer, sideMenu);
    await page.verifyOnPageAsync();
    return page;
  }

  async getLanguageTextAsync() : Promise<string> {
    return super.getTextAsync('label[for=type]');
  }
}
