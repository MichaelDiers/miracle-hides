import { Module } from '@nestjs/common';
import { KEY_GENERATOR } from '../../core/interfaces/services/services';
import { RsaKeyGeneratorModule } from '../asymmetric-key-generator/asymmetric-key-generator.module';
import { SymmetricKeyGeneratorModule } from '../symmetric-key-generator/symmetric-key-generator.module';
import KeyGeneratorService from './key-generator.service';

@Module({
  exports: [KEY_GENERATOR],
  imports: [RsaKeyGeneratorModule, SymmetricKeyGeneratorModule],
  providers: [
    {
      provide: KEY_GENERATOR,
      useClass: KeyGeneratorService,
    },
  ],
})

// eslint-disable-next-line import/prefer-default-export
export class KeyGeneratorModule {}
