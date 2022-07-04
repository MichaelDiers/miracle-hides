import { Module } from '@nestjs/common';
import { KEY_GENERATOR } from '../../core/interfaces/services/services';
import { UtilsModule } from '../../core/utils/utils.module';
import { RsaKeyGeneratorModule } from '../rsa-key-generator/rsa-key-generator.module';
import KeyGeneratorService from './key-generator.service';

@Module({
  exports: [KEY_GENERATOR],
  imports: [RsaKeyGeneratorModule, UtilsModule],
  providers: [
    {
      provide: KEY_GENERATOR,
      useClass: KeyGeneratorService,
    },
  ],
})

// eslint-disable-next-line import/prefer-default-export
export class KeyGeneratorModule {}
