import Logger from '../infrastructure/logger';
import { LicenseLanguageKeys } from '../translations/language-license';
import Translator from '../translations/translator';
import BasePage from './base-page';
import HtmlComponents from './html-components';
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
    return HtmlComponents.div({
      content: [
        HtmlComponents.h1({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES,
        }),
        HtmlComponents.h2({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES_NODE,
        }),
        LICENSE_DATA_NODE,
        HtmlComponents.h1({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES_FONTS,
        }),
        LICENSE_DATA_FONTS,
      ],
    });
  }
}
