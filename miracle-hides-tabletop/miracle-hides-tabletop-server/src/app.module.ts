import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { MongodbConfigService } from './services/mongodb-config/mongodb-config.service';
import { ServicesModule } from './services/services.module';
import { HouseRulesDatabaseModule } from './databases/house-rules-database/house-rules-database.module';
import { LanguagesDatabaseModule } from './databases/languages-database/languages-database.module';
import { TranslationDatabaseModule } from './databases/translation-database/translation-database.module';
import { UserDatabaseModule } from './databases/user-database/user-database.module';
import { GuardsModule } from './guards/guards.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { RequestLoggerMiddleware, REQUEST_LOGGER_MIDDLEWARE } from './middleware/request-logger.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { UserInvitationsDatabaseModule } from './databases/user-invitations-database/user-invitations-database.module';
import { TransactionsModule } from './databases/transactions/transactions.module';
import { LoggingModule } from './logging/logging.module';

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
    TranslationDatabaseModule,
    UserDatabaseModule,
    GuardsModule,
    MiddlewareModule,
    ServicesModule,
    UserInvitationsDatabaseModule,
    TransactionsModule,
    LoggingModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, JwtMiddleware).forRoutes('*')
  }

}
