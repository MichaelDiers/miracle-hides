import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../../../src/core/utils/utils.module';
import { KeyGeneratorModule } from '../../../src/use-cases/key-generator/key-generator.module';
import KeysController from '../../../src/controllers/keys.controller';

describe('RsaController', () => {
  let controller: KeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeysController],
      imports: [KeyGeneratorModule, UtilsModule],
    }).compile();

    controller = module.get<KeysController>(KeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
