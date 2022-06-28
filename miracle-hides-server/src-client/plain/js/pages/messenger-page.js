class MessengerPage extends BasePage {
  constructor({ translator, customEventName, errorEventName, requestAddChatPage }) {
    super({ translator, customEventName, errorEventName, id: 'messanger' });

    this.__createChatId = 'createChat';

    this.__requestAddChatPage = requestAddChatPage;
  }

  async setup() {
    super.setup()
      .catch((err) => this.raiseErrorEvent(err.message, err.stack));
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({
        translationTag: BaseTranslator.keys.messengerHeadline })}
      ${HtmlComponents.linkButton({
        translationTag: BaseTranslator.keys.messengerCreateChat,
        id: this.__createChatId })}
    `;

    this.handleLink({
      root: div,
      sourceId: this.__createChatId,
      showPageEventName: this.__requestAddChatPage,
    });
    
    return [...div.children];
  }
};
