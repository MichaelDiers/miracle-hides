import { MailConfig } from './mail-config.interface';

export interface Config {
  mongoDbConnectionString: string;
  mongoDbDatabaseName: string;
  hashSaltRounds: number;
  messagesCollectionName: string;
  pagingSize: number;
  invitationCodesConnectionString: string;
  mail: MailConfig;
}
