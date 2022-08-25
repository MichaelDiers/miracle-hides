const enum AppRoutes {
  DASHBOARD = '/dashboard',
  EMAIL_VERIFICATION_INTERN = '/email-verification',
  EMAIL_VERIFICATION_EXTERN = '/email-verification/:email/:code',
  ERROR_LOST = '/lost-and-found',
  EVENT_HANDLED = '/eventHandled',
  HOME = '/',
  HOUSE_RULES = '/house-rules',
  INDEX = '/',
  LANGUAGES = '/languages',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  USER_INVITATIONS = '/invitations',
  USER_INVITATIONS_CREATE = 'create',
  USERS = '/users',
  USER = '/users/:guid',
};

export default AppRoutes;
