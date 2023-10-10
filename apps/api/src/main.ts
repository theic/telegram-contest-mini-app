import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverConfig from './config/server';
import { getBotToken } from './utils/get-bot-token';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  await app.listen(serverConfig().port);
}
bootstrap();
