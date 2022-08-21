import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_DATABASE_SERVICE } from 'src/types/user-database-service.interface';
import { UserDatabaseService } from './user-database.service';
import { User, UserSchema } from './user.schema';

@Module({
  exports: [USER_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
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
