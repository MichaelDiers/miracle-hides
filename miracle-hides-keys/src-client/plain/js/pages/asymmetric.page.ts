import { LanguagePageKeys } from '../translations/language-page';
import { AsymmetricLanguageKeys } from '../translations/language-asymmetric';
import HtmlComponents from './html-components';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import Css from './css';
import PageEvents from './page-events';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from '../translations/language-common';

const enum PageIds {
  EC_NAMED_CURVE_ID = 'ecNamedCurve',
  ERROR_MESSAGE_ID = 'asymmetricErrorMessage',
  GENERATE_FORM_ID = 'generateForm',
  KEY_TYPE_ID = 'type',
  PRIVATE_KEY_ID = 'asymmetricPrivateKey',
  PUBLIC_KEY_ID = 'asymmetricPublicKey',
  RSA_KEY_SIZE_ID = 'rsaKeySize',
  TEST_INPUT_ID = 'testInput',
  TEST_INPUT_ENCRYPTED_ID = 'testInputEncrypted',
  TEST_INPUT_DECRYPTED_ID = 'testInputDecrypted',
}

const enum PageValues {
  EC_NAMED_CURVE_SECT239K1 = 'sect239k1',
  KEY_SIZE_1024 = '1024',
  KEY_SIZE_2048 = '2048',
  KEY_SIZE_4096 = '4096',
  KEY_TYPE_EC = 'EC',
  KEY_TYPE_RSA = 'RSA',
  PRIVATE_KEY_ROWS = '15',
  PUBLIC_KEY_ROWS = '6',
  TEST_INPUT_ROWS = '2',
  TEST_INPUT_ENCRYPTED_ROWS = '2',
  TEST_INPUT_DECRYPTED_ROWS = '2',
}

export default class AsymmetricPage extends AlgorithmBasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.ASYMMETRIC_PAGE,
      {
        keyTypeName: PageIds.KEY_TYPE_ID,
        keyTypeValueNames: [PageIds.RSA_KEY_SIZE_ID, PageIds.EC_NAMED_CURVE_ID],
      },
      PageIds.ERROR_MESSAGE_ID,
      AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      PageEvents.ASYMMETRIC_PAGE,
      {
        privateKeyId: PageIds.PRIVATE_KEY_ID,
        publicKeyId: PageIds.PUBLIC_KEY_ID,
        testInputId: PageIds.TEST_INPUT_ID,
        encryptedId: PageIds.TEST_INPUT_ENCRYPTED_ID,
        decryptedId: PageIds.TEST_INPUT_DECRYPTED_ID,
      },
    );
  }

  protected setupHtml(): string {
    const { source } = this;

    return HtmlComponents.div({
      css: [Css.ASYMMETRIC_COLOR],
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
              label: AsymmetricLanguageKeys.KEY_TYPE,
              source: this.source,
              options: [
                {
                  value: PageValues.KEY_TYPE_EC,
                  source,
                  text: AsymmetricLanguageKeys.KEY_TYPE_EC,
                  isChecked: true,
                },
                {
                  value: PageValues.KEY_TYPE_RSA,
                  source,
                  text: AsymmetricLanguageKeys.KEY_TYPE_RSA,
                },
              ],
            }),
            HtmlComponents.radio({
              id: PageIds.RSA_KEY_SIZE_ID,
              label: AsymmetricLanguageKeys.KEY_SIZE,
              source,
              options: [
                {
                  value: PageValues.KEY_SIZE_1024,
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_1024,
                },
                {
                  value: PageValues.KEY_SIZE_2048,
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_2048,
                  isChecked: true,
                },
                {
                  value: PageValues.KEY_SIZE_4096,
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_4096,
                },
              ],
            }),
            HtmlComponents.radio({
              id: PageIds.EC_NAMED_CURVE_ID,
              label: AsymmetricLanguageKeys.EC_NAMED_CURVE,
              source,
              options: [
                {
                  value: PageValues.EC_NAMED_CURVE_SECT239K1,
                  source,
                  text: AsymmetricLanguageKeys.EC_NAMED_CURVE_SECT239K1,
                  isChecked: true,
                },
              ],
            }),
            HtmlComponents.submit({
              label: AsymmetricLanguageKeys.SUBMIT,
              source,
            }),
            HtmlComponents.textarea({
              id: PageIds.PRIVATE_KEY_ID,
              labelText: AsymmetricLanguageKeys.PRIVATE_KEY,
              labelSource: source,
              placeholderText: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              placeholderSource: source,
              rows: PageValues.PRIVATE_KEY_ROWS,
              readonly: true,
            }),
            HtmlComponents.textarea({
              id: PageIds.PUBLIC_KEY_ID,
              labelText: AsymmetricLanguageKeys.PUBLIC_KEY,
              labelSource: source,
              placeholderText: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              placeholderSource: source,
              rows: PageValues.PUBLIC_KEY_ROWS,
              readonly: true,
            }),
            HtmlComponents.textarea({
              id: PageIds.TEST_INPUT_ID,
              labelText: AsymmetricLanguageKeys.TEST_INPUT,
              labelSource: source,
              placeholderText: AsymmetricLanguageKeys.TEST_INPUT_PLACEHOLDER,
              placeholderSource: source,
              textareaText: CommonLanguageKeys.TEST_INPUT,
              textareaSource: COMMON_LANGUAGE_SOURCE,
              rows: PageValues.TEST_INPUT_ROWS,
              name: PageIds.TEST_INPUT_ID,
              readonly: true,
            }),
            HtmlComponents.textarea({
              id: PageIds.TEST_INPUT_ENCRYPTED_ID,
              labelText: AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED,
              labelSource: source,
              placeholderText: AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED_PLACEHOLDER,
              placeholderSource: source,
              rows: PageValues.TEST_INPUT_ENCRYPTED_ROWS,
              name: '',
              readonly: true,
            }),
            HtmlComponents.textarea({
              id: PageIds.TEST_INPUT_DECRYPTED_ID,
              labelText: AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED,
              labelSource: source,
              placeholderText: AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED_PLACEHOLDER,
              placeholderSource: source,
              rows: PageValues.TEST_INPUT_DECRYPTED_ROWS,
              name: '',
              readonly: true,
            }),
          ],
        }),
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected async updateElementsOnKeyTypeChangedAsync({
    root = document.body,
    checkedElement = document.querySelector(`[name=${PageIds.KEY_TYPE_ID}]:checked`) as HTMLElement,
  }: {
    root?: HTMLElement,
    checkedElement?: HTMLElement,
  }): Promise<void> {
    const value = checkedElement.getAttribute('value');
    if (value === PageValues.KEY_TYPE_RSA) {
      root.querySelectorAll(`#${PageIds.RSA_KEY_SIZE_ID}, label[for=${PageIds.RSA_KEY_SIZE_ID}]`).forEach((elem) => {
        elem.classList.remove('hidden');
      });

      root.querySelectorAll(`#${PageIds.EC_NAMED_CURVE_ID}, label[for=${PageIds.EC_NAMED_CURVE_ID}]`).forEach((elem) => {
        elem.classList.add('hidden');
      });
    } else if (value === PageValues.KEY_TYPE_EC) {
      root.querySelectorAll(`#${PageIds.RSA_KEY_SIZE_ID}, label[for=${PageIds.RSA_KEY_SIZE_ID}]`).forEach((elem) => {
        elem.classList.add('hidden');
      });

      root.querySelectorAll(`#${PageIds.EC_NAMED_CURVE_ID}, label[for=${PageIds.EC_NAMED_CURVE_ID}]`).forEach((elem) => {
        elem.classList.remove('hidden');
      });
    }
  }
}
