import { Module } from '@nestjs/common';
import { LOGGING_SERVICE } from 'src/types/logging.types';
import { LoggingService } from './logging.service';

@Module({
  exports: [
    LOGGING_SERVICE,
  ],
  providers: [
    { 
      provide: LOGGING_SERVICE,
      useClass: LoggingService,
    }
  ]
})
export class LoggingModule {}
