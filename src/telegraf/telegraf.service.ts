import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegrafService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const botToken = this.configService.get<string>('BOT_TOKEN', '');
    this.bot = new Telegraf(botToken);
  }

  async onModuleInit() {
    this.bot.start((ctx) => ctx.reply('Бот запущен!'));
    await this.bot.launch();
  }

  async onModuleDestroy() {
    await this.bot.stop('SIGTERM');
  }

  getBot(): Telegraf {
    return this.bot;
  }
}