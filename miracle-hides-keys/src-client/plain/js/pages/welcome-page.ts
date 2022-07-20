import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import Logger from '../infrastructure/logger';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from '../translations/language-common';
import Translator from '../translations/translator';
import BasePage from './base-page';
import Css from './css';
import HtmlComponents from './html-components';
import PageEvents from './page-events';

export default class WelcomePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.WELCOME_PAGE,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'main';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    await super.initializeOnDisplayAsync();
    ['header'].forEach((selector) => {
      const element = document.querySelector(selector);
      element.classList.add(Css.HIDDEN);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupEvents(element: HTMLElement): void {
    element.querySelector('.asymmetric-color button').addEventListener('click', (e) => {
      e.preventDefault();
      CustomEventRaiser.raise(PageEvents.ASYMMETRIC_PAGE);
    });

    element.querySelector('.symmetric-color button').addEventListener('click', (e) => {
      e.preventDefault();
      CustomEventRaiser.raise(PageEvents.SYMMETRIC_PAGE);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return HtmlComponents.div({
      css: [Css.WELCOME],
      content: [

        HtmlComponents.h1({
          source: COMMON_LANGUAGE_SOURCE,
          value: CommonLanguageKeys.MIRACLE_HIDES_KEYS,
        }),
        HtmlComponents.div({
          css: [Css.ASYMMETRIC_COLOR],
          content: [
            HtmlComponents.h2({
              source: COMMON_LANGUAGE_SOURCE,
              value: CommonLanguageKeys.ASYMMETRIC_ENCRYPTION,
            }),
            HtmlComponents.list({
              items: [
                HtmlComponents.listItem({
                  source: COMMON_LANGUAGE_SOURCE,
                  label: CommonLanguageKeys.ALGORITHM_EC,
                }),
                HtmlComponents.listItem({
                  source: COMMON_LANGUAGE_SOURCE,
                  label: CommonLanguageKeys.ALGORITHM_RSA,
                }),
              ],
            }),
            HtmlComponents.button({
              source: COMMON_LANGUAGE_SOURCE,
              text: CommonLanguageKeys.GENERATE,
            }),
          ],
        }),
        HtmlComponents.div({
          css: [Css.SYMMETRIC_COLOR],
          content: [
            HtmlComponents.h2({
              source: COMMON_LANGUAGE_SOURCE,
              value: CommonLanguageKeys.SYMMETRIC_ENCRYPTION,
            }),
            HtmlComponents.list({
              items: [
                HtmlComponents.listItem({
                  source: COMMON_LANGUAGE_SOURCE,
                  label: CommonLanguageKeys.ALGORITHM_AES,
                }),
                HtmlComponents.listItem({
                  source: COMMON_LANGUAGE_SOURCE,
                  label: CommonLanguageKeys.ALGORITHM_HMAC,
                }),
              ],
            }),
            HtmlComponents.button({
              source: COMMON_LANGUAGE_SOURCE,
              text: CommonLanguageKeys.GENERATE,
            }),
          ],
        }),
      ]
    });
  }
}
