import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ISecretManagerService } from 'src/types/secret-manager-service.interface';

@Injectable()
export class SecretManagerService implements ISecretManagerService {
  private readonly client: SecretManagerServiceClient = new SecretManagerServiceClient();

  async getMiracleHidesTabletopConnectionString() : Promise<string|undefined> {
    return this.getSecretAsync('MiracleHidesTabletopConnectionString');
  }

  private async getSecretAsync(secretName: string) : Promise<string|undefined> {
    const name = `projects/${process.env.MH_PROJECT_NAME}/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await this.client.accessSecretVersion({ name });
      return version.payload.data.toString();
    } catch(err) {
      console.error(err)
      return;
    }    
  }
}
