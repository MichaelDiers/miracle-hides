import { Module } from '@nestjs/common';
import RsaKeyGeneratorService from './rsa-key-generator.service';
import { RSA_KEY_GENERATOR } from '../../core/interfaces/services/services';

@Module({
  exports: [RSA_KEY_GENERATOR],
  providers: [
    {
      provide: RSA_KEY_GENERATOR,
      useClass: RsaKeyGeneratorService,
    },
  ],
})

// eslint-disable-next-line import/prefer-default-export
export class RsaKeyGeneratorModule {}
