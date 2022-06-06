import { Injectable } from '@nestjs/common';
import { LogEntry } from './log-entry';

@Injectable()
export class LoggingService {
  async error(entry: LogEntry): Promise<void> {
    console.log(entry.message);
    console.log(entry.stack);
  }
}
