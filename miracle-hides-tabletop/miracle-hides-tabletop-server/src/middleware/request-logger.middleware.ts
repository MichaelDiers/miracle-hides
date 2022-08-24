import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {    
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${req?.headers?.authorization}`)
    next();
  }
}

export const REQUEST_LOGGER_MIDDLEWARE = 'REQUEST_LOGGER_MIDDLEWARE';
