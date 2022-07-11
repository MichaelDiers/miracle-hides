import Ajax from '../infrastructure/ajax';
import { LanguagePageKeys } from '../translations/language-page';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import HtmlHelper from './html-helper';
import KeysResponse from './keys-response';
import { SymmetricLanguageKeys } from '../translations/language-symmetric';

const AES_KEY_SIZE_ID = 'aesKeySize';

const ERROR_MESSAGE_ID = 'errorMessage';

const GENERATE_FORM_ID = 'generateForm';

const HMAC_KEY_SIZE_ID = 'hmacKeySize';

const HMAC_KEY_SIZE_DEFAULT = '128';

const HMAC_KEY_SIZE_MIN = '8';

const HMAC_KEY_SIZE_MAX = '9999999999';

const KEY_TYPE_ID = 'type';

const KEY_TYPE_OPTION_AES = 'AES';

const KEY_TYPE_OPTION_HMAC = 'HMAC';

const PRIVATE_KEY_ID = 'privateKey';

export default class SymmetricPage extends BasePage {
  async initializeOnDisplayAsync() : Promise<void> {
    return this.submitFormAsync();
  }

  // eslint-disable-next-line class-methods-use-this
  setupEvents(element: HTMLElement) : void {
    element.querySelector(`#${GENERATE_FORM_ID}`).addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById(PRIVATE_KEY_ID).textContent = '';

      Ajax.sendFormAsync({ formElement: e.target as HTMLFormElement })
        .then(({ data, success }) => {
          if (!success || !data) {
            this.setErrorAsync()
              .catch((err) => this.exception(err.message, err.stack));
          } else {
            const { privateKey } = data as KeysResponse;
            document.getElementById(PRIVATE_KEY_ID).textContent = privateKey;
          }
        })
        .catch((err) => {
          this.exception(err.message, err.stack);
          this.setErrorAsync()
            .catch((error) => this.exception(error.message, error.stack));
        });
    });

    element.querySelector(`#${KEY_TYPE_ID}`).addEventListener('change', (e) => {
      document.getElementById(PRIVATE_KEY_ID).textContent = '';

      SymmetricPage.handleKeyTypeAndSize(
        document.body,
        e.target as HTMLSelectElement,
      );
    });

    element.querySelectorAll(
      `#${KEY_TYPE_ID}, #${AES_KEY_SIZE_ID}, #${HMAC_KEY_SIZE_ID}`,
    ).forEach((selectElement) => {
      selectElement.addEventListener('change', () => {
        this.submitFormAsync()
          .catch((err) => this.exception(err.message, err.stack));
      });
    });

    SymmetricPage.handleKeyTypeAndSize(
      element,
      element.querySelector(`#${KEY_TYPE_ID}`) as HTMLSelectElement,
    );
  }

  setupHtml() : string {
    const { source } = this;

    return `
      ${HtmlComponents.h1({ source, value: LanguagePageKeys.HEADLINE })}
      ${HtmlComponents.div({ id: ERROR_MESSAGE_ID })}
      ${HtmlComponents.form({
    action: '/keys',
    id: GENERATE_FORM_ID,
    method: 'post',
    content: [
      HtmlComponents.select({
        id: KEY_TYPE_ID,
        label: SymmetricLanguageKeys.KEY_TYPE,
        source: this.source,
        options: [
          HtmlComponents.selectOption(
            KEY_TYPE_OPTION_AES,
            SymmetricLanguageKeys.KEY_TYPE_AES,
            this.source,
          ),
          HtmlComponents.selectOption(
            KEY_TYPE_OPTION_HMAC,
            SymmetricLanguageKeys.KEY_TYPE_HMAC,
            this.source,
          ),
        ],
      }),
      HtmlComponents.select({
        id: AES_KEY_SIZE_ID,
        label: SymmetricLanguageKeys.AES_KEY_SIZE,
        placeholder: SymmetricLanguageKeys.AES_KEY_SIZE_PLACEHOLDER,
        source,
        options: [
          HtmlComponents.selectOption('128', SymmetricLanguageKeys.AES_KEY_SIZE_128, source),
          HtmlComponents.selectOption('192', SymmetricLanguageKeys.AES_KEY_SIZE_192, source),
          HtmlComponents.selectOption('256', SymmetricLanguageKeys.AES_KEY_SIZE_256, source),
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
    ],
  })}
      ${HtmlComponents.textarea({
    id: PRIVATE_KEY_ID,
    label: SymmetricLanguageKeys.PRIVATE_KEY,
    placeholder: SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
    source,
    rows: '15',
  })}
    `;
  }

  private static handleKeyTypeAndSize(root: HTMLElement, element: HTMLSelectElement) : void {
    if (element.value === KEY_TYPE_OPTION_AES) {
      root.querySelector(`#${HMAC_KEY_SIZE_ID}`).classList.add('hidden');
      root.querySelector(`label[for=${HMAC_KEY_SIZE_ID}]`).classList.add('hidden');

      root.querySelector(`#${AES_KEY_SIZE_ID}`).classList.remove('hidden');
      root.querySelector(`label[for=${AES_KEY_SIZE_ID}]`).classList.remove('hidden');
    } else if (element.value === KEY_TYPE_OPTION_HMAC) {
      root.querySelector(`#${HMAC_KEY_SIZE_ID}`).classList.remove('hidden');
      root.querySelector(`label[for=${HMAC_KEY_SIZE_ID}]`).classList.remove('hidden');

      root.querySelector(`#${AES_KEY_SIZE_ID}`).classList.add('hidden');
      root.querySelector(`label[for=${AES_KEY_SIZE_ID}]`).classList.add('hidden');
    }
  }

  private setErrorAsync() : Promise<void> {
    const errorElement = document.getElementById(ERROR_MESSAGE_ID);
    HtmlHelper.addTranslationValue({
      element: errorElement,
      source: this.source,
      value: SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });

    return this.translateAsync(errorElement);
  }

  private async submitFormAsync() : Promise<void> {
    const formElement = document.getElementById(GENERATE_FORM_ID) as HTMLFormElement;

    document.querySelector(`#${PRIVATE_KEY_ID}`).textContent = '';

    Ajax.sendFormAsync({ formElement })
      .then(({ data, success }) => {
        if (!success || !data) {
          this.setErrorAsync().catch((err) => this.exception(err.message, err.stack));
        } else {
          const { privateKey } = data as KeysResponse;
          document.querySelector(`#${PRIVATE_KEY_ID}`).textContent = privateKey;
        }
      })
      .catch((err) => {
        this.exception(err.message, err.stack);
        this.setErrorAsync().catch((error) => this.exception(error.message, error.stack));
      });
  }
}
