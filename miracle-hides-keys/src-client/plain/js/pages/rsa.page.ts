import Ajax from '../infrastructure/ajax';
import { LanguagePageKeys } from '../translations/language-page';
import { RsaLanguageKeys } from '../translations/language-rsa';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import HtmlHelper from './html-helper';
import KeysResponse from './keys-response';

const ERROR_MESSAGE_ID = 'errorMessage';

const PRIVATE_KEY_ID = 'privateKey';

const PUBLIC_KEY_ID = 'publicKey';

const GENERATE_FORM_ID = 'generateForm';

const RSA_KEY_SIZE_ID = 'rsaKeySize';

const KEY_TYPE_ID = 'type';

export default class RsaPage extends BasePage {
  // eslint-disable-next-line class-methods-use-this
  setupEvents(element: HTMLElement) : void {
    element.querySelector(`#${GENERATE_FORM_ID}`).addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById(PRIVATE_KEY_ID).textContent = '';
      document.getElementById(PUBLIC_KEY_ID).textContent = '';

      Ajax.sendFormAsync({ formElement: e.target as HTMLFormElement })
        .then(({ data, success }) => {
          if (!success || !data) {
            this.setErrorAsync().catch((err) => console.error(err));
          } else {
            const { privateKey, publicKey } = data as KeysResponse;
            document.getElementById(PRIVATE_KEY_ID).textContent = privateKey;
            document.getElementById(PUBLIC_KEY_ID).textContent = publicKey;
          }
        })
        .catch((err) => {
          console.error(err);
          this.setErrorAsync().catch((error) => console.error(error));
        });
    });
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
      HtmlComponents.inputHidden({ id: KEY_TYPE_ID, value: 'RSA' }),
      HtmlComponents.select({
        id: RSA_KEY_SIZE_ID,
        label: RsaLanguageKeys.KEY_SIZE,
        placeholder: RsaLanguageKeys.KEY_SIZE,
        source,
        options: [
          HtmlComponents.selectOption('1024', RsaLanguageKeys.KEY_SIZE_1024, source),
          HtmlComponents.selectOption('2048', RsaLanguageKeys.KEY_SIZE_2048, source),
          HtmlComponents.selectOption('4096', RsaLanguageKeys.KEY_SIZE_4096, source),
        ],
      }),
      HtmlComponents.submit({
        label: RsaLanguageKeys.SUBMIT,
        source,
      }),
    ],
  })}
      ${HtmlComponents.textarea({
    id: PRIVATE_KEY_ID,
    label: RsaLanguageKeys.PRIVATE_KEY,
    placeholder: RsaLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
    source,
    rows: '15',
  })}
      ${HtmlComponents.textarea({
    id: PUBLIC_KEY_ID,
    label: RsaLanguageKeys.PUBLIC_KEY,
    placeholder: RsaLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
    source,
    rows: '6',
  })}
    `;
  }

  private setErrorAsync() : Promise<void> {
    const errorElement = document.getElementById(ERROR_MESSAGE_ID);
    HtmlHelper.addTranslationValue({
      element: errorElement,
      source: this.source,
      value: RsaLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });

    return this.translateAsync(errorElement);
  }
}
