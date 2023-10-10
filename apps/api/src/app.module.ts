import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from "@nestjs/config";
import telegramBotConfig from './config/telegram-bot';
import whisperConfig from './config/open-ai';
import { BotModule } from './bot.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DbModule } from './db';
import mikroOrmConfig from './config/mikro-orm';
import serverConfig from './config/server';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [telegramBotConfig, serverConfig, whisperConfig, mikroOrmConfig],
    }),
    BotModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
