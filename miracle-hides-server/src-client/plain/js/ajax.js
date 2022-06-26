const ajax = (callback, formElement, token) => {
  const method = formElement.getAttribute('method');
  const action = formElement.getAttribute('action');

  const body = {};
  formElement.querySelectorAll('[type=text],[type=password],[type=email],[type=hidden]').forEach((element) => {
    const name = element.getAttribute('name');
    const value = element.value;
    body[name] = value;
  });

  ajaxPlain(method, action, callback, body, token);
};
  
const ajaxPlain = (method, action, callback, body, token) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status < 300) {
        let json = { success: true };
        if (this.responseText) {
          json = JSON.parse(this.responseText);
        }

        callback(json);
      } else {
        callback();
      }
    }
  };

  xhttp.open(method, action, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  if (token) {
    xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
  }

  xhttp.send(JSON.stringify(body));
}
