import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../configuration/configuration.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseDatabaseService } from './firebase-database.service';

describe('FirebaseDatabaseService', () => {
  let provider: FirebaseDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseDatabaseService],
      imports: [FirebaseModule, ConfigurationModule],
    }).compile();

    provider = module.get<FirebaseDatabaseService>(FirebaseDatabaseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
