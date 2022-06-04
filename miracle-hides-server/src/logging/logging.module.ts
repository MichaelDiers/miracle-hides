import { Module } from '@nestjs/common';
import { LogEntry } from './log-entry';
import { LoggingService } from './logging.service';

@Module({
  exports: [LoggingService],
  providers: [LoggingService]
})
export class LoggingModule {}
