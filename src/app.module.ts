import { TelegrafModule } from './telegraf/telegraf.module';
import { N8nModule } from './n8n/n8n.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/env-config/config.module';
import { TelegramModule } from 'configs/telegram.config';
import { BotCommandsModule } from './bot-commands/bot-commands.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    TelegramModule.forRootAsync(),
    TelegrafModule,
    N8nModule,
    BotCommandsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
