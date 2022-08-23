import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { RequestLoggerMiddleware, REQUEST_LOGGER_MIDDLEWARE } from './request-logger.middleware';

@Module({
  exports: [REQUEST_LOGGER_MIDDLEWARE],
  imports: [ServicesModule],
  providers: [
    {
      provide: REQUEST_LOGGER_MIDDLEWARE,
      useClass: RequestLoggerMiddleware,
    },
  ],
})
export class MiddlewareModule {}
