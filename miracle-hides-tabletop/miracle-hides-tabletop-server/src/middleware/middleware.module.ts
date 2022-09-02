import { Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { ServicesModule } from '../services/services.module';
import { RequestLoggerMiddleware, REQUEST_LOGGER_MIDDLEWARE } from './request-logger.middleware';

@Module({
  exports: [REQUEST_LOGGER_MIDDLEWARE],
  imports: [LoggingModule, ServicesModule],
  providers: [
    {
      provide: REQUEST_LOGGER_MIDDLEWARE,
      useClass: RequestLoggerMiddleware,
    },
  ],
})
export class MiddlewareModule {}
