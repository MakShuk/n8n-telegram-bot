import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Telegraf, Context } from 'telegraf';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(): DynamicModule {
    return {
      module: TelegramModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'TELEGRAM_BOT_INSTANCE',
          useFactory: async (configService: ConfigService) => {
            const botToken = configService.get<string>('TELEGRAM_BOT_TOKEN');
            if (!botToken) {
              throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment');
            }
            const bot = new Telegraf(botToken);
            bot.catch((err: any, ctx: Context) => {
              console.error(`Oops, encountered an error for ${ctx.updateType}`, err);
            });
            bot.launch();

  
              bot.use(async (ctx: Context, next: () => Promise<void>) => {
                if (!ctx.from) {
                  console.warn('User information is not available');
                  return next();
                }
                const userId = ctx.from.id;
                const users = configService.getOrThrow<string[]>('USERS');
                const isValidUser = users.includes(userId.toString());

                if (!isValidUser) {
                  ctx.reply(
                    `Access denied. You are not registered in the system. Contact the administrator to provide this number: ${userId}`,
                  );
                  return;
                }

                return next();
              });

            return bot;
          },
          inject: [ConfigService],
        },
      ],
      exports: ['TELEGRAM_BOT_INSTANCE'],
    };
  }
}
