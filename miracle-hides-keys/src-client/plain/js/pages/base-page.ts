import Translator from '../translations/translator';

export default abstract class BasePage {
  private __html: Element[];

  private readonly __source: string;

  constructor() {
    this.__source = this.constructor.name;
    this.__source = `${this.source[0].toLowerCase()}${this.__source.substring(1)}`;
  }

  display() : void {
    const main = document.querySelector('main');
    main.id = this.constructor.name;
    this.html.forEach((element: Element) => main.appendChild(element));
  }

  get html() : Element[] {
    return this.__html;
  }

  set html(content: Element[]) {
    this.__html = content;
  }

  get source() : string {
    return this.__source;  
  }

  async setupAsync(translator: Translator) : Promise<BasePage> {
    const div = document.createElement('div');
    div.innerHTML = this.setupHtml();
    console.log(this.setupHtml())
    console.log(div)
    await translator.translate(div);
    this.html = [...div.children];

    document.body.addEventListener(BasePage.constructor.name, (e) => {
      e.preventDefault();
      this.display();      
    });

    return this;
  }

  abstract setupHtml() : string;
};