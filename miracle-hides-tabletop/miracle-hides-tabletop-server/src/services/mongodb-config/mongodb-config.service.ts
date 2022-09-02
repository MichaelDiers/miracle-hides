import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
  ISecretManagerService,
  SECRET_MANAGER_SERVICE,
} from 'src/types/secret-manager-service.interface';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(SECRET_MANAGER_SERVICE)
    private readonly secretManagerService: ISecretManagerService,
  ) {}

  public createMongooseOptions(): Promise<MongooseModuleOptions> {
    return new Promise((resolve, reject) => {
      this.secretManagerService
        .getMiracleHidesTabletopConnectionString()
        .then((connectionString: string) => {
          const options = {
            uri: connectionString,
          };

          resolve(options);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
