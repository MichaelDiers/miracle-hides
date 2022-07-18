import { LanguagePageKeys } from '../translations/language-page';
import { AsymmetricLanguageKeys } from '../translations/language-asymmetric';
import HtmlComponents from './html-components';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import Css from './css';

const EC_NAMED_CURVE_ID = 'ecNamedCurve';

const EC_NAMED_CURVE_SECT239K1 = 'sect239k1';

const ERROR_MESSAGE_ID = 'asymmetricErrorMessage';

const GENERATE_FORM_ID = 'generateForm';

const KEY_TYPE_ID = 'type';

const KEY_TYPE_EC = 'EC';

const KEY_TYPE_RSA = 'RSA';

const PRIVATE_KEY_ID = 'asymmetricPrivateKey';

const PUBLIC_KEY_ID = 'asymmetricPublicKey';

const RSA_KEY_SIZE_ID = 'rsaKeySize';

export const AsymmetricPageEvent = "asymmetricPage";

export class AsymmetricPage extends AlgorithmBasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      AsymmetricPageEvent,
      [
        { id: RSA_KEY_SIZE_ID, value: KEY_TYPE_RSA },
        { id: EC_NAMED_CURVE_ID, value: KEY_TYPE_EC },
      ],
      KEY_TYPE_ID,
      ERROR_MESSAGE_ID,
      AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS,
      AsymmetricPageEvent,
      PRIVATE_KEY_ID,
      PUBLIC_KEY_ID,
    );
  }

  protected setupHtml(): string {
    const { source } = this;

    return HtmlComponents.div({
      css: [Css.ASYMMETRIC_COLOR],
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
              label: AsymmetricLanguageKeys.KEY_TYPE,
              source: this.source,
              options: [
                {
                  value: KEY_TYPE_EC,
                  source,
                  text: AsymmetricLanguageKeys.KEY_TYPE_EC,
                  isChecked: true,
                },
                {
                  value: KEY_TYPE_RSA,
                  source,
                  text: AsymmetricLanguageKeys.KEY_TYPE_RSA
                },
              ],
            }),
            HtmlComponents.radio({
              id: RSA_KEY_SIZE_ID,
              label: AsymmetricLanguageKeys.KEY_SIZE,
              source,
              options: [
                {
                  value: '1024',
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_1024,
                },
                {
                  value: '2048',
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_2048,
                  isChecked: true,
                },
                {
                  value: '4096',
                  source,
                  text: AsymmetricLanguageKeys.KEY_SIZE_4096,
                },
              ],
            }),
            HtmlComponents.radio({
              id: EC_NAMED_CURVE_ID,
              label: AsymmetricLanguageKeys.EC_NAMED_CURVE,
              source,
              options: [
                {
                  value: EC_NAMED_CURVE_SECT239K1,
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
              id: PRIVATE_KEY_ID,
              label: AsymmetricLanguageKeys.PRIVATE_KEY,
              placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              source,
              rows: '15',
            }),
            HtmlComponents.textarea({
              id: PUBLIC_KEY_ID,
              label: AsymmetricLanguageKeys.PUBLIC_KEY,
              placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              source,
              rows: '6',
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
    checkedElement = document.querySelector(`[name=${KEY_TYPE_ID}]:checked`) as HTMLElement,
  }: {
    root?: HTMLElement,
    checkedElement?: HTMLElement,
  }): Promise<void> {
    const value = checkedElement.getAttribute('value');
    if (value === KEY_TYPE_RSA) {
      root.querySelectorAll(`#${RSA_KEY_SIZE_ID}, label[for=${RSA_KEY_SIZE_ID}]`).forEach((elem) => {
        elem.classList.remove('hidden');
      });

      root.querySelectorAll(`#${EC_NAMED_CURVE_ID}, label[for=${EC_NAMED_CURVE_ID}]`).forEach((elem) => {
        elem.classList.add('hidden');
      });
    } else if (value == KEY_TYPE_EC) {
      root.querySelectorAll(`#${RSA_KEY_SIZE_ID}, label[for=${RSA_KEY_SIZE_ID}]`).forEach((elem) => {
        elem.classList.add('hidden');
      });

      root.querySelectorAll(`#${EC_NAMED_CURVE_ID}, label[for=${EC_NAMED_CURVE_ID}]`).forEach((elem) => {
        elem.classList.remove('hidden');
      });
    }
  }
}
