import Ajax from '../infrastructure/ajax';
import Logger from '../infrastructure/logger';
import { TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';
import Translator from '../translations/translator';
import BasePage from './base-page';
import HtmlHelper from './html-helper';
import KeysResponse from './keys-response';

export default abstract class AlgorithmBasePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
    eventName: string,
    private readonly keyNames : { keyTypeName: string, keyTypeValueNames: string[] },
    private readonly errorElementId: string,
    private readonly defaultErrorMessage: string,
    protected readonly source: string,
    private readonly privateKeyId: string,
    private readonly publicKeyId?: string,
  ) {
    super(translator, logger, eventName);
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion() : string {
    return 'main';
  }

  protected async initializeOnDisplayAsync() : Promise<void> {
    Promise.all([
      super.initializeOnDisplayAsync(),
      this.submitFormAsync(),
      this.updateElementsOnKeyTypeChangedAsync({}),
    ]).catch((err) => this.exception(err.message, err.stack));
  }

  protected setupEvents(element: HTMLElement) : void {
    element.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      this.submitFormAsync().catch((err) => this.exception(err.message, err.stack));
    });

    const selector = [
      this.keyNames.keyTypeName,
      ...this.keyNames.keyTypeValueNames,
    ].map((name) => `[name=${name}]`).join(',');
    element.querySelectorAll(selector).forEach((elem) => {
      elem.addEventListener('change', (e) => {
        const promises = [this.submitFormAsync()];
        if ((e.target as HTMLElement).getAttribute('name') === this.keyNames.keyTypeName) {
          promises.push(
            this.updateElementsOnKeyTypeChangedAsync({ checkedElement: e.target as HTMLElement }),
          );
        }

        Promise.all(promises).catch((err) => this.exception(err.message, err.stack));
      });
    });
  }

  protected setErrorAsync() : Promise<void> {
    const errorElement = document.getElementById(this.errorElementId);
    HtmlHelper.addTranslationValue({
      element: errorElement,
      source: this.source,
      value: this.defaultErrorMessage,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });

    return this.translateAsync(errorElement);
  }

  protected async submitFormAsync() : Promise<void> {
    const formElement = document.querySelector(`#${this.source} form`) as HTMLFormElement;

    (document.getElementById(this.privateKeyId) as HTMLTextAreaElement).value = '';
    if (this.publicKeyId) {
      (document.getElementById(this.publicKeyId) as HTMLTextAreaElement).value = '';
    }

    Ajax.sendFormAsync({ formElement })
      .then(({ data, success }) => {
        if (!success || !data) {
          this.setErrorAsync().catch((err) => this.exception(err.message, err.stack));
        } else {
          const { privateKey, publicKey } = data as KeysResponse;
          (document.getElementById(this.privateKeyId) as HTMLTextAreaElement).value = privateKey;
          if (this.publicKeyId) {
            (document.getElementById(this.publicKeyId) as HTMLTextAreaElement).value = publicKey;
          }
        }
      })
      .catch((err) => {
        this.exception(err.message, err.stack);
        this.setErrorAsync().catch((error) => this.exception(error.message, error.stack));
      });
  }

  protected abstract updateElementsOnKeyTypeChangedAsync({
    root,
    checkedElement,
  } : {
    root?: HTMLElement,
    checkedElement?: HTMLElement,
  }) : Promise<void>;
}
