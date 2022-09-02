import { Inject, Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ISecretManagerService } from 'src/types/secret-manager-service.interface';
import { ILoggingService, LOGGING_SERVICE } from 'src/types/logging.types';

@Injectable()
export class SecretManagerService implements ISecretManagerService {
  constructor(
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
  ) {}

  private readonly client: SecretManagerServiceClient =
    new SecretManagerServiceClient();

  async getMiracleHidesTabletopJwtConfig(): Promise<string> {
    return this.getSecretAsync('MiracleHidesTabletopJwtConfig');
  }

  async getMiracleHidesTabletopConnectionString(): Promise<string | undefined> {
    return this.getSecretAsync('MiracleHidesTabletopConnectionString');
  }

  async getMiracleHidesTabletopMailerConfig(): Promise<string | undefined> {
    return this.getSecretAsync('MiracleHidesTabletopMailerConfig');
  }

  private async getSecretAsync(
    secretName: string,
  ): Promise<string | undefined> {
    const name = `projects/${process.env.MH_PROJECT_NAME}/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await this.client.accessSecretVersion({ name });
      return version.payload.data.toString();
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return;
    }
  }
}
