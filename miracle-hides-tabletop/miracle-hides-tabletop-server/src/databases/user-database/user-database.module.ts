import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_DATABASE_SERVICE } from '../../types/user.types';
import { USER, UserSchema } from '../../types/user.types';
import { UserDatabaseService } from './user-database.service';

@Module({
  exports: [USER_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: USER, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: USER_DATABASE_SERVICE,
      useClass: UserDatabaseService,
    },
  ],
})
export class UserDatabaseModule {}
