export interface User {
  displayName: string;
  email: string;
  forcePasswordChange: boolean;
  isLocked: boolean;
  lockedReason: string;
  password: string;
  signInAttemptFailures: number;
  userId: string;
}
