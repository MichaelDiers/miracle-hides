import Translator from '../translations/translator';

export default abstract class BasePage {
  private content: Element[];

  private readonly sourceName: string;

  constructor() {
    this.sourceName = this.constructor.name;
    this.sourceName = `${this.source[0].toLowerCase()}${this.sourceName.substring(1)}`;
  }

  display() : void {
    const main = document.querySelector('main');
    main.id = this.constructor.name;
    this.html.forEach((element: Element) => main.appendChild(element));
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

  async setupAsync(translator: Translator) : Promise<BasePage> {
    const div = document.createElement('div');
    div.innerHTML = this.setupHtml();    
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