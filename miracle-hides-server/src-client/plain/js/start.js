const firebaseApp = new FirebaseApp();

const pages = [new SignUpPage(firebaseApp), new VerifyEmailPage(firebaseApp)];
const index = pages.findIndex((page) => page.isPageMatch());
if (index > -1) {
  pages[index].show();
} else {
  //new ListUsersAdminPage(firebaseApp).show();
  new ListInvitationsAdminPage(firebaseApp).show();
}
