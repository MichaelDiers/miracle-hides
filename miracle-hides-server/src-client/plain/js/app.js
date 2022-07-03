class App {
  constructor() {
    //this.firebaseApp = new FirebaseApp();
  }

  async initializePages() {
    const translator = new Translator();

    const setupPromises = [];
    
    setupPromises.push(new ErrorPage({ translator }).setup(console.error));    
    setupPromises.push(new SignInPage({
      translator,
      errorEventName: ErrorPage.name,
      signedInEventName: MessengerPage.name,
      requestSignUpEvent: SignUpPage.name,
    }).setup());
    setupPromises.push(new MessengerPage({
      errorEventName: ErrorPage.name,
      translator,
      requestAddChatPage: CreateChatMessengerPage.name,
      requestAddChatInvitationPage: CreateChatInvitationPage.name,
    }).setup());
    setupPromises.push(new SignUpPage({
      translator,      
      errorEventName: ErrorPage.name,
      requestSignInEventName: SignInPage.name,
    }).setup());
    setupPromises.push(new CreateChatMessengerPage({      
      errorEventName: ErrorPage.name,
      translator,
    }).setup());
    setupPromises.push(new CreateChatInvitationPage({      
      errorEventName: ErrorPage.name,
      translator,
      nextEventName: MessengerPage.name,
    }).setup());

    try {
      await Promise.all(setupPromises);

    } catch (err) {
      console.error('Cannot setup pages', err);
    }
  }

  show() {
    EventRaiser.raise({ eventName: SignInPage.name });
  }

  start() {
    this.initializePages();
  }
}
