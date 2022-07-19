import { LanguagePageKeys } from '../translations/language-page';
import { AsymmetricLanguageKeys } from '../translations/language-asymmetric';
import HtmlComponents from './html-components';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';
import Css from './css';
import PageEvents from './page-events';

const enum PageIds {
  EC_NAMED_CURVE_ID = 'ecNamedCurve',
  ERROR_MESSAGE_ID = 'asymmetricErrorMessage',
  GENERATE_FORM_ID = 'generateForm',
  KEY_TYPE_ID = 'type',
  PRIVATE_KEY_ID = 'asymmetricPrivateKey',
  PUBLIC_KEY_ID = 'asymmetricPublicKey',
  RSA_KEY_SIZE_ID = 'rsaKeySize',
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
      PageIds.PRIVATE_KEY_ID,
      PageIds.PUBLIC_KEY_ID,
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
              label: AsymmetricLanguageKeys.PRIVATE_KEY,
              placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              source,
              rows: PageValues.PRIVATE_KEY_ROWS,
            }),
            HtmlComponents.textarea({
              id: PageIds.PUBLIC_KEY_ID,
              label: AsymmetricLanguageKeys.PUBLIC_KEY,
              placeholder: AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER,
              source,
              rows: PageValues.PUBLIC_KEY_ROWS,
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
