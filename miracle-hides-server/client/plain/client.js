const showSignInFormHtml = `
    <div id="error"></div>
    <form method="post" action="/auth" id="signin">
        <label for="email">email</label>
        <input type="text" id="email" name="email">
        <label for="password">password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="submit">
    </form>
`;

const showMessengerHtml = `
    <h1>Messenger</h1>
    <form method='post' action='/messages' id='sendMessage'>
        <label for="receiver">Receiver</label>
        <input type="text" id="receiver" name="receiver">    
        <label for="message">Text</label>
        <input type="text" id="text" name="text">
        <input type="submit" value="submit">
    </form>
`;

const ajax = (callback, formElement, token) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status < 300) {
                const json = this.responseText ? JSON.parse(this.responseText) : {};
                callback(json);
            } else {
                callback();
            }
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
    xhttp.setRequestHeader('Content-Type', 'application/json');
    if (token) {
        xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    
    xhttp.send(JSON.stringify(body));
}

const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBQY2rQeybMmjOgkBUgLtisklHfCcsvjDk",
        authDomain: "miracle-hides.firebaseapp.com",
        databaseURL: "https://miracle-hides-default-rtdb.firebaseio.com",
        projectId: "miracle-hides",
        storageBucket: "miracle-hides.appspot.com",
        messagingSenderId: "962188365368",
        appId: "1:962188365368:web:69a723bd1e8bc7f77920cd"
      };
      
      firebase.initializeApp(firebaseConfig);
}

const showMessenger = () => {
    document.querySelector('main').innerHTML = showMessengerHtml;

    document.querySelector('#sendMessage').addEventListener('submit', (e) => {
        e.preventDefault();
        const process = (result) => console.log(result);
        firebase.auth().currentUser.getIdToken(true)
            .then((token) => ajax(process, e.target, token));
    });
}

const showSignInForm = () => {
    document.querySelector('main').innerHTML = showSignInFormHtml;

    document.querySelector('#signin').addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('#error').textContent = '';
        const process = (json) => {
            if (json && json.token) {
                firebase.auth().signInWithCustomToken(json.token)
                    .then(() => showMessenger())
                    .catch(() => document.querySelector('#error').textContent = 'A signin is not possible at the moment.');
            } else {
                console.log('WHY????')
                document.querySelector('#error').textContent = 'Unknown combination of user and password';
            }
        };
    
        ajax(process, e.target);
    });
}

initializeFirebase();
showSignInForm();
