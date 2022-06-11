const ajax = (callback, formElement) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status < 300) {
            const json = JSON.parse(this.responseText);
            callback(json);
        } else {
            callback();
        }
    };

    const method = formElement.getAttribute('method');
    const action = formElement.getAttribute('action');
    
    const body = {};
    formElement.querySelectorAll('[type=text],[type=password]').forEach((element) => {
        const name = element.getAttribute('name');
        const value = element.value;
        body[name] = value;
    });

    xhttp.open(method, action, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(body));
}

const afterSignIn = (token) => {
    const body = document.querySelector('body');
    const element = document.createElement('h1');
    element.innerText = 'Messages';
    body.innerHTML = '';
    body.appendChild(element);
}

document.querySelector('#signin')?.addEventListener('submit', (e) => {
    console.log('called')
    e.preventDefault();
    const process = (json) => {
        if (json && json.token) {
            afterSignIn(json.token);
        } else {
            const errorElement = document.querySelector('#error');
            if (errorElement) {
                errorElement.textContent = 'Unknown combination of user and password';
            }
        }
    };

    ajax(process, e.target);
});
