// Entrance point to our app
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  // Since the env var NODE_ENV is not defined
  // development will be used as the environment
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  // The root module is the starting point of the application
  const app = await NestFactory.create(AppModule);

  // Assume env port variable before config port
  // incase config port needs to be overriding for some reason
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port`);
}
bootstrap();
