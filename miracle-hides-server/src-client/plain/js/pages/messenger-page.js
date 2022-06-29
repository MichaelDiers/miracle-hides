class MessengerPage extends BasePage {
  constructor({ translator, customEventName, errorEventName, requestAddChatPage, requestAddChatInvitationPage }) {
    super({ translator, customEventName, errorEventName, id: 'messanger' });

    this.__createChatId = 'createChat';
    this.__createChatInvitationId = 'createChatInvitation';

    this.__requestAddChatPage = requestAddChatPage;
    this.__requestAddChatInvitationPage = requestAddChatInvitationPage;
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
        ${HtmlComponents.linkButton({
          translationTag: BaseTranslator.keys.messengerCreateChatInvitation,
          id: this.__createChatInvitationId })}
    `;

    this.handleLink({
      root: div,
      sourceId: this.__createChatId,
      showPageEventName: this.__requestAddChatPage,
    });

    this.handleLink({
      root: div,
      sourceId: this.__createChatInvitationId,
      showPageEventName: this.__requestAddChatInvitationPage,
    });
    
    return [...div.children];
  }
};
