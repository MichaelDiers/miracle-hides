import { Test, TestingModule } from '@nestjs/testing';
import { ALGORITHM_RSA } from '../../../../src/core/interfaces/data/data-constants';
import { ASYMMETRIC_KEY_GENERATOR } from '../../../../src/core/interfaces/services/asymmetric-key-generator.interface';
import { UtilsModule } from '../../../../src/core/utils/utils.module';
import AsymmetricKeyGeneratorService from '../../../../src/use-cases/asymmetric-key-generator/asymmetric-key-generator.service';

describe('RsaKeyGeneratorService', () => {
  let service: AsymmetricKeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [
        {
          provide: ASYMMETRIC_KEY_GENERATOR,
          useClass: AsymmetricKeyGeneratorService,
        },
        AsymmetricKeyGeneratorService,
      ],
    }).compile();

    service = module.get<AsymmetricKeyGeneratorService>(AsymmetricKeyGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate private and public key', async () => {
    const result = await service.generateAsync({ type: ALGORITHM_RSA,  rsaKeySize: 1024 });

    expect(result).toBeTruthy();

    expect(result.privateKey).toBeTruthy();
    expect(result.privateKey).toMatch(
      /^-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----\s*$/gms,
    );

    expect(result.publicKey).toBeTruthy();
    expect(result.publicKey).toMatch(
      /^-----BEGIN RSA PUBLIC KEY-----.+-----END RSA PUBLIC KEY-----\s*$/gms,
    );
  });
});
