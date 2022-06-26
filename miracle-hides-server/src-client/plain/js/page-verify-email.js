class VerifyEmailPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);

    this.emailId = 'email';
    this.verificationCodeId = 'verificationCode';
  }

  get html() {
    return `
      <h1>Verify your email!</h1>
      <p>Check your inbox.</p>
      <div id="error"></div>
      <form method="put" action="/user">
        <label for="${this.emailId}">email</label>
        <input type="email" id="${this.emailId}" name="${this.emailId}" maxlength='50' placeholder='name@example.com' required>
        <label for="password">password</label>
        <input type="password" id="password" name="password" minlength='8' maxlength='256' placeholder='your password' required>
        <label for='${this.verificationCodeId}'>Email verification Code</label>
        <input type='text' id='${this.verificationCodeId}' name='${this.verificationCodeId}' maxlength='50' placeholder='acfc29b1-7ec5-4ac4-88c9-0f4ea83f8739' required autofocus>
        <input type="submit" value="submit">
      </form>
      `;
  }

  initializeData() {
    this.setInputFromUrlParams();
  }

  initializeEventVerifyEmail() {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      const process = (json) => {
        if (json && json.token) {
          new MessengerPage(this.firebaseApp).show();
        } else {
          this.showError('Unable to verify email.');
        }
      };

      ajax(process, e.target);
    });
  }

  initializeEvents() {
    this.initializeEventVerifyEmail();  
  }

  initializeFocus() {
    this.setFocusToFirstEmptyInputOrSubmit();
  }

  isPageMatch() {
    const urlParams = [...new URLSearchParams(window.location.search)];
    const emailId = this.emailId.toUpperCase();
    const verificationCodeId = this.verificationCodeId.toUpperCase();
    return urlParams.length === 2 
      && urlParams.some(p => p[0] && p[0].toUpperCase() === emailId)
      && urlParams.some(p => p[0] && p[0].toUpperCase() === verificationCodeId);
  }
}