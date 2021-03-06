class BaseTranslator {
  static __keys = {
    email: 'email',
    emailPlaceholder: 'emailPlaceholder',
    password: 'password',
    passwordPlaceholder: 'passwordPlaceholder',
    passwordRepeat: 'passwordRepeat',
    passwordRepeatPlaceholder: 'passwordRepeatPlaceholder',
    signInHeadline: 'signInHeadline',
    signInSubmit: 'signInSubmit',
    signIn401: 'signIn401',
    signInLinkToSignUp: 'signInLinkToSignUp',
    messengerHeadline: 'messengerHeadline',
    signUpHeadline: 'signUpHeadline',
    signUpSubmit: 'signUpSubmit',
    signUpLinkToSignIn: 'signUpLinkToSignIn',
    guidPlaceholder: 'guidPlaceholder',
    invitationCode: 'invitationCode',
    displayName: 'displayName',
    displayNamePlaceholder: 'displayNamePlaceholder',
    messengerCreateChat: 'messengerCreateChat',
    messengerCreateChatHeadline: 'messengerCreateChatHeadline',
    messengerCreateChatSubmit: 'messengerCreateChatSubmit',
    messengerCreateChatEmail: 'messengerCreateChatEmail',
    messengerCreateChatEmailPlaceholder: 'messengerCreateChatEmailPlaceholder',

    messengerCreateChatInvitation: 'messengerCreateChatInvitation',    
    
    createChatInvitationPage_headline: 'createChatInvitationPage_headline',
    createChatInvitationPage_next: 'createChatInvitationPage_next',
    createChatInvitationPage_nextFinal: 'createChatInvitationPage_nextFinal',
    createChatInvitationPage_previous: 'createChatInvitationPage_previous',
    createChatInvitationPage_receiver: 'createChatInvitationPage_receiver',
    createChatInvitationPage_receiverPlaceholder: 'createChatInvitationPage_receiverPlaceholder',
    createChatInvitationPage_receiverText: 'createChatInvitationPage_receiverText',

    createChatInvitationPage_keysText: 'createChatInvitationPage_keysText',
    createChatInvitationPage_keysSize: 'createChatInvitationPage_keysSize',
    createChatInvitationPage_keysPrivate: 'createChatInvitationPage_keysPrivate',
    createChatInvitationPage_keysPrivatePlaceholder: 'createChatInvitationPage_keysPrivatePlaceholder',
    createChatInvitationPage_keysPublic: 'createChatInvitationPage_keysPublic',
    createChatInvitationPage_keysPublicPlaceholder: 'createChatInvitationPage_keysPublicPlaceholder',
    createChatInvitationPage_keysGenerate: 'createChatInvitationPage_keysGenerate',
    createChatInvitationPage_keysMismatch: 'createChatInvitationPage_keysMismatch',
    createChatInvitationPage_addKeysText: 'createChatInvitationPage_addKeysText',
    createChatInvitationPage_addKeysCopy: 'createChatInvitationPage_addKeysCopy',
    createChatInvitationPage_sendKeysText: 'createChatInvitationPage_sendKeysText',
    createChatInvitationPage_sendKeysCopy: 'createChatInvitationPage_sendKeysCopy',
  }

  constructor(language, translations) {
    this.__language = language;
    this.__translations = translations;
  }

  static get keys() {
    return BaseTranslator.__keys;
  }

  get lang() {
    return this.__language;
  }
  
  static get translationPlaceholderTag() {
    return 'translationPlaceholderTag';
  }

  static get translationTag() {
    return 'translationTag';
  }

  static get translationValueTag() {
    return 'translationValueTag';
  }

  async translate(element) {
    const translateTag = (root, tag, setValue) => {
      let elements = [...root.querySelectorAll(`[${tag}]`)];
      if (element.getAttribute(tag)) {
        elements.push(element);
      }

      elements.forEach((elem) => {
        const value = elem.getAttribute(tag);
        if (value) {
          setValue(elem, this.__translations[value]);
        }
      });
    }
    
    const root = element || document;
    translateTag(root, BaseTranslator.translationTag, (elem, value) => elem.textContent = value);
    translateTag(root, BaseTranslator.translationPlaceholderTag, (elem, value) => elem.setAttribute('placeholder', value));
    translateTag(root, BaseTranslator.translationValueTag, (elem, value) => elem.setAttribute('value', value));
  }
}