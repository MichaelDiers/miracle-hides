// eslint-disable-next-line import/no-extraneous-dependencies
import { WebDriver } from 'selenium-webdriver';
import BasePage from './base-page';
import Footer from './footer';

export default class Page extends BasePage {
  public readonly footer: Footer;

  protected constructor(
    driver: WebDriver | BasePage,
    verifyOnPageSelector: string,
    footer: Footer,
  ) {
    super(driver, verifyOnPageSelector);
    this.footer = footer;
  }
}
