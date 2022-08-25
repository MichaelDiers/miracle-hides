export interface ISecretManagerService {
  getMiracleHidesTabletopConnectionString(): Promise<string | undefined>;
  getMiracleHidesTabletopJwtConfig(): Promise<string | undefined>;
  getMiracleHidesTabletopMailerConfig(): Promise<string | undefined>;
}

export const SECRET_MANAGER_SERVICE = 'SECRET_MANAGER_SERVICE';
