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
  private constructor({
    driver,
    footer,
    sideMenu,
  } : {
    driver: WebDriver | BasePage,
    footer: Footer,
    sideMenu: SideMenu,
  }) {
    super({
      driver,
      verifyOnPageSelector: 'main#welcomePage',
      footer,
      sideMenu,
    });
  }

  static async initializeAsync(
    driver: WebDriver | BasePage,
    url?: string,
    size?: WindowSize,
  ) : Promise<WelcomePage> {
    const footer = Footer.initializeAsync(driver);
    const sideMenu = SideMenu.initializeAsync(driver);

    const page = new WelcomePage({
      driver,
      footer: await footer,
      sideMenu: await sideMenu,
    });

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

  async toAsymmetricPageViaLinkAsync() : Promise<AsymmetricPage> {
    await this.clickAsync('#generateAsync');
    return AsymmetricPage.initializeAsync(this);
  }

  async toSymmetricPageViaLinkAsync() : Promise<SymmetricPage> {
    await this.clickAsync('#generateSync');
    return SymmetricPage.initializeAsync(this);
  }
}
