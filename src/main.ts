// Entrance point to our app
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  // The root module is the starting point of the application
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`Application listening on port`);
}
bootstrap();
