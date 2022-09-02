import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ILoggingService, LOGGING_SERVICE } from '../types/logging.types';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService) {}
  use(req: any, res: any, next: () => void) {
    if (process.env.MH_REQUEST_LOGGER) {
      const method = req.method;
      const url = req.originalUrl;
      const rawBody = { ...req.body };
      if (rawBody.email) {
        rawBody.email = 'has email';
      }

      if (rawBody.password) {
        rawBody.password = 'has password';
      }

      const body = JSON.stringify(rawBody);
      const token = req?.headers?.authorization ? 'has token' : 'no token';

      this.loggingService.info(`${method} ${url} ${body} ${token}`);
    }

    next();
  }
}

export const REQUEST_LOGGER_MIDDLEWARE = 'REQUEST_LOGGER_MIDDLEWARE';
