import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import Logger from '../infrastructure/logger';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from '../translations/language-common';
import Translator from '../translations/translator';
import { AsymmetricPageEvent } from './asymmetric.page';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import { SymmetricPageEvent } from './symmetric.page';

export const WelcomePageEvent : string = 'welcomePage';

export class WelcomePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      WelcomePageEvent,
    );
  }
  
  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'main';
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    await super.initializeOnDisplayAsync();
    ['header', 'footer'].forEach((selector) => {
      const element = document.querySelector(selector);
      element.classList.add('hidden');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupEvents(element: HTMLElement): void {
    element.querySelector('.asymmetric button').addEventListener('click', (e) => {
      e.preventDefault();
      CustomEventRaiser.raise(AsymmetricPageEvent);
    });

    element.querySelector('.symmetric button').addEventListener('click', (e) => {
      e.preventDefault();
      CustomEventRaiser.raise(SymmetricPageEvent);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return [
      HtmlComponents.h1({
        source: COMMON_LANGUAGE_SOURCE,
        value: CommonLanguageKeys.MIRACLE_HIDES_KEYS,
      }),
      HtmlComponents.div({
        css: ['asymmetric'],
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
        css: ['symmetric'],
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
    ].join('');
  }
}
