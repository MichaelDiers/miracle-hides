initializeFirebase();

const urlParams = new URLSearchParams(window.location.search);
if ([...urlParams].length === 2) {
  new SignUpPage().show();
} else {
  new SignInPage().show();
}

