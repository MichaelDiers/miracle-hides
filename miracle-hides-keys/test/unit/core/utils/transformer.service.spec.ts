import { Test, TestingModule } from '@nestjs/testing';
import {
  LOGGER,
  TRANSFRORMER,
} from '../../../../src/core/interfaces/services/services';
import LoggerService from '../../../../src/core/utils/logger.service';
import TransformerService from '../../../../src/core/utils/transformer.service';

describe('TransformerService', () => {
  let service: TransformerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [LOGGER, TRANSFRORMER],
      providers: [
        {
          provide: LOGGER,
          useClass: LoggerService,
        },
        {
          provide: TRANSFRORMER,
          useClass: TransformerService,
        },
        LoggerService,
        TransformerService,
      ],
    }).compile();

    service = module.get<TransformerService>(TransformerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
