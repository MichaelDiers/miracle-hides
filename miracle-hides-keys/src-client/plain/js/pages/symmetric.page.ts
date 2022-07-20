import { LanguagePageKeys } from '../translations/language-page';
import HtmlComponents from './html-components';
import { SymmetricLanguageKeys } from '../translations/language-symmetric';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import Css from './css';
import PageEvents from './page-events';

const enum PageIds {
  AES_KEY_SIZE_ID = 'aesKeySize',
  ERROR_MESSAGE_ID = 'symmetricErrorMessage',
  GENERATE_FORM_ID = 'generateForm',
  HMAC_KEY_SIZE_ID = 'hmacKeySize',
  KEY_TYPE_ID = 'type',
  PRIVATE_KEY_ID = 'symmetricPrivateKey',
}

const enum PageValues {
  AES_KEY_SIZE_128 = '128',
  AES_KEY_SIZE_196 = '196',
  AES_KEY_SIZE_256 = '256',
  HMAC_KEY_SIZE_DEFAULT = '128',
  HMAC_KEY_SIZE_MIN = '8',
  HMAC_KEY_SIZE_MAX = '9999999999',
  KEY_TYPE_OPTION_AES = 'AES',
  KEY_TYPE_OPTION_HMAC = 'HMAC',
  PRIVATE_KEY_ROWS = '3',
}

export default class SymmetricPage extends AlgorithmBasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.SYMMETRIC_PAGE,
      {
        keyTypeName: PageIds.KEY_TYPE_ID,
        keyTypeValueNames: [PageIds.AES_KEY_SIZE_ID, PageIds.HMAC_KEY_SIZE_ID],
      },
      PageIds.ERROR_MESSAGE_ID,
      SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      PageEvents.SYMMETRIC_PAGE,
      {
        privateKeyId: PageIds.PRIVATE_KEY_ID,
      },
    );
  }

  protected setupHtml(): string {
    const { source } = this;
    return HtmlComponents.div({
      css: [Css.SYMMETRIC_COLOR],
      content: [
        HtmlComponents.h1({ source, value: LanguagePageKeys.HEADLINE }),
        HtmlComponents.div({ id: PageIds.ERROR_MESSAGE_ID }),
        HtmlComponents.form({
          action: '/keys',
          id: PageIds.GENERATE_FORM_ID,
          method: 'post',
          content: [
            HtmlComponents.radio({
              id: PageIds.KEY_TYPE_ID,
              label: SymmetricLanguageKeys.KEY_TYPE,
              source: this.source,
              options: [
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.KEY_TYPE_AES,
                  value: PageValues.KEY_TYPE_OPTION_AES,
                  isChecked: true,
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.KEY_TYPE_HMAC,
                  value: PageValues.KEY_TYPE_OPTION_HMAC,
                },
              ],
            }),
            HtmlComponents.radio({
              id: PageIds.AES_KEY_SIZE_ID,
              label: SymmetricLanguageKeys.AES_KEY_SIZE,
              source,
              options: [
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_128,
                  value: PageValues.AES_KEY_SIZE_128,
                  isChecked: true,
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_192,
                  value: PageValues.AES_KEY_SIZE_196,
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_256,
                  value: PageValues.AES_KEY_SIZE_256,
                },
              ],
            }),
            HtmlComponents.inputNumber({
              id: PageIds.HMAC_KEY_SIZE_ID,
              label: SymmetricLanguageKeys.HMAC_KEY_SIZE,
              source: this.source,
              min: PageValues.HMAC_KEY_SIZE_MIN,
              max: PageValues.HMAC_KEY_SIZE_MAX,
              value: PageValues.HMAC_KEY_SIZE_DEFAULT,
            }),
            HtmlComponents.submit({
              label: SymmetricLanguageKeys.SUBMIT,
              source,
            }),
            HtmlComponents.textarea({
              id: PageIds.PRIVATE_KEY_ID,
              labelText: SymmetricLanguageKeys.PRIVATE_KEY,
              labelSource: source,
              placeholderText: SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              placeholderSource: source,
              rows: PageValues.PRIVATE_KEY_ROWS,
            }),
          ],
        }),
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected async updateElementsOnKeyTypeChangedAsync({
    root = document.body,
    checkedElement = document.querySelector(`[name='${PageIds.KEY_TYPE_ID}']:checked`),
  }: {
    root?: HTMLElement,
    checkedElement?: HTMLElement,
  }): Promise<void> {
    const checkedValue = checkedElement.getAttribute('value');

    [
      { value: PageValues.KEY_TYPE_OPTION_AES, selector: `label[for=${PageIds.AES_KEY_SIZE_ID}], #${PageIds.AES_KEY_SIZE_ID}` },
      { value: PageValues.KEY_TYPE_OPTION_HMAC, selector: `label[for=${PageIds.HMAC_KEY_SIZE_ID}], #${PageIds.HMAC_KEY_SIZE_ID}` },
    ].forEach(({ value, selector }) => {
      if (value === checkedValue) {
        root.querySelectorAll(selector).forEach((elem) => elem.classList.remove('hidden'));
      } else {
        root.querySelectorAll(selector).forEach((elem) => elem.classList.add('hidden'));
      }
    });
  }
}
