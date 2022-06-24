class SignInPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
  }

  get html() {
    return `
      <h1>Welcome back!</h1>
      <div id="error"></div>
      <form method="post" action="/auth" id="signin">
      <label for="email">email</label>
      <input type="email" id="email" name="email" maxlength='50' placeholder='name@example.com' required>
      <label for="password">password</label>
      <input type="password" id="password" name="password" minlength='8' maxlength='256' placeholder='your password' required>
          <input type="submit" value="submit">
      </form>
      <a id='signUpLink' href='signup'>I do not have an account!</a> 
      `;
  }

  initializeData() {
    this.setInputFromUrlParams();
  }

  initializeEventSignIn() {
    document.querySelector('#signin').addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelector('#error').textContent = '';
      const process = (json) => {
        if (json && json.token) {
          firebase.auth().signInWithCustomToken(json.token)
            .then(() => new MessengerPage(this.firebaseApp).show())
            .catch(() => document.querySelector('#error').textContent = 'A signin is not possible at the moment.');
        } else {
          document.querySelector('#error').textContent = 'Unknown combination of user and password';
        }
      };

      ajax(process, e.target);
    });
  }

  initializeEventLinkToSignUp() {
    document.querySelector('#signUpLink').addEventListener('click', (e) => {
      e.preventDefault();
      new SignUpPage(this.firebaseApp).show();
    });
  }

  initializeEvents() {
    this.initializeEventLinkToSignUp();
    this.initializeEventSignIn();
  }

  initializeFocus() {
    this.setFocusToFirstEmptyInputOrSubmit();
  }
};
