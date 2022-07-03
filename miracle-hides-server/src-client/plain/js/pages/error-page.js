class ErrorPage extends BasePage {
  constructor({ translator }) {
    super({
      customEventName: ErrorPage.name,
      errorEventName: ErrorPage.name,
      id: ErrorPage.name,
      translator,
    });
  }

  async setupHtml() {
    const div = document.createElement('div');
    div.innerHTML = `
        <span>Error</span>
      `;
      return [...div.children];
  }
};
