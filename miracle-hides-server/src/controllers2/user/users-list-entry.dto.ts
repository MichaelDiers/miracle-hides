import { User } from 'src/dtos/user.interface';

export class UsersListEntryDto {

  constructor(user: User) {
    this.displayName = user.displayName;
    this.forcePasswordChange = user.forcePasswordChange;
    this.isLocked = user.isLocked;
    this.lockedReason = user.lockedReason;
    this.signInAttemptFailures = user.signInAttemptFailures;
    this.userId = user.userId;
    this.emailVerificationCode = user.emailVerificationCode;
    this.isEmailVerified = user.isEmailVerified;
  }

  displayName: string;
  forcePasswordChange: boolean;
  isLocked: boolean;
  lockedReason: string;
  signInAttemptFailures: number;
  userId: string;
  emailVerificationCode: string;
  isEmailVerified: boolean;
}
