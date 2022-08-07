import { Injectable } from '@nestjs/common';
import { Logger } from '../interfaces/services/logger.interface';

@Injectable()
export default class LoggerService implements Logger {
  async errorAsync(message: string): Promise<void> {
    return this.exceptionAsync(message, undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  async exceptionAsync(message: string, stack: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.error(message);

    // eslint-disable-next-line no-console
    console.error(stack);
  }
}
