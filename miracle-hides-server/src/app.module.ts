import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { HashModule } from './hash/hash.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    DatabaseModule,
    ConfigurationModule,
    HashModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
