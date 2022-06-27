class AjaxHandler {
  static submitForm(options = {}) {
    const { formElement, token } = options;
    return new Promise((resolve, reject) => {
      const method = formElement.getAttribute('method');
      const action = formElement.getAttribute('action');

      const body = {};
      formElement.querySelectorAll('[type=text],[type=password],[type=email],[type=hidden]').forEach((element) => {
        const name = element.getAttribute('name');
        const value = element.value;
        body[name] = value;
      });

      AjaxHandler.submit({ method, action, body, token })
        .then((json) => resolve(json))
        .catch((json) => reject(json));
    });
  }

  static submit(options = {}) {
    const {
      method,
      action,
      body,
      token,
    } = options;

    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          const json = {
            status: this.status,
            success: this.status < 300,
            content: this.responseText ? JSON.parse(this.responseText) : undefined,
          };

          if (json.success) {
            resolve(json);
          } else {
            reject(json);
          }
        }
      };

      xhttp.open(method, action, true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      if (token) {
        xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhttp.send(JSON.stringify(body));
    });
  }
}
