import { Module } from '@nestjs/common';
import { LOGGER, TRANSFRORMER } from '../interfaces/services/services';
import LoggerService from './logger.service';
import TransformerService from './transformer.service';

@Module({
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
})

// eslint-disable-next-line import/prefer-default-export
export class UtilsModule {}
