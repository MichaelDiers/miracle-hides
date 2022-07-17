import Css from './css';
import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';

export default abstract class BasePage {
  private content: Element[];

  constructor(
    private readonly translator: Translator,
    protected readonly logger: Logger,
    private readonly eventName: string,
  ) {
  }

  private get html() : Element[] {
    return this.content;
  }

  private set html(content: Element[]) {
    this.content = content;
  }

  async setupAsync() : Promise<BasePage> {
    const div = document.createElement('div');
    div.innerHTML = this.setupHtml();
    this.setupEvents(div);
    await this.translateAsync(div);
    this.html = [...div.children];
    
    document.body.addEventListener(this.eventName, (e) => {
      e.preventDefault();
      this.displayAsync().catch((err) => this.exception(err.message, err.stack));
    });

    this.html.forEach((element) => {
      let textareaContainers = [...element.querySelectorAll(`.${Css.TEXTAREA_CONTAINER}`)];
      if (element.hasAttribute(Css.TEXTAREA_CONTAINER)) {
        textareaContainers.push(element);        
      }

      textareaContainers.forEach((textareaContainer) => {        
        textareaContainer.querySelector('div').addEventListener('click', (e) => {
          e.preventDefault();
          const textarea = (e.target as HTMLElement).parentElement.querySelector('textarea');
          if (textarea) {
            navigator.clipboard.writeText(textarea.textContent);
          }
        });
      });
    });

    return this;
  }

  protected abstract get displayInRegion() : string;

  protected exception(message, stack) : void {
    this.logger.exceptionAsync(message, stack).catch(() => {});
  }

  // eslint-disable-next-line class-methods-use-this
  protected async initializeOnDisplayAsync(): Promise<void> {
    ['header'].forEach((selector) => {
      const element = document.querySelector(selector);
      element.classList.remove(Css.HIDDEN);
    });
  }

  protected abstract setupEvents(element: HTMLElement) : void;

  protected abstract setupHtml() : string;

  protected translateAsync(element?: HTMLElement) : Promise<void> {
    return this.translator.translateAsync(element);
  }

  private async displayAsync() : Promise<void> {
    const region = document.querySelector(this.displayInRegion);
    region.innerHTML = '';
    region.id = this.eventName;
    this.html.forEach((element: Element) => region.appendChild(element));
    window.scrollTo(0, 0);
    return this.initializeOnDisplayAsync();
  }
}
