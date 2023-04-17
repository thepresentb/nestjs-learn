import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenvConfig from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenvConfig.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
