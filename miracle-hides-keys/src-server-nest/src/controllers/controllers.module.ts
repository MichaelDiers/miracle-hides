import { Module } from '@nestjs/common';
import { UtilsModule } from '../core/utils/utils.module';
import { KeyGeneratorModule } from '../use-cases/key-generator/key-generator.module';
import KeysController from './keys.controller';

@Module({
  controllers: [KeysController],
  imports: [KeyGeneratorModule, UtilsModule],
})

// eslint-disable-next-line import/prefer-default-export
export class ControllersModule {}
