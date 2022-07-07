import { Test, TestingModule } from '@nestjs/testing';
import SymmetricKeyGeneratorService from '../../../src/use-cases/symmetric-key-generator/symmetric-key-generator.service';


describe('SymmetricKeyGeneratorService', () => {
  let service: SymmetricKeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymmetricKeyGeneratorService],
    }).compile();

    service = module.get<SymmetricKeyGeneratorService>(SymmetricKeyGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
