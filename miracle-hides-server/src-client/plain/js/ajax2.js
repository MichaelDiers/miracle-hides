const ajax2 = (callback, formElement, token) => {
  const method = formElement.getAttribute('method');
  const action = formElement.getAttribute('action');

  const body = {};
  formElement.querySelectorAll('[type=text],[type=password],[type=email],[type=hidden]').forEach((element) => {
    const name = element.getAttribute('name');
    const value = element.value;
    body[name] = value;
  });

  ajaxPlain2(method, action, callback, body, token);
};
  
const ajaxPlain2 = (method, action, callback, body, token) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const json = {
        success: this.status < 300,
        status: this.status,
      };

      if (json.success && this.responseText) {
        json.content = JSON.parse(this.responseText);
      }

      callback(json);
    }
  };

  xhttp.open(method, action, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  if (token) {
    xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
  }

  xhttp.send(JSON.stringify(body));
}
