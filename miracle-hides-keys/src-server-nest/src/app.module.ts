import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ControllersModule } from './controllers/controllers.module';
import { KeyGeneratorModule } from './use-cases/key-generator/key-generator.module';
import { RsaKeyGeneratorModule } from './use-cases/asymmetric-key-generator/asymmetric-key-generator.module';
import { UtilsModule } from './core/utils/utils.module';
import { SymmetricKeyGeneratorModule } from './use-cases/symmetric-key-generator/symmetric-key-generator.module';
console.log(join(__dirname, 'client'));
@Module({
  imports: [
    ControllersModule,
    KeyGeneratorModule,
    RsaKeyGeneratorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
    UtilsModule,
    SymmetricKeyGeneratorModule,
  ],
})
export default class AppModule {}
