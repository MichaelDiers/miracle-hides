import * as dotenv from 'dotenv';
dotenv.config()
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.MH_CORS) {
    app.enableCors();
  }
  
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.MH_PORT || 3000;
  await app.listen(port);
}

bootstrap();
