import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import telegramBotConfig from './config/telegram-bot';
import { ProjectsController, TelegramHandler, sessionMiddleware } from './app';
import { ChunksService, ProjectsService, WhisperService } from './infrastructure/services';
import { ChunkMapper, ProjectMapper } from './infrastructure';
import { DbModule } from 'src/db';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: telegramBotConfig().botToken,
        middlewares: [sessionMiddleware],
      }),
    }),
    DbModule,
  ],
  controllers: [
    ProjectsController,
  ],
  providers: [
    ProjectMapper,
    ChunkMapper,
    TelegramHandler,
    WhisperService,
    ProjectsService,
    ChunksService,
  ],
})

export class BotModule {}
