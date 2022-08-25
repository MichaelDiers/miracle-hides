export interface IMailerService {
  sendAsync({
    displayName,
    frontEndUrl,
    language,
    to,
    verificationCode,
  } : {
    displayName: string,
    frontEndUrl: string,
    language: string,
    to: string,
    verificationCode: string,
  }): Promise<boolean>;
}

export const MAILER_SERVICE = 'MAILER_SERVICE';
