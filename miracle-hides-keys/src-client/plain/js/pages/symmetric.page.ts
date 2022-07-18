import { LanguagePageKeys } from '../translations/language-page';
import HtmlComponents from './html-components';
import { SymmetricLanguageKeys } from '../translations/language-symmetric';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import Css from './css';

const AES_KEY_SIZE_ID = 'aesKeySize';

const ERROR_MESSAGE_ID = 'symmetricErrorMessage';

const GENERATE_FORM_ID = 'generateForm';

const HMAC_KEY_SIZE_ID = 'hmacKeySize';

const HMAC_KEY_SIZE_DEFAULT = '128';

const HMAC_KEY_SIZE_MIN = '8';

const HMAC_KEY_SIZE_MAX = '9999999999';

const KEY_TYPE_ID = 'type';

const KEY_TYPE_OPTION_AES = 'AES';

const KEY_TYPE_OPTION_HMAC = 'HMAC';

const PRIVATE_KEY_ID = 'symmetricPrivateKey';

export const SymmetricPageEvent = 'symmetricPage';

export class SymmetricPage extends AlgorithmBasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      SymmetricPageEvent,
      [
        { id: AES_KEY_SIZE_ID, value: KEY_TYPE_OPTION_AES },
        { id: HMAC_KEY_SIZE_ID, value: KEY_TYPE_OPTION_HMAC },
      ],
      KEY_TYPE_ID,
      ERROR_MESSAGE_ID,
      SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      SymmetricPageEvent,
      PRIVATE_KEY_ID,
    );
  }

  protected setupHtml(): string {
    const { source } = this;
    return HtmlComponents.div({
      css: [Css.SYMMETRIC_COLOR],
      content: [
        HtmlComponents.h1({ source, value: LanguagePageKeys.HEADLINE }),
        HtmlComponents.div({ id: ERROR_MESSAGE_ID }),
        HtmlComponents.form({
          action: '/keys',
          id: GENERATE_FORM_ID,
          method: 'post',
          content: [
            HtmlComponents.radio({
              id: KEY_TYPE_ID,
              label: SymmetricLanguageKeys.KEY_TYPE,
              source: this.source,
              options: [
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.KEY_TYPE_AES,
                  value: KEY_TYPE_OPTION_AES,
                  isChecked: true,
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.KEY_TYPE_HMAC,
                  value: KEY_TYPE_OPTION_HMAC,
                },
              ]
            }),
            HtmlComponents.radio({
              id: AES_KEY_SIZE_ID,
              label: SymmetricLanguageKeys.AES_KEY_SIZE,
              source,
              options: [
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_128,
                  value: '128',
                  isChecked: true,
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_192,
                  value: '192',
                },
                {
                  source: this.source,
                  text: SymmetricLanguageKeys.AES_KEY_SIZE_256,
                  value: '256',
                },
              ],
            }),
            HtmlComponents.inputNumber({
              id: HMAC_KEY_SIZE_ID,
              label: SymmetricLanguageKeys.HMAC_KEY_SIZE,
              source: this.source,
              min: HMAC_KEY_SIZE_MIN,
              max: HMAC_KEY_SIZE_MAX,
              value: HMAC_KEY_SIZE_DEFAULT,
            }),
            HtmlComponents.submit({
              label: SymmetricLanguageKeys.SUBMIT,
              source,
            }),
            HtmlComponents.textarea({
              id: PRIVATE_KEY_ID,
              label: SymmetricLanguageKeys.PRIVATE_KEY,
              placeholder: SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              source,
              rows: '3',
            }),
          ],
        }),
      ]
    });
  }

  protected setupEvents(element: HTMLElement): void {
    super.setupEvents(element);

    element.querySelectorAll(`[name=${KEY_TYPE_ID}]`).forEach((radio) => {
      radio.addEventListener('change', (e) => {
        const promises = [
          this.updateElementsOnKeyTypeChangedAsync({ checkedElement: e.target as HTMLElement }),
          this.submitFormAsync().catch((err) => this.exception(err.message, err.stack))
        ];

        Promise.all(promises).catch((err) => this.exception(err.message, err.stack));
      });
    });
  }

  protected async updateElementsOnKeyTypeChangedAsync({
    root = document.body,
    checkedElement = document.querySelector(`[name='${KEY_TYPE_ID}']:checked`),
  }: {
    root?: HTMLElement,
    checkedElement?: HTMLElement,
  }): Promise<void> {
    const checkedValue = checkedElement.getAttribute('value');

    [
      { value: KEY_TYPE_OPTION_AES, selector: `label[for=${AES_KEY_SIZE_ID}], #${AES_KEY_SIZE_ID}` },
      { value: KEY_TYPE_OPTION_HMAC, selector: `label[for=${HMAC_KEY_SIZE_ID}], #${HMAC_KEY_SIZE_ID}` },
    ].forEach(({ value, selector }) => {
      if (value === checkedValue) {
        root.querySelectorAll(selector).forEach((elem) => elem.classList.remove('hidden'));
      } else {
        root.querySelectorAll(selector).forEach((elem) => elem.classList.add('hidden'));
      }
    });
  }
}
