import { Test, TestingModule } from '@nestjs/testing';
import { KEY_GENERATOR } from '../../../../src/core/interfaces/services/key-generator.interface';
import { UtilsModule } from '../../../../src/core/utils/utils.module';
import { RsaKeyGeneratorModule } from '../../../../src/use-cases/asymmetric-key-generator/asymmetric-key-generator.module';
import KeyGeneratorService from '../../../../src/use-cases/key-generator/key-generator.service';
import { SymmetricKeyGeneratorModule } from '../../../../src/use-cases/symmetric-key-generator/symmetric-key-generator.module';

describe('KeyGeneratorService', () => {
  let service: KeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [KEY_GENERATOR],
      imports: [RsaKeyGeneratorModule, SymmetricKeyGeneratorModule, UtilsModule],
      providers: [
        {
          provide: KEY_GENERATOR,
          useClass: KeyGeneratorService,
        },
        KeyGeneratorService,
      ],
    }).compile();

    service = module.get<KeyGeneratorService>(KeyGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
