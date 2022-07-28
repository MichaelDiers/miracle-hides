// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import { WindowSize } from '../tests/constants';
import { AsymmetricPage } from './asymmetric-page';
import BasePage from './base-page';
import Footer from './footer';
import Page from './page';
import SideMenu from './side-menu';
import { SymmetricPage } from './symmetric-page';

export default class WelcomePage extends Page {
  private constructor(driver: WebDriver | BasePage, footer: Footer, sideMenu: SideMenu) {
    super(driver, 'main#welcomePage', footer, sideMenu);
  }

  static async initializeAsync(
    driver: WebDriver | BasePage,
    url?: string,
    size?: WindowSize,
  ) : Promise<WelcomePage> {
    const footer = await Footer.initializeAsync(driver);
    const sideMenu = await SideMenu.initializeAsync(driver);

    const page = new WelcomePage(driver, footer, sideMenu);
    if (url) {
      await page.getAsync(url);
    }

    if (size) {
      await page.setWindowSizeAsync(size);
    }

    await page.verifyOnPageAsync();
    return page;
  }

  async getLanguageTextAsync() : Promise<string> {
    return super.getTextAsync('#generateAsync');
  }

  async toAsymmetricPageAsync() : Promise<AsymmetricPage> {
    await this.clickAsync('#generateAsync');
    return AsymmetricPage.initializeAsync(this);
  }

  async toSymmetricPageAsync() : Promise<SymmetricPage> {
    await this.clickAsync('#generateSync');
    return SymmetricPage.initializeAsync(this);
  }
}
