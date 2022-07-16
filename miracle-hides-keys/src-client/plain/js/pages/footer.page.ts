import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import Logger from '../infrastructure/logger';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from '../translations/language-common';
import Translator from '../translations/translator';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import { LicensePageEvent } from './license-page';

export const FooterPageEvent = 'footerPage';

export class FooterPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      FooterPageEvent,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'footer';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected setupEvents(element: HTMLElement): void {
    element.querySelectorAll('a').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.target as HTMLElement).getAttribute('href');
        CustomEventRaiser.raise(href);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return [
      HtmlComponents.anchor({
        href: LicensePageEvent,
        source: COMMON_LANGUAGE_SOURCE,
        label: CommonLanguageKeys.LICENSES,
      }),
    ].join('');
  }
}
