class ListInvitationsAdminPage extends BasePage {
  constructor(firebaseApp) {
    super(firebaseApp);

    this.invitatonsListId = 'invitatonsList'
    this.createInvitationId = 'createInvitation';
  }

  get html() {
    return `
      <h1>Invitations!</h1>
      <ul id='${this.invitatonsListId}'></ul>
      <div>
        <form method='post' action='/invitation-code' id='${this.createInvitationId}'>
          <input type='submit' value='create new'/>
        </form>
      </div>
      `;
  }

  createInvitationElement({ code, active, newElement = true }) {
    const cssClass = newElement ? 'new' : ''
    const html = `
      <li id='li_${code}' class='${cssClass}'>
        <div>${code}</div>
        <div>${active}</div>
        <div>
          <form class='delete' action='/invitation-code' method='delete' id='${code}'>
            <input type='hidden' id='code' name='code' value='${code}'/>
            <input type='submit' value='delete' />
          </form>
          <form class='copy' code='${code}'>
            <input type='submit' value='copy'/>
          </form>
        </div>
      </li>`;

    let element = document.createElement('div');
    element.innerHTML = html;

    element.querySelector('form.delete').addEventListener('submit', (e) => {
      e.preventDefault();
      const process = (json) => {
        if (json && json.success) {
          document.getElementById(`li_${e.target.id}`).remove();
        }
      };

      ajax(process, e.target);
    });

    element.querySelector('form.copy').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = e.target.getAttribute('code');
      const result = new RegExp(/^(.*\.html).*$/, 'i').exec(document.URL);
      let clipboard;
      if (result.length == 2) {
        clipboard = `${result[1]}?invitationCode=${code}`;
      } else {
        clipboard = code;
      }

      navigator.clipboard.writeText(clipboard);
    });
  
    return element.firstElementChild;
  }

  async initializeDataInvitations() {
    const process = (json) => {
      if (json && json.map) {
        const invitatonsList = document.getElementById(this.invitatonsListId);
        json.map(this.createInvitationElement).forEach((element) => {
          invitatonsList.appendChild(element);
        });
      }
    };

    ajaxPlain('get', '/invitation-code', process);
  }

  initializeData() {
    this.initializeDataInvitations()
      .catch((err) => console.log(err));
  }

  initializeEventCreateInvitation() {
    document.getElementById(this.createInvitationId).addEventListener('submit', (e) => {
      e.preventDefault();
      const process = (json) => {
        if (json) {
          const element = this.createInvitationElement(json);
          document.getElementById(this.invitatonsListId).appendChild(element);
        }
      };

      ajax(process, e.target);
    });
  }
  initializeEvents() {
    this.initializeEventCreateInvitation();
  }
};
