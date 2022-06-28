class App {
  constructor() {
    //this.firebaseApp = new FirebaseApp();
  }

  async initializePages() {
    const translator = new Translator();

    const errorEventName = 'show-error-event';
    const signInEventName = 'show-sign-in-event';
    const messengerEventName = 'show-messenger-event';
    const signUpEventName = 'show-sign-up-event';
    const messengerCreateChatEventName = 'show-messenger-create-chat-event';

    const setupPromises = [];
    
    this.__errorPage = new ErrorPage(translator, errorEventName);
    setupPromises.push(this.__errorPage.setup(console.error));
    
    this.__signInPage = new SignInPage({
      translator,
      customEventName: signInEventName,
      errorEventName,
      signedInEventName: messengerEventName,
      requestSignUpEvent: signUpEventName,
    });
    setupPromises.push(this.__signInPage.setup());
    
    setupPromises.push(new MessengerPage({
      customEventName: messengerEventName,
      errorEventName,
      translator,
      requestAddChatPage: messengerCreateChatEventName,
    }).setup());

    this.__signUpPage = new SignUpPage({
      translator,
      customEventName: signUpEventName,
      errorEventName,
      requestSignInEventName: signInEventName,
    });
    setupPromises.push(this.__signUpPage.setup());

    setupPromises.push(new CreateChatMessengerPage({
      customEventName: messengerCreateChatEventName,
      errorEventName,
      translator,
    }).setup());

    try {
      await Promise.all(setupPromises);
    } catch (err) {
      console.error('Cannot setup pages', err);
    }
  }

  show() {
    this.__signInPage.display();
  }

  start() {
    this.initializePages();
  }
}