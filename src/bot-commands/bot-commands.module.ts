import { Module } from '@nestjs/common';
import { BotCommandsService } from './bot-commands.service';

@Module({
  providers: [BotCommandsService],
  exports: [BotCommandsService],
})
export class BotCommandsModule {}