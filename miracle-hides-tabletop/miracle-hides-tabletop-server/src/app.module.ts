import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { MongodbConfigService } from './services/mongodb-config/mongodb-config.service';
import { ServicesModule } from './services/services.module';
import { HouseRulesDatabaseModule } from './house-rules-database/house-rules-database.module';
import { LanguagesDatabaseModule } from './languages-database/languages-database.module';
import { TranslationsDatabaseModule } from './translations-database/translations-database.module';
import { UserDatabaseModule } from './user-database/user-database.module';

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ControllersModule,
    MongooseModule.forRootAsync({
      imports: [ServicesModule],
      useClass: MongodbConfigService,
    }),
    HouseRulesDatabaseModule,
    LanguagesDatabaseModule,
    TranslationsDatabaseModule,
    UserDatabaseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
