import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/services/config/config.module';
import { UserEntity, UserEntitySchema } from './user-entity.schema';
import { UsersDatabaseService } from './users-database.service';

@Module({
  exports: [UsersDatabaseService],
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserEntitySchema },
    ]),
    ConfigModule,
  ],
  providers: [UsersDatabaseService],
})
export class UsersDatabaseModule {}
