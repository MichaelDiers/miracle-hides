export interface Config {
  mongoDbConnectionString: string;
  mongoDbDatabaseName: string;
  hashSaltRounds: number;
  messagesCollectionName: string;
}
