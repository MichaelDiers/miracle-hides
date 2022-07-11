import Ajax from '../infrastructure/ajax';
import { LanguagePageKeys } from '../translations/language-page';
import { AsymmetricLanguageKeys } from '../translations/language-asymmetric';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import HtmlHelper from './html-helper';
import KeysResponse from './keys-response';

const EC_NAMED_CURVE_ID = 'ecNamedCurve';

const EC_NAMED_CURVE_SECT239K1 = 'sect239k1';

const ERROR_MESSAGE_ID = 'errorMessage';

const GENERATE_FORM_ID = 'generateForm';

const KEY_TYPE_ID = 'type';

const KEY_TYPE_EC = 'EC';

const KEY_TYPE_RSA = 'RSA';

const PRIVATE_KEY_ID = 'privateKey';

const PUBLIC_KEY_ID = 'publicKey';

const RSA_KEY_SIZE_ID = 'rsaKeySize';

export default class AsymmetricPage extends BasePage {
  async initializeOnDisplayAsync() : Promise<void> {
    return this.submitFormAsync();
  }

  // eslint-disable-next-line class-methods-use-this
  setupEvents(element: HTMLElement) : void {
    element.querySelector(`#${GENERATE_FORM_ID}`).addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById(PRIVATE_KEY_ID).textContent = '';
      document.getElementById(PUBLIC_KEY_ID).textContent = '';

      Ajax.sendFormAsync({ formElement: e.target as HTMLFormElement })
        .then(({ data, success }) => {
          if (!success || !data) {
            this.setErrorAsync()
              .catch((err) => this.exception(err.message, err.stack));
          } else {
            const { privateKey, publicKey } = data as KeysResponse;
            document.getElementById(PRIVATE_KEY_ID).textContent = privateKey;
            document.getElementById(PUBLIC_KEY_ID).textContent = publicKey;
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
      document.getElementById(PUBLIC_KEY_ID).textContent = '';

      AsymmetricPage.handleKeyTypeAndSize(
        document.body,
        e.target as HTMLSelectElement,
      );
    });

    element.querySelectorAll(
      `#${KEY_TYPE_ID}, #${RSA_KEY_SIZE_ID}, #${EC_NAMED_CURVE_ID}`,
    ).forEach((selectElement) => {
      selectElement.addEventListener('change', () => {
        this.submitFormAsync()
          .catch((err) => this.exception(err.message, err.stack));
      });
    });

    AsymmetricPage.handleKeyTypeAndSize(
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
        label: AsymmetricLanguageKeys.KEY_TYPE,
        source: this.source,
        options: [
          HtmlComponents.selectOption(
            KEY_TYPE_EC,
            AsymmetricLanguageKeys.KEY_TYPE_EC,
            this.source,
          ),
          HtmlComponents.selectOption(
            KEY_TYPE_RSA,
            AsymmetricLanguageKeys.KEY_TYPE_RSA,
            this.source,
          ),
        ],
      }),
      HtmlComponents.select({
        id: RSA_KEY_SIZE_ID,
        label: AsymmetricLanguageKeys.KEY_SIZE,
        placeholder: AsymmetricLanguageKeys.KEY_SIZE,
        source,
        options: [
          HtmlComponents.selectOption('1024', AsymmetricLanguageKeys.KEY_SIZE_1024, source),
          HtmlComponents.selectOption('2048', AsymmetricLanguageKeys.KEY_SIZE_2048, source),
          HtmlComponents.selectOption('4096', AsymmetricLanguageKeys.KEY_SIZE_4096, source),
        ],
      }),
      HtmlComponents.select({
        id: EC_NAMED_CURVE_ID,
        label: AsymmetricLanguageKeys.EC_NAMED_CURVE,
        source: this.source,
        options: [
          HtmlComponents.selectOption(
            EC_NAMED_CURVE_SECT239K1,
            AsymmetricLanguageKeys.EC_NAMED_CURVE_SECT239K1,
            this.source,
          ),
        ],
      }),
      HtmlComponents.submit({
        label: AsymmetricLanguageKeys.SUBMIT,
        source,
      }),
    ],
  })}
      ${HtmlComponents.textarea({
    id: PRIVATE_KEY_ID,
    label: AsymmetricLanguageKeys.PRIVATE_KEY,
    placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
    source,
    rows: '15',
  })}
      ${HtmlComponents.textarea({
    id: PUBLIC_KEY_ID,
    label: AsymmetricLanguageKeys.PUBLIC_KEY,
    placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
    source,
    rows: '6',
  })}
    `;
  }

  private static handleKeyTypeAndSize(root: HTMLElement, element: HTMLSelectElement) : void {
    if (element.value === KEY_TYPE_EC) {
      root.querySelector(`#${RSA_KEY_SIZE_ID}`).classList.add('hidden');
      root.querySelector(`label[for=${RSA_KEY_SIZE_ID}]`).classList.add('hidden');

      root.querySelector(`#${EC_NAMED_CURVE_ID}`).classList.remove('hidden');
      root.querySelector(`label[for=${EC_NAMED_CURVE_ID}]`).classList.remove('hidden');
    } else if (element.value === KEY_TYPE_RSA) {
      root.querySelector(`#${RSA_KEY_SIZE_ID}`).classList.remove('hidden');
      root.querySelector(`label[for=${RSA_KEY_SIZE_ID}]`).classList.remove('hidden');

      root.querySelector(`#${EC_NAMED_CURVE_ID}`).classList.add('hidden');
      root.querySelector(`label[for=${EC_NAMED_CURVE_ID}]`).classList.add('hidden');
    }
  }

  private setErrorAsync() : Promise<void> {
    const errorElement = document.getElementById(ERROR_MESSAGE_ID);
    HtmlHelper.addTranslationValue({
      element: errorElement,
      source: this.source,
      value: AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });

    return this.translateAsync(errorElement);
  }

  private async submitFormAsync() : Promise<void> {
    const formElement = document.getElementById(GENERATE_FORM_ID) as HTMLFormElement;

    document.querySelector(`#${PRIVATE_KEY_ID}`).textContent = '';
    document.querySelector(`#${PUBLIC_KEY_ID}`).textContent = '';

    Ajax.sendFormAsync({ formElement })
      .then(({ data, success }) => {
        if (!success || !data) {
          this.setErrorAsync().catch((err) => this.exception(err.message, err.stack));
        } else {
          const { privateKey, publicKey } = data as KeysResponse;
          document.querySelector(`#${PRIVATE_KEY_ID}`).textContent = privateKey;
          document.querySelector(`#${PUBLIC_KEY_ID}`).textContent = publicKey;
        }
      })
      .catch((err) => {
        this.exception(err.message, err.stack);
        this.setErrorAsync().catch((error) => this.exception(error.message, error.stack));
      });
  }
}
