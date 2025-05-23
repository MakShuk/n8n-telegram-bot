import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';


@Injectable()
export class BotCommandsService {
  constructor() {}

  start = async (ctx: Context) => {
    return ctx.reply(`🤖 Команды:
  /start - Меню
  /reset - Сброс состояния
  /info  - Информация
  /store - Хранилище фалов`);
  };

  disable = async (ctx: Context) => {
    return ctx.reply(`⚠️ Функция недоступна для этого бота.`);
  };

  notResetContext = async (ctx: Context) => {
    return ctx.reply(
      `Ручной сброс состояния не требуется, бот автоматически сбрасывает состояние после завершения диалога.`,
    );
  };
}
