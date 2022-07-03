class CreateChatInvitationPage extends BasePage {
  constructor({
    translator,
    errorEventName,
    nextEventName,
  }) {
    super({
      customEventName: CreateChatInvitationPage.name,
      errorEventName,
      id: CreateChatInvitationPage.name,
      translator,
    });

    this.__nextEventName = nextEventName;
    this.__nextId = 'next';
    this.__previousId = 'previous';

    this.__messageAreaId = 'messageArea';
    this.__createKeysId = 'createKeys';
    this.__privateKeyId = 'privateKey';
    this.__publicKeyId = 'publicKey';
    this.__keySizeId = 'keySize';
    this.__copyId = 'copy';
    this.__receiverId = 'receiverId';
    this.__rsaErrorId = 'rsaError';
    this.__addKeyId = 'addKey';
    this.__keysCopied = false;
    this.__sendKeyId = 'sendKeys';
    this.__sendInvite = false;
    this.__data = undefined;
  }

  updateStatus(element) {
    const root = element || document;

    const pages = [...root.querySelectorAll('.page')];
    const activePage = pages.find((page) => !page.classList.contains('hide'));
    const activePageNumber = parseInt(activePage.id.split('_')[1]);

    const previousElement = root.querySelector(`#${this.__previousId}`);
    if (parseInt(previousElement.getAttribute('previous')) < 0) {
      previousElement.classList.add('hide');
    } else {
      previousElement.classList.remove('hide');
    }

    let nextActive = false;
    if (activePageNumber === 0) {
      if (root.querySelector(`#${this.__receiverId}`).value) {
        nextActive = true;
      }
    } else if (activePageNumber === 1) {
      const privateKey = root.querySelector(`#${this.__privateKeyId}`).value;
      const publicKey = root.querySelector(`#${this.__publicKeyId}`).value;
      const error = root.querySelector(`#${this.__rsaErrorId}`);
      error.innerText = '';

      if (privateKey && publicKey) {
        const text = 'Hello World!';
        const rsa = new JSEncrypt();

        rsa.setPublicKey(publicKey);
        const encrypted = rsa.encrypt(text);

        rsa.setPrivateKey(privateKey);
        const decrypted = rsa.decrypt(encrypted);
        if (decrypted === text) {
          nextActive = true;
        } else {
          error.setAttribute(BaseTranslator.translationTag, BaseTranslator.keys.createChatInvitationPage_keysMismatch);
          this.translate(error);
        }
      }
    } else if (activePageNumber === 2) {
      this.__data = {
        id: uuidv4(),
        displayName: document.getElementById(this.__receiverId).value,
        privateKey: document.getElementById(this.__privateKeyId).value,
        publicKey: document.getElementById(this.__publicKeyId).value,
      };

      nextActive = this.__keysCopied;
    }
    else if (activePageNumber === 3 && this.__sendInvite) {
      nextActive = true;
    }

    if (nextActive) {
      root.querySelector(`#${this.__nextId}`).classList.remove('disabled');
    } else {
      root.querySelector(`#${this.__nextId}`).classList.add('disabled');
    }

    if (activePageNumber === 3) {
      root.querySelector(`#${this.__nextId}`).setAttribute(BaseTranslator.translationTag, BaseTranslator.keys.createChatInvitationPage_nextFinal);
    } else {
      root.querySelector(`#${this.__nextId}`).setAttribute(BaseTranslator.translationTag, BaseTranslator.keys.createChatInvitationPage_next);
    }

    this.translate(root.querySelector(`#${this.__nextId}`));
  }

  async setRsaKeys(element) {
    const root = element || document;
    try {
      const keySize = root.querySelector(`#${this.__keySizeId}`).value;
      const keys = new JSEncrypt({ default_key_size: keySize }).getKey();
      root.querySelector(`#${this.__privateKeyId}`).value = keys.getPrivateKey();
      root.querySelector(`#${this.__publicKeyId}`).value = keys.getPublicKey();
    } catch (err) {
      console.error(err);
    }
  }

  async setupHtml() {
    const div = document.createElement('div');

    div.innerHTML = `
      ${HtmlComponents.headline({ translationTag: BaseTranslator.keys.createChatInvitationPage_headline })}      
      ${HtmlComponents.workflow({
      pages: [
        `
            ${HtmlComponents.text({
          translationTag: BaseTranslator.keys.createChatInvitationPage_receiverText,
        })}
            ${HtmlComponents.displayNameInput({
          id: this.__receiverId,
          translationTag: BaseTranslator.keys.createChatInvitationPage_receiver,
          translationPlaceholderTag: BaseTranslator.keys.createChatInvitationPage_receiverPlaceholder,
        })}
          `,
        `
            ${HtmlComponents.text({
          translationTag: BaseTranslator.keys.createChatInvitationPage_keysText,
        })}
            ${HtmlComponents.text({
          id: this.__rsaErrorId,
        })}
            ${HtmlComponents.select({
          id: this.__keySizeId,
          translationTag: BaseTranslator.keys.createChatInvitationPage_keysSize,
          content: [            
            HtmlComponents.selectOption({ value: 1024, displayValue: 1024 }),
            HtmlComponents.selectOption({ value: 2048, displayValue: 2048, isSelected: true }),
          ]
        })}
            ${HtmlComponents.textarea({
          id: this.__privateKeyId,
          cols: 1,
          rows: 15,
          translationTag: BaseTranslator.keys.createChatInvitationPage_keysPrivate,
          translationTagPlaceholder: BaseTranslator.keys.createChatInvitationPage_keysPrivatePlaceholder,
        })}
            ${HtmlComponents.textarea({
          id: this.__publicKeyId,
          cols: 1,
          rows: 10,
          translationTag: BaseTranslator.keys.createChatInvitationPage_keysPublic,
          translationTagPlaceholder: BaseTranslator.keys.createChatInvitationPage_keysPublicPlaceholder,
        })}
            ${HtmlComponents.linkButton({
          id: this.__createKeysId,
          translationTag: BaseTranslator.keys.createChatInvitationPage_keysGenerate,
        })}
          `,
        `
            ${HtmlComponents.text({
              translationTag: BaseTranslator.keys.createChatInvitationPage_addKeysText,
            })}
            ${HtmlComponents.linkButton({
              id: this.__addKeyId,
              translationTag: BaseTranslator.keys.createChatInvitationPage_addKeysCopy,
            })},
          `,
          `
            ${HtmlComponents.text({
              translationTag: BaseTranslator.keys.createChatInvitationPage_sendKeysText,
            })}
            ${HtmlComponents.linkButton({
              id: this.__sendKeyId,
              translationTag: BaseTranslator.keys.createChatInvitationPage_sendKeysCopy,
            })},
          `,

      ]
    })}
      <div id='previousNextButtons'>
        ${HtmlComponents.linkButton({
      id: this.__previousId,
      translationTag: BaseTranslator.keys.createChatInvitationPage_previous,
      cssClass: 'linkButton',
      previous: '-1'
    })}
        ${HtmlComponents.linkButton({
      id: this.__nextId,
      translationTag: BaseTranslator.keys.createChatInvitationPage_next,
      next: '1'
    })}
      </div>
    `;

    this.updateStatus(div);
    div.querySelectorAll(`#${this.__receiverId}, #${this.__privateKeyId}, #${this.__publicKeyId}`)
      .forEach((element) => element.addEventListener('input', (e) => this.updateStatus()));

    div.querySelector(`#${this.__nextId}`).addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('disabled')) {
        return;
      }

      const nextElement = e.target;
      const previousElement = document.querySelector(`#${this.__previousId}`);
      const activePageNumber = parseInt(previousElement.getAttribute('previous')) + 1;
      const pages = [...document.querySelectorAll('.page')].length;
      
      if (activePageNumber + 1 === pages) {
        EventRaiser.raise({ eventName: this.__nextEventName });
        return;
      }

      if (activePageNumber < pages) { 
        previousElement.setAttribute('previous', activePageNumber);
        nextElement.setAttribute('next', activePageNumber + 2);

        document.getElementById(`page_${activePageNumber}`).classList.add('hide');
        document.getElementById(`page_${activePageNumber + 1}`).classList.remove('hide');       
      } else {
        previousElement.setAttribute('previous', -1);
        nextElement.setAttribute('next', 0);

        document.getElementById(`page_${activePageNumber}`).classList.add('hide');
        document.getElementById('page_0').classList.remove('hide');
      }

      this.updateStatus();
    });

    div.querySelector(`#${this.__previousId}`).addEventListener('click', (e) => {
      e.preventDefault();

      const nextElement = document.querySelector(`#${this.__nextId}`);
      const previousElement = e.target;
      const activePageNumber = parseInt(previousElement.getAttribute('previous')) + 1;

      previousElement.setAttribute('previous', activePageNumber - 2);
      nextElement.setAttribute('next', activePageNumber);

      document.getElementById(`page_${activePageNumber}`).classList.add('hide');
      if (activePageNumber !== 0) {
        document.getElementById(`page_${activePageNumber - 1}`).classList.remove('hide');
      }      

      this.updateStatus();
    });

    div.querySelector(`#${this.__createKeysId}`).addEventListener('click', (e) => {
      e.preventDefault();
      this.setRsaKeys().then(() => this.updateStatus());
    });

    div.querySelector(`#${this.__keySizeId}`).addEventListener('change', (e) => {
      this.setRsaKeys().then(() => this.updateStatus());
    });

    div.querySelector(`#${this.__addKeyId}`).addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        id: this.__data.id,
        displayName: this.__data.displayName,
        publicKey: this.__data.publicKey,
      };

      const base64 = buffer.Buffer.from(JSON.stringify(data)).toString("base64");
      navigator.clipboard.writeText(base64);
      this.__keysCopied = true;
      this.updateStatus();      
    });

    div.querySelector(`#${this.__sendKeyId}`).addEventListener('click', (e) => {
      e.preventDefault();
      const base64 = buffer.Buffer.from(JSON.stringify(this.__data)).toString("base64");
      navigator.clipboard.writeText(base64);
      this.__sendInvite = true;
      this.updateStatus();
    });

    return [...div.children];
  }
};
