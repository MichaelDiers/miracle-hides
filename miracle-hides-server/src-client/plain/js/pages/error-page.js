class ErrorPage extends BasePage {
  constructor(translator, customEventName) {
    super({ translator, customEventName, customEventName, id: 'error' });
  }

  async setupHtml() {
    const div = document.createElement('div');
    div.innerHTML = `
        <span>Error</span>
      `;
      return [...div.children];
  }
};
