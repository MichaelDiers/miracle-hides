import { Test, TestingModule } from '@nestjs/testing';
import { RSA_KEY_GENERATOR } from '../../../../src/core/interfaces/services/rsa-key-generator.interface';
import { UtilsModule } from '../../../../src/core/utils/utils.module';
import RsaKeyGeneratorService from '../../../../src/use-cases/rsa-key-generator/rsa-key-generator.service';

describe('RsaKeyGeneratorService', () => {
  let service: RsaKeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [RSA_KEY_GENERATOR],
      imports: [UtilsModule],
      providers: [
        {
          provide: RSA_KEY_GENERATOR,
          useClass: RsaKeyGeneratorService,
        },
        RsaKeyGeneratorService,
      ],
    }).compile();

    service = module.get<RsaKeyGeneratorService>(RsaKeyGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate private and public key', async () => {
    const result = await service.generateAsync({ keySize: 1024 });

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
