class AddChatMessengerPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
  }

  get html() {
    return this.components.defaultPage(
      'Add Chat',
      'error',
      'post',
      '/chat',
      'formId',
      this.components.email(),
      this.components.submit('add'),
    );
  }
};
