// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Header from './header';
import SideMenu from './side-menu';

export default abstract class Page extends BasePage {
  public readonly footer: Footer;

  public readonly sideMenu: SideMenu;

  protected readonly header: Header;

  protected constructor({
    driver,
    verifyOnPageSelector,
    footer,
    sideMenu,
    header,
  } : {
    driver: WebDriver | BasePage,
    verifyOnPageSelector: string,
    footer: Footer,
    sideMenu: SideMenu,
    header?: Header,
  }) {
    super(driver, verifyOnPageSelector);
    this.footer = footer;
    this.header = header;
    this.sideMenu = sideMenu;
  }

  async getBackgroundColorAsync() : Promise<string> {
    return super.getBackgroundColorAsync('body');
  }

  abstract getLanguageTextAsync() : Promise<string>;
}
