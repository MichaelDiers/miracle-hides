import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
  read(): Configuration {
    const configuration = new Configuration();
    configuration.userCollectionName = 'users';
    return configuration;
  }
}
