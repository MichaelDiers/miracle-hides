import Logger from '../infrastructure/logger';
import Translator from '../translations/translator';

export default abstract class BasePage {
  private content: Element[];

  private readonly sourceName: string;

  constructor(
    private readonly translator: Translator,
    protected readonly logger: Logger,
  ) {
    const { name } = this.constructor;
    this.sourceName = `${name[0].toLowerCase()}${name.substring(1)}`;
  }

  async displayAsync() : Promise<void> {
    const main = document.querySelector('main');
    main.id = this.source;
    this.html.forEach((element: Element) => main.appendChild(element));
    return this.initializeOnDisplayAsync();
  }

  exception(message, stack) : void {
    this.logger.exceptionAsync(message, stack).catch(() => {});
  }

  get html() : Element[] {
    return this.content;
  }

  set html(content: Element[]) {
    this.content = content;
  }

  get source() : string {
    return this.sourceName;
  }

  abstract initializeOnDisplayAsync() : Promise<void>;

  async setupAsync() : Promise<BasePage> {
    const div = document.createElement('div');
    div.innerHTML = this.setupHtml();
    this.setupEvents(div);
    await this.translateAsync(div);
    this.html = [...div.children];

    document.body.addEventListener(BasePage.constructor.name, (e) => {
      e.preventDefault();
      this.displayAsync().catch((err) => this.exception(err.message, err.stack));
    });

    return this;
  }

  abstract setupHtml() : string;

  abstract setupEvents(element: HTMLElement) : void;

  translateAsync(element?: HTMLElement) : Promise<void> {
    return this.translator.translateAsync(element);
  }
}
