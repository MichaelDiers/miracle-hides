import { LanguagePageKeys } from '../translations/language-page';
import { AsymmetricLanguageKeys } from '../translations/language-asymmetric';
import HtmlComponents from './html-components';
import AlgorithmBasePage from './algorithm-base.page';
import Translator from '../translations/translator';
import Logger from '../infrastructure/logger';

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

    return [
      HtmlComponents.h1({ source, value: LanguagePageKeys.HEADLINE }),
      HtmlComponents.div({ id: ERROR_MESSAGE_ID }),
      HtmlComponents.form({
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
    ].join('');
  }
}
