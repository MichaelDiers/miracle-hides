class AddChatMessengerPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);

    this.addChatFormId = 'addChat';
    this.messagesAreaId = 'messages';
  }

  get html() {
    return `
      ${this.components.headline('Add Chat')}
      ${this.components.messageArea(this.messagesAreaId)}
      ${this.components.form(this.addChatFormId, '/chat', 'post', this.components.email(), this.components.submit('add'))}
    `;
  }

  initializeEventAddChat() {
    const process = (json) => {
      new MessengerPage(this.firebaseApp).show();
    };

    const messages = {
      200: 'added a new chat',
      404: 'chat partner not found'
    };

    addSubmitEvent(this.addChatFormId, process, this.messagesAreaId, messages);
  }

  initializeEvents() {
    this.initializeEventAddChat();
  }
};
