class SignUpPage extends BasePage {
  constructor({
    translator,
    customEventName,
    errorEventName,
    requestSignInEventName,
  }) {
    super({
      customEventName: SignUpPage.name,
      errorEventName,
      id: SignUpPage.name,
      translator,
    });

    this.__requestSignInEventName = requestSignInEventName;

    this.__messageAreaId = 'messageArea';
    this.__signInLinkId = 'signInLink';
    this.__passwordRepeatId = 'passwordRepeat'
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({ translationTag: BaseTranslator.keys.signUpHeadline })}
      ${HtmlComponents.form({
        action: '/user',
        method: 'post',
        content: [          
          HtmlComponents.text({ id: this.__messageAreaId }),
          HtmlComponents.invitationCodeInput(),
          HtmlComponents.displayNameInput(),
          HtmlComponents.emailInput(),
          HtmlComponents.passwordInput(),
          HtmlComponents.passwordInput({
            id: this.__passwordRepeatId,
            translationTag: BaseTranslator.keys.passwordRepeat,
            translationPlaceholderTag: BaseTranslator.keys.passwordRepeatPlaceholder }),
          HtmlComponents.submitInput({ translationTag: BaseTranslator.keys.signUpSubmit }),
        ],
      })}
      ${HtmlComponents.linkButton(
        {
          id: this.__signInLinkId,
          translationTag: BaseTranslator.keys.signUpLinkToSignIn,
          link: this.__requestSignInEventName,
        })}
    `;
    
    div.querySelector(`#${this.__signInLinkId}`).addEventListener('click', (e) => {
      e.preventDefault();     
      EventRaiser.raise({ eventName: e.target.getAttribute('href') }); 
    });

    const passwordErrorClass = 'password-error';
    div.querySelector(`#${this.__passwordRepeatId}`).addEventListener('input', (e) => {
      const password = div.querySelector('#password').value;
      if (e.target.value && password !== e.target.value) {
        e.target.classList.add(passwordErrorClass);
      } else {
        e.target.classList.remove(passwordErrorClass);
      }
    });

    div.querySelector('#password').addEventListener('input', (e) => {
      const repeatElement = div.querySelector(`#${this.__passwordRepeatId}`);
      if (repeatElement.value && e.target.value !== repeatElement.value) {
        repeatElement.classList.add(passwordErrorClass);
      } else {
        repeatElement.classList.remove(passwordErrorClass);
      }
    });

    return [...div.children];
  }
};
