import CustomEventRaiser from '../infrastructure/custom-event-raiser';
import { COMMON_SOURCE } from '../translations/language';
import { CommonLanguageKeys } from '../translations/language-common';
import AsymmetricPage from './asymmetric.page';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import SymmetricPage from './symmetric.page';

export default class WelcomePage extends BasePage {
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
      CustomEventRaiser.raise(AsymmetricPage.name);
    });

    element.querySelector('.symmetric button').addEventListener('click', (e) => {
      e.preventDefault();
      CustomEventRaiser.raise(SymmetricPage.name);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return [
      HtmlComponents.h1({
        source: COMMON_SOURCE,
        value: CommonLanguageKeys.MIRACLE_HIDES_KEYS,
      }),
      HtmlComponents.div({
        css: ['asymmetric'],
        content: [
          HtmlComponents.h2({
            source: COMMON_SOURCE,
            value: CommonLanguageKeys.ASYMMETRIC_ENCRYPTION,
          }),
          HtmlComponents.list({
            items: [
              HtmlComponents.listItem({
                source: COMMON_SOURCE,
                label: CommonLanguageKeys.ALGORITHM_EC,
              }),
              HtmlComponents.listItem({
                source: COMMON_SOURCE,
                label: CommonLanguageKeys.ALGORITHM_RSA,
              }),
            ],
          }),
          HtmlComponents.button({
            source: COMMON_SOURCE,
            text: CommonLanguageKeys.GENERATE,
          }),
        ],
      }),
      HtmlComponents.div({
        css: ['symmetric'],
        content: [
          HtmlComponents.h2({
            source: COMMON_SOURCE,
            value: CommonLanguageKeys.SYMMETRIC_ENCRYPTION,
          }),
          HtmlComponents.list({
            items: [
              HtmlComponents.listItem({
                source: COMMON_SOURCE,
                label: CommonLanguageKeys.ALGORITHM_AES,
              }),
              HtmlComponents.listItem({
                source: COMMON_SOURCE,
                label: CommonLanguageKeys.ALGORITHM_HMAC,
              }),
            ],
          }),
          HtmlComponents.button({
            source: COMMON_SOURCE,
            text: CommonLanguageKeys.GENERATE,
          }),
        ],
      }),
    ].join('');
  }
}
