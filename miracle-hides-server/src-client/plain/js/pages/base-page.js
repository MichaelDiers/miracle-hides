class BasePage {
  constructor({
    translator,
    customEventName,
    errorEventName,
    id,
  } = {}) {
    this.__translator = translator;
    this.__customEventName = customEventName;
    this.__errorEventName = errorEventName;
    
    this.__html = undefined;

    this.__id = id;
  }

  get html() { return this.__html; }

  set html(promise) { this.__html = promise; }

  async display() {
    try {
      const main = document.querySelector('main');
      main.id = this.__id;
      main.textContent = '';
      console.log(await this)
      console.log(await this.html)
      console.log(await this)
      main.append(...(await this.html));
      await this.__translator.translate(main);
    } catch (err) {
      console.log(err)
      this.raiseErrorEvent(err.message, err.stack);
    }
  }

  raiseErrorEvent(message, stack) {
    this.raiseEvent(this.__errorEventName, { message, stack });
  }

  raiseEvent(eventName, detail) {
    document.body.dispatchEvent(
      new CustomEvent(
        eventName,
        {
          bubbles: true,
          cancelable: true,
          detail
        },
      ),
    );
  }

  async setup(logError) {
    document.body.addEventListener(this.__customEventName, (e) => {
      if (logError) {
        logError(e);
      }

      e.preventDefault();
      this.display();
    });

    this.html = this.setupHtml();
  }

  async setupHtml() {
    throw new Error('not implemented');
  }
}
