class CreateChatMessengerPage extends BasePage {
  constructor({ translator, customEventName, errorEventName }) {
    super({ translator, customEventName, errorEventName, id: 'createChatMessenger' });    

    this.__formId = 'createChatMessengerPageForm';
    this.__messageAreaId = 'messageArea';
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({ translationTag: BaseTranslator.keys.messengerCreateChatHeadline })}
      ${HtmlComponents.form({ 
        action: '/chat',
        id: this.__formId,
        method: 'post',
        content: [
          HtmlComponents.text({ id: this.__messageAreaId }),
          HtmlComponents.emailInput({
            translationTag: BaseTranslator.keys.messengerCreateChatEmail,
            translationPlaceholderTag: BaseTranslator.keys.messengerCreateChatEmailPlaceholder,
          }),
          HtmlComponents.submitInput({
            translationTag: BaseTranslator.keys.messengerCreateChatSubmit,
          }),
        ],
      })}
    `;

    div.querySelector(`#${this.__formId}`).addEventListener('submit', (e) => {
      e.preventDefault();
      AjaxHandler.submitForm({ formElement: e.target })
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    });

    return [...div.children];
  }
};
