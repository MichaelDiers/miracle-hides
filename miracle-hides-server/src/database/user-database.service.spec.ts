import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../configuration/configuration.module';
import { HashModule } from '../hash/hash.module';
import { LoggingModule } from '../logging/logging.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { UserDatabaseService } from './user-database.service';
import { FirebaseDatabaseService } from './firebase-database.service';

describe('UserDatabaseService', () => {
  let provider: UserDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule, ConfigurationModule, LoggingModule, HashModule],
      providers: [FirebaseDatabaseService, UserDatabaseService],
    }).compile();

    provider = module.get<UserDatabaseService>(UserDatabaseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
