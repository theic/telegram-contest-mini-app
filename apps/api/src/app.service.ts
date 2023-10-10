import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import TelegramBotConfig from './config/telegram-bot';

@Injectable()
export class AppService {
  constructor(
    @Inject(TelegramBotConfig.KEY)
    private readonly telegramBotConfig: ConfigType<typeof TelegramBotConfig>,
  ) {
    console.log(this.telegramBotConfig.botToken);
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
