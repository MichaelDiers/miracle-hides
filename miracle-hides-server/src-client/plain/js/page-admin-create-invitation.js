class CreateInvitationAdminPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
  }

  get html() {
    return `
      <h1>Create Invitation!</h1>
      <div id="error"></div>
      <form method="post" action="/invitation-code">
        <label for="email">email</label>
        <input type="email" id="email" name="email" maxlength='50' placeholder='name@example.com' required>
        <input type="submit" value="submit">
      </form>
    `;
  }

  initializeData() {
    document.querySelector('#email').value = `${uuidv4()}@example.com`;
  }

  initializeEventCreateInvitation() {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      const process = (json) => {
        if (json) {
          const { code, email } = json;
          window.location.href = `http://localhost:3000/plain/index.html?email=${email}&code=${code}`;
        } else {
          this.showError('Unable to create invitation.');
        }
      };

      ajax(process, e.target);
    });
  }

  initializeEvents() {
    this.initializeEventCreateInvitation();
  }
};
