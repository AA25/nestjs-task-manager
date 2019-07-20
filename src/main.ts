// Entrance point to our app
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // The root module is the starting point of the application
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
