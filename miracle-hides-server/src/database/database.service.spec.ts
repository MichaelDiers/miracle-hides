import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '../configuration/configuration.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { DatabaseService } from './database.service';
import { FirebaseDatabaseService } from './firebase-database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, FirebaseDatabaseService],
      imports: [FirebaseModule, ConfigurationModule],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
