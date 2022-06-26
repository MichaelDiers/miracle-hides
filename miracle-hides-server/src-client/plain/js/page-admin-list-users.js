class ListUsersAdminPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);
    this.usersListId = 'usersList';
  }

  get html() {
    return `
      <h1>Users</h1>
      <ul id='${this.usersListId}'></ul>
    `;
  }

  createUserElement(data) {
    const {
      displayName,
      forcePasswordChange,
      isLocked,
      lockedReason,
      signInAttemptFailures,
      userId,
      isEmailVerified,
    } = data; 
    const liElement = document.createElement('li');
    const content = `
      <div>${displayName}</div>
      <div>${forcePasswordChange}</div>
      <div>${isLocked}</div>
      <div>${lockedReason}</div>
      <div>${signInAttemptFailures}</div>
      <div>${userId}</div>
      <div>${isEmailVerified}</div>
      <div>
        <form class='delete' action='/user' method='delete' id='${userId}'>
          <input type='hidden' id='userId' name='userId' value='${userId}'/>
          <input type='submit' value='delete' />
        </form>
      </div>      
    `;
    liElement.innerHTML = content;

    liElement.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const process = (json) => {
        if (json && json.success) {
          liElement.remove();
        }
      };

      ajax(process, e.target);
    });

    return liElement;
  }

  async initializeDataUsers() {
    const process = (json) => {
      if (json && json.users && json.users.map) {
        const usersList = document.getElementById(this.usersListId);
        json.users.map(this.createUserElement).forEach((element) => {
          usersList.appendChild(element);
        });
      }
    };

    ajaxPlain('get', '/user', process);
  }

  initializeData() {
    this.initializeDataUsers()
      .catch((err) => console.log(err));
  }
}