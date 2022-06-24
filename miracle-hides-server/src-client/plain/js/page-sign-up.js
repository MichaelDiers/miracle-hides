class SignUpPage extends BasePage {
  get html() {
    return `
      <h1>Sign up for Miracle Hides!</h1>
      <form action='/user' method='post'>
        <label for='code'>Invitation Code</label>
        <input type='text' id='code' name='code' maxlength='50' placeholder='acfc29b1-7ec5-4ac4-88c9-0f4ea83f8739' required autofocus>
        <label for="email">email</label>
        <input type="email" id="email" name="email" maxlength='50' placeholder='name@example.com' required>
        <label for="password">password</label>
        <input type="password" id="password" name="password" minlength='8' maxlength='256' placeholder='your password' required>
        <input type='submit' value='submit'>
      </form>
      <a id='signInLink' href='signin'>I already have an account!</a> 
    `;
  }

  initializeData() {
    this.setInputFromUrlParams();
  }

  initializeEventLinkToSignIn() {
    document.querySelector('#signInLink').addEventListener('click', (e) => {
      e.preventDefault();
      new SignInPage().show();
    });
  }

  initializeEventSignUp() {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      const process = (json) => {
        console.log(json);
      };

      ajax(process, e.target);
    });
  }

  initializeEvents() {
    this.initializeEventLinkToSignIn();
    this.initializeEventSignUp();
  }

  initializeFocus() {
    this.setFocusToFirstEmptyInputOrSubmit();
  }
};
