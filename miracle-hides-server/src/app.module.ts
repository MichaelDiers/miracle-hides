import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';
import { UsersDatabaseModule } from './databases/users-database/users-database.module';
import { AuthModule } from './controllers2/auth/auth.module';
import { HashModule } from './services/hash/hash.module';
import { FirebaseModule } from './services/firebase/firebase.module';
import { JwtModule } from './services/jwt/jwt.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessagesModule } from './controllers2/messages/messages.module';
import { MessagesDatabaseModule } from './databases/messages-database/messages-database.module';
import { UserModule } from './controllers2/user/user.module';
import { InvitationCodeModule } from './controllers2/invitation-code/invitation-code.module';
import { InvitationCodesDatabaseModule } from './databases/invitation-codes-database/invitation-codes-database.module';
import { MailerModule } from './services/mailer/mailer.module';
import { ChatModule } from './controllers2/chat/chat.module';
import { ControllersModule } from './controllers/controllers.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UsersDatabaseModule,
    AuthModule,
    HashModule,
    FirebaseModule,
    JwtModule,
    MessagesModule,
    MessagesDatabaseModule,
    UserModule,
    InvitationCodeModule,
    InvitationCodesDatabaseModule,
    MailerModule,
    ChatModule,
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
