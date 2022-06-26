class MessengerPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
  }

  get html() {
    return `
      <h1>Messenger!</h1>
      <div id="error"></div>
      <div>
        <ul id='chats'></ul>
        <form id='addChat' action='chat' method='post'>
          <input type='submit' value='add' />
        </form>
      </div>
      `;
  }

  initializeEventAddChat() {
    document.querySelector('#addChat').addEventListener('submit', (e) => {

    });
  }

  initializeEvents() {
    this.initializeEventAddChat();
  }
}
