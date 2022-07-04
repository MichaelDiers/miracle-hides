import { Module } from '@nestjs/common';
import { UtilsModule } from '../../core/utils/utils.module';
import RsaKeyGeneratorService from './rsa-key-generator.service';
import { RSA_KEY_GENERATOR } from '../../core/interfaces/services/services';

@Module({
  exports: [RSA_KEY_GENERATOR],
  imports: [UtilsModule],
  providers: [
    {
      provide: RSA_KEY_GENERATOR,
      useClass: RsaKeyGeneratorService,
    },
  ],
})

// eslint-disable-next-line import/prefer-default-export
export class RsaKeyGeneratorModule {}
