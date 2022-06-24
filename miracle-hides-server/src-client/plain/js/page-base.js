class BasePage {
  get html() {
    throw new Error('not implemented')
  }

  initializeData() {
  }

  initializeFocus() {
  }

  initializeEvents() {
  }

  initializeHtml() {
    const mainElement = document.querySelector('main');
    if (!mainElement) {
      throw new Error('main element not found');
    }

    mainElement.innerHTML = this.html;
  }

  setFocusToFirstEmptyInputOrSubmit() {
    const element = document.querySelector('form input:placeholder-shown, form input[type="submit"]');
    if (element) {
      element.focus();
    }
  };

  setInputFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    for (const entry of urlParams.entries()) {
      const element = document.getElementById(entry[0]);
      if (element) {
        element.value = entry[1];
      }
    }
  }

  show() {
    this.initializeHtml();
    this.initializeData();
    this.initializeFocus();
    this.initializeEvents();
  }
};