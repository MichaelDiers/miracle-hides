class MessengerPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
  }

  get html() {
    return `
      <h1>Messenger!</h1>
      <div id="error"></div>
      `;
  }
}
