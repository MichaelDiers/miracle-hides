import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { KeyGeneratorModule } from './use-cases/key-generator/key-generator.module';
import { RsaKeyGeneratorModule } from './use-cases/rsa-key-generator/rsa-key-generator.module';
import { UtilsModule } from './core/utils/utils.module';

@Module({
  imports: [
    ControllersModule,
    KeyGeneratorModule,
    RsaKeyGeneratorModule,
    UtilsModule,
  ],
})
export default class AppModule {}
