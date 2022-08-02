// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Header from './header';
import Page from './page';
import SideMenu from './side-menu';

const SELECTOR_PAGE_VERIFIER = 'main#licensePage';
const SELECTOR_LANGUAGE_TEST = '#licensePage div h1';

export default class LicensePage extends Page {
  private constructor({
    driver,
    footer,
    sideMenu,
    header,
  }: {
    driver: WebDriver | BasePage,
    footer: Footer,
    sideMenu: SideMenu,
    header: Header,
  }) {
    super({
      driver,
      verifyOnPageSelector: SELECTOR_PAGE_VERIFIER,
      footer,
      sideMenu,
      header,
    });
  }

  static async initializeAsync(driver: WebDriver | BasePage) : Promise<LicensePage> {
    const footer = Footer.initializeAsync(driver);
    const header = Header.initializeAsync(driver);
    const sideMenu = SideMenu.initializeAsync(driver);

    const page = new LicensePage({
      driver,
      footer: await footer,
      sideMenu: await sideMenu,
      header: await header,
    });
    await page.verifyOnPageAsync();
    return page;
  }

  async getLanguageTextAsync() : Promise<string> {
    return super.getTextAsync(SELECTOR_LANGUAGE_TEST);
  }
}
