class FirebaseApp {
  constructor() {
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

  signIn(customToken) {
    this.customToken = customToken;
    firebase.auth().signInWithCustomToken(customToken)
      .then(() => console.log('we have a firebase token'))
      .catch(() => document.querySelector('#error').textContent = 'A signin is not possible at the moment.');
  }
}
