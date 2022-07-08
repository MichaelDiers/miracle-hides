import { Module } from '@nestjs/common';
import RsaKeyGeneratorService from './asymmetric-key-generator.service';
import { ASYMMETRIC_KEY_GENERATOR } from '../../core/interfaces/services/services';

@Module({
  exports: [ASYMMETRIC_KEY_GENERATOR],
  providers: [
    {
      provide: ASYMMETRIC_KEY_GENERATOR,
      useClass: RsaKeyGeneratorService,
    },
  ],
})

// eslint-disable-next-line import/prefer-default-export
export class RsaKeyGeneratorModule {}
