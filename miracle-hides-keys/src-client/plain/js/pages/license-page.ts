import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';
import { LICENSE_DATA_FONTS, LICENSE_DATA_NODE } from './license-data';
import PageEvents from './page-events';

export default class LicensePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.LICENSE_PAGE,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'main';
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected setupEvents(element: HTMLElement): void {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return [
      '<h1>Lizenzen</h1>',
      '<h2>Software</h2>',
      LICENSE_DATA_NODE,
      '<h2>Fonts</h2>',
      LICENSE_DATA_FONTS,
    ].join('');
  }
}
