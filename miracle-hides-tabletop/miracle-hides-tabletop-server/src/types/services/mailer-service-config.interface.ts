export interface IMailerServiceConfigAuth {
  user: string;
  pass: string;
}

export default interface IMailerServiceConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: IMailerServiceConfigAuth;
  from: string;
}
