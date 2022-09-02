import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from 'src/logging/logging.module';
import { USER_DATABASE_SERVICE } from '../../types/user.types';
import { USER, UserSchema } from '../../types/user.types';
import { UserDatabaseService } from './user-database.service';

@Module({
  exports: [USER_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: USER, schema: UserSchema },
    ]),
    LoggingModule,
  ],
  providers: [
    {
      provide: USER_DATABASE_SERVICE,
      useClass: UserDatabaseService,
    },
  ],
})
export class UserDatabaseModule {}
