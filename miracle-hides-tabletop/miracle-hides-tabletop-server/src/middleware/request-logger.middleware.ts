import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (process.env.MH_REQUEST_LOGGER) {
      const method = req.method;
      const url = req.originalUrl;
      const body = JSON.stringify(req.body);
      const token = req?.headers?.authorization;
      console.log(`${method} ${url} ${body} ${token}`);
    }

    next();
  }
}

export const REQUEST_LOGGER_MIDDLEWARE = 'REQUEST_LOGGER_MIDDLEWARE';
