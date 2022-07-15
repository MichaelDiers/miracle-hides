import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import { LICENSE_DATA_FONTS, LICENSE_DATA_NODE } from './license-data';

export const LicensePageEvent = 'licensePage';

export class LicensePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      LicensePageEvent,
    );
  }
  
  protected get displayInRegion(): string {
    return 'main';
  }
  protected setupEvents(element: HTMLElement): void {
    return;
  }
  protected setupHtml(): string {
    return [
      '<h1>Lizenzen</h1>',
      '<h2>Software</h2>',
      LICENSE_DATA_NODE,
      '<h2>Fonts</h2>',
      LICENSE_DATA_FONTS
    ].join('');
  }
}
