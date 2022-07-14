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
    private readonly keyTypes : { id: string, value: string }[],
    private readonly keyTypeId: string,
    private readonly errorElementId: string,
    private readonly defaultErrorMessage: string,
    private readonly privateKeyId: string,
    private readonly publicKeyId?: string,
  ) {
    super(translator, logger);
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion() : string {
    return 'main';
  }

  protected async initializeOnDisplayAsync() : Promise<void> {
    await super.initializeOnDisplayAsync();
    return this.submitFormAsync();
  }

  protected setupEvents(element: HTMLElement) : void {
    element.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      this.submitFormAsync().catch((err) => this.exception(err.message, err.stack));
    });

    element.querySelector(`#${this.keyTypeId}`).addEventListener('change', (e) => {
      this.updateDisplayOnKeyTypeChange(document.body, e.target as HTMLSelectElement);
    });

    element.querySelectorAll(
      [`#${this.keyTypeId}`, ...this.keyTypes.map(({ id }) => `#${id}`)].join(', '),
    ).forEach((selectElement) => {
      selectElement.addEventListener('change', () => {
        this.submitFormAsync()
          .catch((err) => this.exception(err.message, err.stack));
      });
    });

    this.updateDisplayOnKeyTypeChange(
      element,
      element.querySelector(`#${this.keyTypeId}`) as HTMLSelectElement,
    );
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

    document.getElementById(this.privateKeyId).textContent = '';
    if (this.publicKeyId) {
      document.getElementById(this.publicKeyId).textContent = '';
    }

    Ajax.sendFormAsync({ formElement })
      .then(({ data, success }) => {
        if (!success || !data) {
          this.setErrorAsync().catch((err) => this.exception(err.message, err.stack));
        } else {
          const { privateKey, publicKey } = data as KeysResponse;
          document.getElementById(this.privateKeyId).textContent = privateKey;
          if (this.publicKeyId) {
            document.getElementById(this.publicKeyId).textContent = publicKey;
          }
        }
      })
      .catch((err) => {
        this.exception(err.message, err.stack);
        this.setErrorAsync().catch((error) => this.exception(error.message, error.stack));
      });
  }

  protected updateDisplayOnKeyTypeChange(
    root: HTMLElement,
    element: HTMLSelectElement,
  ) : void {
    this.keyTypes.forEach(({ id, value }) => {
      if (element.value === value) {
        root.querySelector(`#${id}`).classList.remove('hidden');
        root.querySelector(`label[for=${id}`).classList.remove('hidden');
      } else {
        root.querySelector(`#${id}`).classList.add('hidden');
        root.querySelector(`label[for=${id}`).classList.add('hidden');
      }
    });
  }
}
