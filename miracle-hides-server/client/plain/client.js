const ajax = (callback, formElement) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            callback(json);
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

document.querySelector('#signin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const process = (json) => {
        console.log(json.token);
    };

    ajax(process, e.target);
});
