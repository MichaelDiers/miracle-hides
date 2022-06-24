const ajax = (callback, formElement, token) => {
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

  const method = formElement.getAttribute('method');
  const action = formElement.getAttribute('action');

  const body = {};
  formElement.querySelectorAll('[type=text],[type=password],[type=email]').forEach((element) => {
    const name = element.getAttribute('name');
    const value = element.value;
    body[name] = value;
  });

  xhttp.open(method, action, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  if (token) {
    xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
  }

  xhttp.send(JSON.stringify(body));
}
