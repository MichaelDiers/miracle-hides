// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';
import Header from './header';
import SideMenu from './side-menu';

export default abstract class Page extends BasePage {
  private readonly footer: Footer;

  private readonly sideMenu: SideMenu;

  private readonly header: Header;

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

  async toAsymmetricPageAsync(isMobile: boolean) : Promise<void> {
    return this.header.toAsymmetricPageAsync(isMobile);
  }

  async toLicensePageAsync() : Promise<void> {
    return this.footer.toLicensePageAsync();
  }

  async toSymmetricPageAsync(isMobile: boolean) : Promise<void> {
    return this.header.toSymmetricPageAsync(isMobile);
  }

  async toggleLanguageAsync() : Promise<void> {
    await this.sideMenu.toggleLanguageAsync();
  }

  async toggleThemeAsync() : Promise<void> {
    await this.sideMenu.toggleThemeAsync();
  }
}
