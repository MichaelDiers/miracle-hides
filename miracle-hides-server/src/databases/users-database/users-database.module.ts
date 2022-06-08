import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './user-entity.schema';
import { UsersDatabaseService } from './users-database.service';

@Module({
  exports: [UsersDatabaseService],
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserEntitySchema },
    ]),
  ],
  providers: [UsersDatabaseService],
})
export class UsersDatabaseModule {}
