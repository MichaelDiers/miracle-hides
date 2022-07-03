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

    this.__linkEventsAttached = false;
  }

  get html() { return this.__html; }

  set html(promise) { this.__html = promise; }

  async display() {
    try {
      const main = document.querySelector('main');
      main.id = this.__id;
      console.log(main.id)
      main.textContent = '';
      main.append(...(await this.html));
      if (!this.__linkEventsAttached) {
        main.querySelectorAll('a[event]').forEach((element) => {
          const eventName = element.getAttribute('event');
          element.addEventListener('click', (e) => {
            e.preventDefault();
            EventRaiser.raise({ eventName });
          })
        });
      }
      
      await this.__translator.translate(main);
    } catch (err) {
      EventRaiser.raise({
        eventName: this.__errorEventName,
        detail: {
          message: err.message,
          stack: err.stack,
        }
      });
    }
  }

  handleLink({ root, sourceId, showPageEventName, sourceEventName = 'click'} = {}) {
    root.querySelector(`#${sourceId}`).addEventListener(sourceEventName, (e) => {
      e.preventDefault();
      EventRaiser.raise({ eventName: showPageEventName });
    });
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

  async translate(element) {
    const root = element || document.main;
    return this.__translator.translate(root);
  }
}
