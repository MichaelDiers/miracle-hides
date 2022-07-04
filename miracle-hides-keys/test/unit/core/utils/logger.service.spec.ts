import { Test, TestingModule } from '@nestjs/testing';
import {
  LOGGER,
  TRANSFRORMER,
} from '../../../../src/core/interfaces/services/services';
import TransformerService from '../../../../src/core/utils/transformer.service';
import LoggerService from '../../../../src/core/utils/logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

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
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
