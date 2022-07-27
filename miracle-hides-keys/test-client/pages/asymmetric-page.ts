// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Page from './page';

export default class AsymmetricPage extends Page {
  private constructor(driver: WebDriver | BasePage, footer: Footer) {
    super(driver, 'main#asymmetricPage', footer);
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<AsymmetricPage> {
    const footer = await Footer.initializeAsync(driver);
    const page = new AsymmetricPage(driver, footer);
    await page.verifyOnPageAsync();
    return page;
  }
}
