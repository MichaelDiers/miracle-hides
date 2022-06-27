class SignInPage extends BasePage {
  constructor(options = {}) {
    const {
      translator,
      customEventName,
      errorEventName,
      signedInEventName,
      requestSignUpEvent,
    } = options;

    super({ translator, customEventName, errorEventName, id: 'signin' });

    this.__signedInEventName = signedInEventName;
    this.__requestSignUpEvent = requestSignUpEvent;

    this.__messageAreaId = 'messageArea';
    this.__signUpLinkId = 'signUpLink';
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({ translationTag: BaseTranslator.keys.signInHeadline })}
      ${HtmlComponents.form({
        action: '/auth',
        method: 'post',
        content: [
          HtmlComponents.text({ id: this.__messageAreaId }),
          HtmlComponents.emailInput(),
          HtmlComponents.passwordInput(),
          HtmlComponents.submitInput({ translationTag: BaseTranslator.keys.signInSubmit }),
        ],
      })}
      ${HtmlComponents.linkButton(
        {
          id: this.__signUpLinkId,
          translationTag: BaseTranslator.keys.signInLinkToSignUp,
          link: this.__requestSignUpEvent,
        })}  
    `;
    
    div.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      AjaxHandler.submitForm({ formElement: e.target })
        .then((json) => this.raiseEvent(this.__signedInEventName))
        .catch((json) => {
          const messageAreaElement = document.getElementById(this.__messageAreaId);
          messageAreaElement.setAttribute(BaseTranslator.translationTag, `signIn${json.status}`);
          this.__translator.translate(messageAreaElement);
        });
    });

    div.querySelector(`#${this.__signUpLinkId}`).addEventListener('click', (e) => {
      e.preventDefault();
      this.raiseEvent(e.target.getAttribute('href'));
    });

    return [...div.children];
  }
};
