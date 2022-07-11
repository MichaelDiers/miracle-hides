import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';
import BasePage from './base-page';

export default abstract class AlgorithmBasePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
    private readonly keyTypes : { id: string, value: string }[],
    private readonly keyTypeId: string,
  ) {
    super(translator, logger);
  }

  async initializeOnDisplayAsync() : Promise<void> {
    return this.submitFormAsync();
  }

  setupEvents(element: HTMLElement) : void {
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

  protected abstract submitFormAsync() : Promise<void>;

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
