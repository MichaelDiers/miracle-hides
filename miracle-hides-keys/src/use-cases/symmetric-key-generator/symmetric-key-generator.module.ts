import { Module } from '@nestjs/common';
import { SYMMETRIC_KEY_GENERATOR } from '../../core/interfaces/services/symmetric-key-generator.interface';
import SymmetricKeyGeneratorService from './symmetric-key-generator.service';

@Module({
  exports: [SYMMETRIC_KEY_GENERATOR],
  providers: [
    {
      provide: SYMMETRIC_KEY_GENERATOR,
      useClass: SymmetricKeyGeneratorService,
    },
  ],
})
// eslint-disable-next-line import/prefer-default-export
export class SymmetricKeyGeneratorModule {}
