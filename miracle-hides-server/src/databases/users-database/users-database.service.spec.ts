import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity, UserEntitySchema } from './user-entity.schema';
import { UsersDatabaseService } from './users-database.service';

describe('UsersDatabaseService', () => {
  let service: UsersDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [UsersDatabaseService],
      imports: [
        MongooseModule.forFeature([
          { name: UserEntity.name, schema: UserEntitySchema },
        ]),
      ],
      providers: [UsersDatabaseService],
    }).compile();

    service = module.get<UsersDatabaseService>(UsersDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
