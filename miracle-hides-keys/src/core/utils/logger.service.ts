import { Injectable } from '@nestjs/common';
import { Logger } from '../interfaces/services/logger.interface';

@Injectable()
export default class LoggerService implements Logger {
  async error(message: string): Promise<void> {
    return this.exception(message, undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  async exception(message: string, stack: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.error(message);

    // eslint-disable-next-line no-console
    console.error(stack);
  }
}
