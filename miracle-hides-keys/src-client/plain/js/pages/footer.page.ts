import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import Logger from '../infrastructure/logger';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from '../translations/language-common';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import Translator from '../translations/translator';
import BasePage from './base-page';
import Css from './css';
import HtmlComponents from './html-components';
import PageEvents from './page-events';

export default class FooterPage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.FOOTER_PAGE,
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
    element.querySelectorAll(`.${Css.FOOTER_LINK}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();

        const view = (e.target as HTMLElement).getAttribute('view');
        CustomEventRaiser.raise(view);
      });
    });

    element.querySelectorAll(`.${Css.LANGUAGE_TOGGLE}`).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();

        const lang = document.body.getAttribute('lang');
        const langToggle = document.body.getAttribute('lang-toggle');
        document.body.setAttribute('lang', langToggle);
        document.body.setAttribute('lang-toggle', lang);

        (e.target as HTMLElement).setAttribute(
          'translationValue',
          `${PageEvents.FOOTER_PAGE}.${lang}.${TRANSLATION_DESTINATION_TEXT_CONTENT}`,
        );

        this.translateAsync(document.body).catch((err) => this.exception(err.message, err.stack));
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    const label = document.body.getAttribute('lang-toggle');

    return [
      HtmlComponents.button({
        css: [Css.LANGUAGE_TOGGLE],
        source: PageEvents.FOOTER_PAGE,
        text: label,
      }),
      HtmlComponents.button({
        css: [Css.FOOTER_LINK],
        view: PageEvents.LICENSE_PAGE,
        source: COMMON_LANGUAGE_SOURCE,
        text: CommonLanguageKeys.LICENSES,
      }),
    ].join('');
  }
}
