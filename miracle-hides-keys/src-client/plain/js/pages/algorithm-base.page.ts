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
    private readonly keyGeneratorResultIds: {
      privateKeyId: string,
      publicKeyId?: string,
      testInputId?: string,
      encryptedId?: string,
      decryptedId?: string,
    },
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

    (document.getElementById(this.keyGeneratorResultIds.privateKeyId) as HTMLTextAreaElement).value = '';
    if (this.keyGeneratorResultIds.publicKeyId) {
      (document.getElementById(this.keyGeneratorResultIds.publicKeyId) as HTMLTextAreaElement).value = '';
    }

    Ajax.sendFormAsync({ formElement })
      .then(({ data, success }) => {
        if (!success || !data) {
          this.setErrorAsync().catch((err) => this.exception(err.message, err.stack));
        } else {
          const {
            privateKey, publicKey, testInput, encrypted, decrypted,
          } = data as KeysResponse;
          [
            { id: this.keyGeneratorResultIds.privateKeyId, value: privateKey },
            { id: this.keyGeneratorResultIds.publicKeyId, value: publicKey },
            { id: this.keyGeneratorResultIds.testInputId, value: testInput },
            { id: this.keyGeneratorResultIds.encryptedId, value: encrypted },
            { id: this.keyGeneratorResultIds.decryptedId, value: decrypted },
          ].forEach(({ id, value }) => {
            if (id && value) {
              (document.getElementById(id) as HTMLTextAreaElement).value = value;
            }
          });
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
