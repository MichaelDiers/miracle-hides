import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';
import { UsersDatabaseModule } from './databases/users-database/users-database.module';
import { AuthModule } from './controllers/auth/auth.module';
import { HashModule } from './services/hash/hash.module';
import { FirebaseModule } from './services/firebase/firebase.module';
import { JwtModule } from './services/jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: (await configService.readAsync()).mongoDbConnectionString,
        dbName: (await configService.readAsync()).mongoDbDatabaseName,
      }),
      inject: [ConfigService],
    }),
    UsersDatabaseModule,
    AuthModule,
    HashModule,
    FirebaseModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
