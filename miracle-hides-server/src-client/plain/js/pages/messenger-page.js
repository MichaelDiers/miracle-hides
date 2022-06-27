class MessengerPage extends BasePage {
  constructor(translator, customEventName, errorEventName) {
    super({ translator, customEventName, errorEventName, id: 'messanger' });
  }

  async setup() {
    super.setup()
      .catch((err) => this.raiseErrorEvent(err.message, err.stack));
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({ translationTag: BaseTranslator.keys.messengerHeadline })}
    `;

    return [...div.children];
  }
};
