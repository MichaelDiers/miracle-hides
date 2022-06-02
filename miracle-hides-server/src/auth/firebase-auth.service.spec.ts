import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthService } from './firebase-auth.service';

describe('FirebaseAuthService', () => {
  let provider: FirebaseAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      providers: [FirebaseAuthService],
    }).compile();

    provider = module.get<FirebaseAuthService>(FirebaseAuthService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
