const firebaseApp = new FirebaseApp();

const urlParams = new URLSearchParams(window.location.search);
if ([...urlParams].length === 2) {
  new SignUpPage(firebaseApp).show();
} else {
  // new SignInPage(firebaseApp).show();
  new CreateInvitationAdminPage(firebaseApp).show();
}

