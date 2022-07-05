export default abstract class BasePage {
  private __html: Element[];

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

  async setupAsync() : Promise<BasePage> {
    const div = document.createElement('div');
    div.innerHTML = this.setupHtml();
    this.html = [...div.children];

    document.body.addEventListener(BasePage.constructor.name, (e) => {
      e.preventDefault();
      this.display();      
    });

    return this;
  }

  abstract setupHtml() : string;
};