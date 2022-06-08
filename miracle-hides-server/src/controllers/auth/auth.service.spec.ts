import { Test, TestingModule } from '@nestjs/testing';
import { UsersDatabaseModule } from '../../databases/users-database/users-database.module';
import { HashModule } from '../../services/hash/hash.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [UsersDatabaseModule, HashModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
